import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Typography
    , Box
    , Button
    , Modal
    , FormControl
    , TextField
    , FormHelperText
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { Web3Service } from '../../services/web3.services';


const web3Service = new Web3Service();

const style = {
    width: '30%',
    maxWidth: '100vw',
    maxHeight: '100%',
    position: 'fixed',
    top: '30%',
    left: '30%',
    transform: 'translate(0, -50%)',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

let isConnected;

function JoinGame(props) {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [connected, setConnected] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleOpen = async () => {
        checkConnection()
        setOpen(true);
    }

    const handleClose = async () => {
        checkConnection()
        setOpen(false);
    }

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    async function handleSubmit() {
        setLoading(true);
        var data = {
            amount: amount
            , contract_address: props.data.contract_address
        }
        try {
            const res = await web3Service.join(data);
            console.log(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    async function checkConnection() {
        isConnected = await web3Service.checkConnection();
        setConnected(isConnected);
    }

    async function connect() {
        await web3Service.connect();
        checkConnection();
    }

    function SubmitButton() {
        if (amount > 0) {
            return <>
                <LoadingButton
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: '15px', mb: '15px' }}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SendIcon />}
                >
                    Join Game
                </LoadingButton>
            </>
        } else {
            return <Button
                fullWidth
                variant="contained"
                sx={{ mt: '15px', mb: '15px' }}
                disabled
            >
                Join Game
            </Button>
        };
    };

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen}
                sx={{ mt: '15px', mb: '15px' }}
            >
                Join Game
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography variant="h6" align="center" margin="dense" sx={{ color: 'black' }}>
                        JOIN THE GAME
                    </Typography>
                    <form>
                        <FormControl fullWidth sx={{ mt: '15px', mb: '15px' }}>
                            <TextField
                                id="filled-number"
                                label="Amount (ETH)"
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                            />
                        </FormControl>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="contained"
                            onClick={connect}
                            sx={{ mt: '15px' }}
                            disabled={connected}>
                            Connect to Metamask
                        </Button>
                        {connected
                            ? <FormHelperText>You are connected to Metamask</FormHelperText>
                            : <FormHelperText>You need to connect to Metamask before joining a game</FormHelperText>
                        }
                        <SubmitButton />
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default JoinGame
