import hardhat from 'hardhat'

const { ethers } = hardhat

async function main() {
	// We get the contract to deploy
	const Contract = await ethers.getContractFactory('Users');
	console.log('Deploying contract...');
	const contract = await Contract.deploy();
	const txHash = contract.deployTransaction.hash
	const txReceipt = await ethers.provider.waitForTransaction(txHash)
	console.log('Contract deployed to address: ', txReceipt.contractAddress)
	console.log('Contract deployed to:', contract.address);
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
