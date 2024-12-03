import fs from "fs";
import axios from "axios";
import { ethers } from "ethers";
import contract from "../artifacts/contracts/NFT.sol/Pixel.json" assert { type: "json" };
import path from "path";
import FormData from "form-data";
import {
  API_URL,
  CONTRACT_ADDRESS,
  PINATA_API_KEY,
  PINATA_SECRET_KEY,
  PRIV_KEY,
  PUB_KEY,
} from "@/lib/config";
import { MetaData, NftPrompt, User } from "@/types/types";
import pixelAbi from "@/artifacts/contracts/NFT.sol/Pixel.json";
import { scrappImage } from "@/lib/nftscrap";
import { addNftPaths, getUserById } from "./user";
import { insertUpload } from "./upload";

const provider = new ethers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIV_KEY as string, provider);

const nftContractAddress = CONTRACT_ADDRESS as string;
const nftContract = new ethers.Contract(
  nftContractAddress,
  pixelAbi.abi,
  signer
);

async function createImgInfo(prompt: string, user: User) {
  if(!user || !user.userId) throw new Error("You must provide an user")
  const authResponse = await axios.get(
    "https://api.pinata.cloud/data/testAuthentication",
    {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    }
  );
  const pixelbitPrompt = `${prompt}. Estilo pixel art 8-bit.`;
  const generatedImageName = await scrappImage(pixelbitPrompt, user);
  console.log(generatedImageName);
  if(!generatedImageName) throw new Error('Error generating the image.')
  const absolutePath = path.resolve(`./public/uploads/${user.userId}-${user.firstName}/${generatedImageName}`);
  console.log(`Attempting to read file from: ${absolutePath}`);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File does not exist at path: ${absolutePath}`);
  }

  fs.accessSync(absolutePath, fs.constants.R_OK);
  const stream = fs.createReadStream(absolutePath);
  const data = new FormData();
  data.append("file", stream);
  const newUploadId = await insertUpload(
    generatedImageName,
    absolutePath,
    user.userId,
  );
  if (!newUploadId) throw new Error("Error uploading the file");
  await addNftPaths(user.userId, newUploadId);

  const fileResponse = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data,
    {
      headers: {
        "Content-type": `multipart/form-data: boundary=${data.getBoundary()}`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    }
  );

  const { data: fileData = {} } = fileResponse;
  const IpfsHash = fileData.IpfsHash;
  const fileIPFS = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
  return fileIPFS;
}

async function createJsonInfo(metadata: MetaData) {
  const pinataJSONbody = {
    pinataContent: metadata,
  };

  const jsonResponse = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    pinataJSONbody,
    {
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    }
  );

  const { data: jsonData = {} } = jsonResponse;
  const IpfsHash = jsonData.IpfsHash;
  const tokenURI = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
  return tokenURI;
}

async function mintNFT(
  recipient: string = PUB_KEY as string,
  tokenURI: string
) {
  try {
    const tx = await nftContract.mintNFT(recipient, tokenURI);
    console.log("Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt.transactionHash);

		const event = receipt.logs.find(
      (log: any) => log.fragment.name === "Transfer"
    );

    if (event) {
      const [tokenId] = event.args;
      return Number(tokenId);
    }
    // Extrae el ID del token del evento emitido
    const event2 = receipt.events.find(
      (event: any) => event.event === "Transfer"
    );
    if (event2 && event2.args) {
      const newItemId = event.args[2]; // El tercer argumento en el evento Transfer es el tokenId
      console.log("Minted NFT with ID:", newItemId.toString());
      return Number(newItemId);
    }
  } catch (err) {
    console.error("Error minting NFT:", err);
  }
  return undefined;
}

export async function createNFT({ name, description, prompt }: NftPrompt, Address:string, userId: number) {
  try {
    const user = await getUserById(userId)
    if(!user) throw new Error('User not exists')
    const imgInfo = await createImgInfo(prompt, user);

    const metadata = {
      image: imgInfo,
      name: name,
      description: description,
      attributes: [
        { trait_type: "color", value: "green" },
        { trait_type: "background", value: "blue" },
      ],
    };

    const tokenUri = await createJsonInfo(metadata);
    const nftResult = await mintNFT(Address, tokenUri);
    console.log(nftResult);
    return nftResult;
  } catch (error) {
    console.error("Error creating NFT: ", error);
    if (error instanceof Error) {
      throw error;
    }
  }
}
