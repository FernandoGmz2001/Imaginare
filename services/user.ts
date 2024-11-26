import { API_URL, PRIV_KEY, PUB_KEY } from "@/lib/config";

const { ethers } = require('ethers')
const contract = require('../artifacts/contracts/User.sol/Users.json')
 
async function createTransaction(provider,method,params){
    const etherInterface = new ethers.utils.Interface(contract.abi);
    const nonce = await provider.getTransactionCount(PUB_KEY,'latest')
    const gasPrice = await provider.getGasPrice();
    const network = await provider.getNetwork();
    const { chainId } = network;
    const transaction = {
        from: PUB_KEY,
        to: USER_ADDRESS,
        nonce,
        chainId,
        gasPrice,
        data: etherInterface.encodeFunctionData(method, params)
    }
    return transaction;
}
 
async function createUser(firstName,lastName) {
    try{
        const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const wallet = new ethers.Wallet(PRIV_KEY, provider);
    const transaction = await createTransaction(provider, "insertUser", [firstName, lastName]);
    const estimateGas = await provider.estimateGas(transaction)
    transaction["gasLimit"] = estimateGas;
    const signedTx = await wallet.signTransaction(transaction);
    const transactionReceipt=await provider.sendTransaction(signedTx)
    await transactionReceipt.wait();
   const hash = transactionReceipt.hash
    const receipt = await provider.getTransactionReceipt(hash);
    
    return receipt

    }
    catch(error){
        console.log(error);
    }

    
}
async function getUsers() {
    const userContract = getContract();
    const res = await userContract.getUsers();
    var users = [];
    res.forEach((user) => {
      users.push(formatUser(user));
    });
    return users;
  }
  async function getUser(userId) {
   
        const userContract = getContract();
        const result = await userContract.getUserId(userId);
     
        return formatUser(result);
 
}
 
function getContract() {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const userContract = new ethers.Contract(
      USER_ADDRESS,
      contract.abi,
      provider
    );
    return userContract;
  }
function formatUser(info){
    return {
        firstName:info[0],
        lastName:info[1],
        amountSpent: ethers.BigNumber.from(info[2]).toNumber(),
        userId: ethers.BigNumber.from(info[3]).toNumber()
    }
}
async function updateAmount(userId, amount) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const transaction = await createTransaction(provider, "register", [userId, amount]);
    const estimateGas = await provider.estimateGas(transaction)
    transaction["gasLimit"] = estimateGas;
    const signedTx = await wallet.signTransaction(transaction);
    const transactionReceipt=await provider.sendTransaction(signedTx)
    await transactionReceipt.wait();
   const hash = transactionReceipt.hash
    const receipt = await provider.getTransactionReceipt(hash);
    return receipt
}
 

