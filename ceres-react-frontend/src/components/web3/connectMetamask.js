import Button from '@mui/material/Button'
import Web3 from "web3";

function ConnectMetamask() {
    return (
        <Button variant="contained" onClick={triggerWeb3}>Connect Metamask</Button>
    );
};

function triggerWeb3(){
    window.ethereum.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(window.ethereum);
};

export default ConnectMetamask;
