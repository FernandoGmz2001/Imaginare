import { ethers } from "ethers";

export interface Nft {
	title: string;
	image: string;
	autor: string;
	price: string;
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
	nftPaths?: string[],
	amountSpent?: number
}

export type Transaction = {
	nonce: number,
	from: string,
	to: string,
	chainId: number,
	data: string,
	gasLimit?: ethers.BigNumber,
	gasPrice: ethers.BigNumber
}

export type Address = string

export type RawUserInfo = [string, string, string, string]
