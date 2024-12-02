import { ContractFactory, ethers } from 'ethers';
import userContract from '../artifacts/contracts/User.sol/Users.json' with {type: "json"}
import uploadContract from '../artifacts/contracts/Upload.sol/Uploads.json' with {type: "json"}


const {API_URL, PRIV_KEY} = process.env
async function main() {
	// We get the contract to deploy
	const provider = new ethers.JsonRpcProvider(API_URL);
	const signer = new ethers.Wallet(PRIV_KEY, provider);
	const factory = new ContractFactory(uploadContract.abi, uploadContract.bytecode, signer);
	console.log('Deploying contract...');
	const contract = await factory.deploy();
	await contract.waitForDeployment()
	console.log('Contract deployed to:', await contract.getAddress());
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
