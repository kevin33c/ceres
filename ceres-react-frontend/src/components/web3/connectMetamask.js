import Button from '@mui/material/Button';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import Badge from '@mui/material/Badge';
import Web3 from "web3";

//color="primary" https://mui.com/api/badge/

function ConnectMetamask() {
    return (
        <Button size="small" 
        onClick={connectMetaMask} 
        sx={{color: 'text.primary'}} >
            Connect
            <Badge variant="dot" color="error">
                <ElectricalServicesIcon />
            </Badge>
        </Button>
    );
}

function connectMetaMask(){
    
    const web3Session = window.ethereum.request(
        { method: "eth_requestAccounts" }
    )
    .catch(e => console.log(e));
        
    const web3 = new Web3(web3Session);    
}

export default ConnectMetamask;
