import { ethers} from 'ethers';
import uploadsAbi from '@/artifacts/contracts/Upload.sol/Uploads.json';
import { API_URL, PRIV_KEY, UPLOAD_ADDRESS,  } from '@/lib/config';
import { Upload } from '@/types/types';

const provider = new ethers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIV_KEY as string, provider);

const uploadsContractAddress = UPLOAD_ADDRESS as string;
const uploadsContract = new ethers.Contract(uploadsContractAddress, uploadsAbi.abi, signer);

export const insertUpload = async (fileName: string, filePath: string, userId: number): Promise<number | undefined> => {
  try{
    const tx = await uploadsContract.insertUpload(fileName, filePath, userId);
    const receipt = await tx.wait();
		const event = receipt.events?.find((e: any) => e.event === 'UploadInserted');
		const newUploadId = event?.args?.uploadId.toNumber();
		return newUploadId;
  }catch(err){
    if(err instanceof Error){
      throw err
    }
  }
};

export const getUploads = async (): Promise<Upload[] | undefined> => {
  try{
    const uploads: Upload[] = await uploadsContract.getUploads();
    return uploads;
  }catch(err){
    if(err instanceof Error){
      throw err
    }
  }
};

export const getUploadById = async (uploadId: number) => {
  const upload = await uploadsContract.getUploadById(uploadId);
  return upload;
};

export const getUserUploads = async (userId: number) => {
  const uploads = await uploadsContract.getUserUploads(userId);
  return uploads;
};