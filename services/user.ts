import { ethers } from "ethers";
import UsersAbi from "@/artifacts/contracts/User.sol/Users.json";
import { API_URL, PRIV_KEY, USER_ADDRESS } from "@/lib/config";
import { User } from "@/types/types";

const provider = new ethers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIV_KEY as string, provider);

const usersContractAddress = USER_ADDRESS as string;
const usersContract = new ethers.Contract(
  usersContractAddress,
  UsersAbi.abi,
  signer
);

export const insertUser = async (
  firstName: string,
  lastName: string
): Promise<number | undefined> => {
  try {
    const tx = await usersContract.insertUser(firstName, lastName);
    const receipt = await tx.wait();
    const event = receipt.events?.find((e: any) => e.event === "UserInserted");
    const newUserId = event?.args?.userId.toNumber();
    return newUserId;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};

export const getUsers = async (): Promise<User[]> => {
  const users = await usersContract.getUsers();
  return users.map((user: any) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    amountSpent: Number(user.amountSpent),
    userId: Number(user.userId),
    nftPaths: user.nftPaths,
  }));
};

export const getUserById = async (
  userId: number
): Promise<User | undefined> => {
  try {
    const user = await usersContract.getUserId(userId);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      amountSpent: Number(user.amountSpent),
      userId: Number(user.userId),
      nftPaths: user.nftPaths,
    };
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};

export const register = async (
  userId: number,
  amount: number
): Promise<void> => {
  const tx = await usersContract.register(userId, amount);
  await tx.wait();
};

export const addNftPaths = async (
  userId: number,
  uploadId: number
): Promise<void> => {
  try {
    const tx = await usersContract.addNftUploadId(userId, uploadId);
    await tx.wait();
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.stack);
      throw err;
    }
  }
};
