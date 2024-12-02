import { ethers} from 'ethers';
import uploadsAbi from '@/artifacts/contracts/Upload.sol/Uploads.json';
import { API_URL, PRIV_KEY, UPLOAD_ADDRESS,  } from '@/lib/config';

const provider = new ethers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIV_KEY as string, provider);

const uploadsContractAddress = UPLOAD_ADDRESS as string;
const uploadsContract = new ethers.Contract(uploadsContractAddress, uploadsAbi.abi, signer);

export const insertUpload = async (fileName: string, filePath: string, userId: number) => {
  const tx = await uploadsContract.insertUpload(fileName, filePath, userId);
  const receipt = await tx.wait();  // Espera la confirmación de la transacción
  return receipt.transactionHash;
};

export const getUploads = async () => {
  const uploads = await uploadsContract.getUploads();
  return uploads;
};

export const getUploadById = async (uploadId: number) => {
  const upload = await uploadsContract.getUploadById(uploadId);
  return upload;
};

export const getUserUploads = async (userId: number) => {
  const uploads = await uploadsContract.getUserUploads(userId);
  return uploads;
};