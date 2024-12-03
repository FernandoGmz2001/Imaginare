import { ethers } from "ethers";
import uploadsAbi from "@/artifacts/contracts/Upload.sol/Uploads.json";
import { API_URL, PRIV_KEY, UPLOAD_ADDRESS } from "@/lib/config";
import { RawUpload, Upload } from "@/types/types";

const provider = new ethers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIV_KEY as string, provider);

const uploadsContractAddress = UPLOAD_ADDRESS as string;
const uploadsContract = new ethers.Contract(
  uploadsContractAddress,
  uploadsAbi.abi,
  signer
);

export const insertUpload = async (
  fileName: string,
  filePath: string,
  userId: number
): Promise<number | undefined> => {
  try {
    const tx = await uploadsContract.insertUpload(fileName, filePath, userId);
    const receipt = await tx.wait();
    const event = receipt.logs.find(
      (log: any) => log.fragment.name === "UploadInserted"
    );

    if (event) {
      const [uploadId] = event.args;
      return Number(uploadId);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};

export const getUploads = async (): Promise<Upload[] | undefined> => {
  try {
    const uploads = await uploadsContract.getUploads();
    return uploads.map((upload: Array<RawUpload>) => {
      return formatRawUploadData(upload);
    });
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};

export const getUploadById = async (uploadId: number) => {
  try {
    const upload: RawUpload[] = await uploadsContract.getUploadById(uploadId);
    return formatRawUploadData(upload);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.stack);
      throw err;
    }
  }
};

export const getUserUploads = async (userId: number) => {
  try {
    const uploads = await uploadsContract.getUserUploads(userId);
    return uploads.map((upload: Array<RawUpload>) => {
      return formatRawUploadData(upload);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.stack);
      throw err;
    }
  }
};

function formatRawUploadData(rawUpload: Array<RawUpload>){
  return {
    uploadId: rawUpload[0].toString(),
    fileName: rawUpload[1],
    filePath: rawUpload[2],
    userId: rawUpload[3].toString(),
  }
}