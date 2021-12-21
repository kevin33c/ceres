import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import Connect from '../web3/Connect';
import CreateGame from '../forms/CreateGame'

//rfce
function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="navbar" position="sticky" color="default" elevation={0} sx={{ bgcolor: "#1fe0" }}>
        <Toolbar variant="dense">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button size="small"
              sx={{ color: "black" }} component="div">
              Project CERES
            </Button>
          </Link>
          <Typography variant="h6" component="div" sx={{ color: "black", flexGrow: 1 }} >
          </Typography>
          <CreateGame />
          <Connect />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar
