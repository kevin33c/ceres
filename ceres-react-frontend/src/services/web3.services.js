import { Component } from "react";
import Web3 from "web3";
import { Contracts } from './contracts.services';

let web3;
const contracts = new Contracts();

export class Web3Service extends Component {

    async connect() {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            if (error.code === 4001) {
                console.log(error.message);
            }
            console.log(error.message);
        }
    }


    async checkConnection() {
        // Check if browser is running Metamask
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        };
        // Check if User is already connected by retrieving the accounts
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async deploy() {
        const contract = await contracts.get();
        const accounts = await web3.eth.getAccounts();
        const result = await new web3.eth.Contract(JSON.parse(contract.abi))
            .deploy({ data: contract.bytecode, arguments: ['Ceres Test'] })
            .send({ from: accounts[0], gas: '1000000', value: web3.utils.toWei('0.01', 'ether') });

        console.log('Conctact deployed to', result.options.address);

    };

}
