const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const config = require('../../config/configs');

const provider = new HDWalletProvider(
  config.mnemonic,
  config.infura_url
);

const web3 = new Web3(provider);

var abi = '[\n\t{\n\t\t\"inputs\": [],\n\t\t\"stateMutability\": \"payable\",\n\t\t\"type\": \"constructor\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"endGame\",\n\t\t\"outputs\": [],\n\t\t\"stateMutability\": \"payable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"joinGame\",\n\t\t\"outputs\": [],\n\t\t\"stateMutability\": \"payable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"makerAmount\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"playersList\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"account\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"internalType\": \"bool\",\n\t\t\t\t\"name\": \"is_maker\",\n\t\t\t\t\"type\": \"bool\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"amount\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"_outcome\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"settleGame\",\n\t\t\"outputs\": [],\n\t\t\"stateMutability\": \"payable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"takerAmount\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t}\n]'

var contract_address = '0xde1f41CE7702A373a808436d5074108DD2DB398E'

var outcome = "2" //1 = maker wins 2 = taker wins

async function settle(/*abi, contract_address, outcome*/) {
  const accounts = await web3.eth.getAccounts();
  //create contract instance
  const contractInstance = new web3.eth.Contract(JSON.parse(abi), contract_address);
  //call join game function in eth contract
  await contractInstance.methods
    .settleGame(outcome)
    .send({ from: accounts[0], gas: '10000000' })
    .on('transactionHash', (hash) => {
      console.log("ON transactionHash:", hash);
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log("ON confirmation:", confirmationNumber, receipt);
    })
    .on('receipt', (receipt) => {
      console.log(receipt);
    })
    .on('error', (err) => {
      console.log(err);
    });
};

settle();