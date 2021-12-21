import { Component } from "react";
import Button from '@mui/material/Button';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import Badge from '@mui/material/Badge';
import { Web3Service } from '../../services/web3.services';

const web3Service = new Web3Service();
let isConnected;

class Connect extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            isConnected : ''
        };
    
        this.connect = this.connect.bind(this);
    }


    async componentDidMount() {
        this.checkConnection();
    }

    async connect(){
        await web3Service.connect();
        this.checkConnection();
    }

    async checkConnection(){
        isConnected = await web3Service.checkConnection();
        this.setState({ isConnected });
    }

    render() {
        return (
            <div>
                {this.state.isConnected
                    ? <Button size="small"
                        disabled={true}
                        sx={{ color: "black" }} >
                        <Badge variant="dot" color="success">
                            <ElectricalServicesIcon />
                        </Badge>
                    </Button>
                    : <Button size="small"
                        onClick={this.connect}
                        sx={{ color: "black" }} >
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
