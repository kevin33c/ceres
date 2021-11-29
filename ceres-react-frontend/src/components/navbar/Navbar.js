import './Navbar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ConnectMetamask from '../web3/ConnectMetamask';

//rfce
function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar className="navbar" position="sticky" color="default" sx={{bgcolor: "#1fe0"}}>
            <Toolbar variant="dense">
              <Typography variant="h6" component="div" sx={{color: 'text.primary', flexGrow: 1}} >
                Project Ceres
              </Typography>
              <ConnectMetamask/>
            </Toolbar>
          </AppBar>
        </Box>
      );
}

export default Navbar
