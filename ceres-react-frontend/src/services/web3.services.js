import { Component } from "react";
import Web3 from "web3";
import { ContractsServices } from './contracts.services';
import { AlertsService } from './alerts.services';

let web3;
const contracts = new ContractsServices();
const alert = new AlertsService();

export class Web3Service extends Component {

    async connect() {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            return true;
        } catch (error) {
            if (error.code === 4001) {
                alert.warn('You need to connect');
                return false;
            } else if (error.code === -32002) {
                alert.warn('You already have an active connection request');
                return false;
            }
            alert.error('Unexpected error ocurred, please try again later');
            return false;
        }
    }


    async checkConnection() {
        // Check if browser is running Metamask
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        }

        try {
            // Check if User is already connected by retrieving the accounts
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            alert.error('Unexpected error ocurred, please try again');
        }

    }

    async deploy(data) {
        const contract = await contracts.getContract();
        const accounts = await web3.eth.getAccounts();
        const result = await new web3.eth.Contract(JSON.parse(contract.abi))
            .deploy({ data: contract.bytecode, arguments: ['Ceres Test'] })
            .send({ from: accounts[0], gas: '1000000', value: web3.utils.toWei(data.amount, 'ether') });

        console.log('Conctact deployed to', result.options.address);

    };

}
