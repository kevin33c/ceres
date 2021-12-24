//import { useState } from 'react';
import {
    Typography
    , Box
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

    return (
        <div>
            <Box sx={style}>
                <Typography variant="h6" align="center" margin="dense" sx={{ color: 'black' }}>
                    JOIN THE GAME
                </Typography>
            </Box>
        </div>
    )
}

export default JoinGame
