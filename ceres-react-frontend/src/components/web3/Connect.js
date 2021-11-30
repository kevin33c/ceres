import Button from '@mui/material/Button';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import Badge from '@mui/material/Badge';
import { Web3Service } from '../../services/web3.services';

const web3Service = new Web3Service;

function Connect() {
    return (
        <div>
            {!web3Service.checkConnection
                ? <Button size="small"
                    onClick={web3Service.connect}
                    disabled={true}
                    sx={{ color: 'text.primary' }} >
                    Connected
                    <Badge variant="dot" color="success">
                        <ElectricalServicesIcon />
                    </Badge>
                </Button>
                : <Button size="small"
                    onClick={web3Service.connect}
                    sx={{ color: 'text.primary' }} >
                    Connect
                    <Badge variant="dot" color="error">
                        <ElectricalServicesIcon />
                    </Badge>
                </Button>
            }
        </div>
    );
}

export default Connect;
