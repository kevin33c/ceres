import React from "react";
import Button from '@mui/material/Button';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import Badge from '@mui/material/Badge';
import { Web3Service } from '../../services/web3.services';

const web3Service = new Web3Service;
let isConnected;

class Connect extends React.Component {
    state = {
        isConnected: "",
    };

    async componentDidMount() {
        isConnected = await web3Service.checkConnection();
        this.setState({ isConnected });
    }

    render() {
        return (
            <div>
                {this.state.isConnected
                    ? <Button size="small"
                        disabled={true}
                        sx={{ color: "white" }} >
                        <Badge variant="dot" color="success">
                            <ElectricalServicesIcon />
                        </Badge>
                    </Button>
                    : <Button size="small"
                        onClick={web3Service.connect}
                        sx={{ color: "white" }} >
                        Connect
                        <Badge variant="dot" color="error">
                            <ElectricalServicesIcon />
                        </Badge>
                    </Button>
                }
            </div>
        );
    }
}

export default Connect;
