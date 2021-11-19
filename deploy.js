const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const config = require('./config');


const provider = new HDWalletProvider(
    config.mnemonic,
    'https://rinkeby.infura.io/v3/e9ad0f694cc84bb7a7a9c5ed9aeba978'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts =  await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: bytecode, arguments: ['Ceres Test'] })
            .send({ from: accounts[0], gas: '1000000' });
    
    console.log('Conctact deployed to', result.options.address);
    //https://rinkeby.etherscan.io/
};

deploy();