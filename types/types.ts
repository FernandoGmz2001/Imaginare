import { ethers } from "ethers";

export interface Nft {
  title: string;
  image: string;
  autor: string;
  price: string;
  id?: number;
}

export type NftPrompt = {
	name: string,
	description: string,
	prompt: string
}

export type MetaData = {
	image: string,
	name: string,
	description: string,
	attributes: Object[]
}

export type User = {
	userId?: number,
	firstName: string,
	lastName: string,
	nftUploadIds: number[],
	amountSpent?: number
}

export type Transaction = {
	nonce: number,
	from: string,
	to: string,
	chainId: bigint,
	data: string,
	gasLimit?: bigint,
	gasPrice: bigint
}

export type Address = string

export type RawUserInfo = [string, string, string, string]

export type Upload = {
	fileName: string,
	filePath: string,
	userId?: bigint,
	uploadId?: bigint
}

export type RawUpload = [bigint, string, string, bigint]