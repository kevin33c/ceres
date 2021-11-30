import Web3 from "web3";

let web3;
let isConnected = false;

export class Web3Service {
    
    constructor() { 
        this.checkConnection()
    }

    async connect() {

        //isConnected = await this.checkConnection();
    
        if (!isConnected) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                if (error.code === 4001) {
                    // User rejected request
                }
                console.log(error);
            }
        } else {
            console.log('here');
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

    async deploy(_abi, _bytecode) {
        const abi = '[{"constant":false,"inputs":[{"name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialMessage","type":"string"}],"payable":true,"stateMutability":"payable","type":"constructor"}]';
        const bytecode = '60606040526040516103833803806103838339810160405280805190910190506000818051610032929160200190610039565b50506100d4565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061007a57805160ff19168380011785556100a7565b828001600101855582156100a7579182015b828111156100a757825182559160200191906001019061008c565b506100b39291506100b7565b5090565b6100d191905b808211156100b357600081556001016100bd565b90565b6102a0806100e36000396000f300606060405263ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663368b87728114610047578063e21f37ce1461009a57600080fd5b341561005257600080fd5b61009860046024813581810190830135806020601f8201819004810201604051908101604052818152929190602084018383808284375094965061012495505050505050565b005b34156100a557600080fd5b6100ad61013b565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156100e95780820151838201526020016100d1565b50505050905090810190601f1680156101165780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60008180516101379291602001906101d9565b5050565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101d15780601f106101a6576101008083540402835291602001916101d1565b820191906000526020600020905b8154815290600101906020018083116101b457829003601f168201915b505050505081565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061021a57805160ff1916838001178555610247565b82800160010185558215610247579182015b8281111561024757825182559160200191906001019061022c565b50610253929150610257565b5090565b61027191905b80821115610253576000815560010161025d565b905600a165627a7a72305820924b6ba0eb63b6eca5b692ed4a80c4bb562cdfad1b6fa3a25134893710b283ed0029';

        const accounts =  await web3.eth.getAccounts();
        const result = await new web3.eth.Contract(JSON.parse(abi))
                .deploy({ data: bytecode, arguments: ['Ceres Test']})
                .send({ from: accounts[0], gas: '1000000', value: web3.utils.toWei('0.01', 'ether')});
        
        console.log('Conctact deployed to', result.options.address);
    };
    
}