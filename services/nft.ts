import fs from 'fs';
import axios from 'axios';
import { ethers } from 'ethers';
import contract from '../artifacts/contracts/NFT.sol/Pixel.json' assert {type: 'json'}
import path from 'path';
import FormData from 'form-data';
import { API_URL, CONTRACT_ADDRESS, PINATA_API_KEY, PINATA_SECRET_KEY, PRIV_KEY, PUB_KEY } from '@/lib/config';
import { MetaData, NftPrompt } from '@/types/types';

async function createImgInfo(prompt: string) {
	const authResponse = await axios.get('https://api.pinata.cloud/data/testAuthentication', {
		headers: {
			pinata_api_key: PINATA_API_KEY,
			pinata_secret_api_key: PINATA_SECRET_KEY
		}
	})
	console.log(authResponse.data)
	const pixelbitPrompt = `${prompt}. Estilo pixel art 8-bit.`
	const generatedImageName = await scrappImage(pixelbitPrompt)
	console.log(generatedImageName)
	const absolutePath = path.resolve(`./images/${generatedImageName}`);
	console.log(`Attempting to read file from: ${absolutePath}`);
	if (!fs.existsSync(absolutePath)) {
		throw new Error(`File does not exist at path: ${absolutePath}`);
	}

	fs.accessSync(absolutePath, fs.constants.R_OK);
	const stream = fs.createReadStream(absolutePath);
	const data = new FormData()
	data.append("file", stream);

	const fileResponse = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
		headers: {
			"Content-type": `multipart/form-data: boundary=${data._boundary}`,
			pinata_api_key: PINATA_API_KEY,
			pinata_secret_api_key: PINATA_SECRET_KEY,
		},
	});

	const { data: fileData = {} } = fileResponse;
	const IpfsHash = fileData.IpfsHash;
	const fileIPFS = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
	return fileIPFS;
}

async function createJsonInfo(metadata: MetaData) {
	const pinataJSONbody = {
		pinataContent: metadata,
	};

	const jsonResponse = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", pinataJSONbody, {
		headers: {
			"Content-Type": "application/json",
			pinata_api_key: PINATA_API_KEY,
			pinata_secret_api_key: PINATA_SECRET_KEY,
		},
	});

	const { data: jsonData = {} } = jsonResponse;
	const IpfsHash = jsonData.IpfsHash;
	const tokenURI = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
	return tokenURI;
}

async function mintNFT(tokenURI: string) {
	const provider = new ethers.providers.JsonRpcProvider(API_URL);
	const wallet = new ethers.Wallet(PRIV_KEY as string, provider);
	const etherInterface = new ethers.utils.Interface(contract.abi);

	const nonce = await provider.getTransactionCount(PUB_KEY as string, 'latest');
	const gasPrice = await provider.getGasPrice();
	const network = await provider.getNetwork();
	const { chainId } = network;

	const transaction = {
		from: PUB_KEY,
		to: CONTRACT_ADDRESS,
		nonce,
		chainId,
		gasPrice,
		data: etherInterface.encodeFunctionData("mintNFT", [PUB_KEY, tokenURI]),
	};

	const estimateGas = await provider.estimateGas(transaction);
	transaction.gasLimit = estimateGas;

	const signedTx = await wallet.signTransaction(transaction);
	const transactionReceipt = await provider.sendTransaction(signedTx);
	await transactionReceipt.wait();

	const hash = transactionReceipt.hash;
	console.log("Transaction HASH: ", hash);

	const receipt = await provider.getTransactionReceipt(hash);
	const { logs } = receipt;
	const tokenInBigNumber = ethers.BigNumber.from(logs[0].topics[3]);
	const tokenId = tokenInBigNumber.toString();
	console.log("Token ID: ", tokenId);

	return hash
}

export async function createNFT({ name, description, prompt }: NftPrompt) {
	try {
		const imgInfo = await createImgInfo(prompt);

		const metadata = {
			image: imgInfo,
			name: name,
			description: description,
			attributes: [
				{ 'trait_type': 'color', 'value': 'green' },
				{ "trait_type": 'background', 'value': 'blue' }
			]
		}

		const tokenUri = await createJsonInfo(metadata)
		const nftResult = await mintNFT(tokenUri)
		console.log(nftResult);
		return nftResult
	} catch (error) {
		console.error("Error creating NFT: ", error)
		if (error instanceof Error) {
			throw error
		}
	}
}
