import './Navbar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import Connect from '../web3/Connect';
import Deploy from '../web3/Deploy';

//rfce
function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="navbar" position="sticky" color="default" elevation={0} sx={{ bgcolor: "#1fe0" }}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ color: "white", flexGrow: 1 }} >
            CERES
          </Typography>
          <Link to="/create" style={{ textDecoration: 'none' }}>
            <Button size="small"
              sx={{ color: "white" }} >
              Create
            </Button>
          </Link>
          <Connect />
          <Deploy />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar
