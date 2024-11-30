import { API_URL, PRIV_KEY, PUB_KEY, USER_ADDRESS } from "@/lib/config";
import { ethers } from "ethers";
import contract from '@/artifacts/contracts/User.sol/Users.json'
import { RawUserInfo, Transaction, User } from "@/types/types";

async function createTransaction(provider: ethers.providers.JsonRpcProvider, method: string, params: any) {
	const etherInterface = new ethers.utils.Interface(contract.abi);
	const nonce = await provider.getTransactionCount(PUB_KEY as string, 'latest')
	const gasPrice = await provider.getGasPrice();
	try {
		const network = await provider.getNetwork();
		const { chainId } = network;
		const transaction: Transaction = {
			from: PUB_KEY as string,
			to: USER_ADDRESS as string,
			nonce,
			chainId,
			gasPrice,
			data: etherInterface.encodeFunctionData(method, params)
		}
		console.log(transaction)
		return transaction;
	} catch (err) {
		if (err instanceof Error) {
			console.log(err.message, err.stack)
			throw err
		}
	}


}

export async function createUser({ firstName, lastName }: User) {
	try {
		const provider = new ethers.providers.JsonRpcProvider(API_URL);
		const wallet = new ethers.Wallet(PRIV_KEY as string, provider);
		const transaction = await createTransaction(provider, "insertUser", [firstName, lastName]);
		if (!transaction) throw new Error("Error on transaction")
		const estimateGas = await provider.estimateGas(transaction)

		transaction.gasLimit = estimateGas;
		const signedTx = await wallet.signTransaction(transaction);
		const transactionReceipt = await provider.sendTransaction(signedTx)
		await transactionReceipt.wait();
		const hash = transactionReceipt.hash
		const receipt = await provider.getTransactionReceipt(hash);

		return receipt

	}
	catch (error) {
		if (error instanceof Error) {
			throw error
		}
	}


}
export async function getUsers(): Promise<User[]> {
	const userContract = getContract();
	if (!userContract) throw new Error("Error on create contract instance")
	const res = await userContract.getUsers();
	const users: User[] = res.map((rawUser: RawUserInfo) => formatUser(rawUser))
	return users;
}

export async function getUser({ userId }: User) {
	const userContract = getContract();
	if (!userContract) throw new Error("Error on create contract instance")
	const result = await userContract.getUserId(userId);

	return formatUser(result);

}

function getContract() {
	try {
		const provider = new ethers.providers.JsonRpcProvider(API_URL);
		const userContract = new ethers.Contract(
			USER_ADDRESS as string,
			contract.abi,
			provider
		);
		return userContract;
	} catch (error) {
		if (error instanceof Error) {
			console.error('Failed to create contract instance:', error.message);
			throw error;
		}
	}
}
function formatUser(info: RawUserInfo): User {
	return {
		firstName: info[0],
		lastName: info[1],
		amountSpent: ethers.BigNumber.from(info[2]).toNumber(),
		userId: ethers.BigNumber.from(info[3]).toNumber()
	}
}
async function updateAmount(userId: number, amount: number) {
	const provider = new ethers.providers.JsonRpcProvider(API_URL);
	const wallet = new ethers.Wallet(PRIV_KEY as string, provider);
	const transaction = await createTransaction(provider, "register", [userId, amount]);
	const estimateGas = await provider.estimateGas(transaction)
	transaction["gasLimit"] = estimateGas;
	const signedTx = await wallet.signTransaction(transaction);
	const transactionReceipt = await provider.sendTransaction(signedTx)
	await transactionReceipt.wait();
	const hash = transactionReceipt.hash
	const receipt = await provider.getTransactionReceipt(hash);
	return receipt
}


