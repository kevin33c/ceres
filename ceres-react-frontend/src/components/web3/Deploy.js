import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Web3Service } from '../../services/web3.services';

const web3Service = new Web3Service;

function Deploy() {
    return (
        <div>
            <Button size="small"
                onClick={web3Service.deploy}
                sx={{ color: 'text.primary' }} >
                <CloudUploadIcon />
            </Button>
        </div>
    )
}

export default Deploy
