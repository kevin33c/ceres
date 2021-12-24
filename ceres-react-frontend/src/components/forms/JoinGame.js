import { useState } from 'react';
import {
    Typography
    , Box
    , Button
    , Modal
} from '@mui/material';

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

function JoinGame() {

    const [open, setOpen] = useState(false);

    const handleOpen = async () => {
        setOpen(true);
    }

    const handleClose = async () => {
        setOpen(false);
    }

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
                </Box>
            </Modal>
        </div>
    )
}

export default JoinGame
