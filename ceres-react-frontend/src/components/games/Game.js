import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar'
import {
  Typography
  , LinearProgress
  , Box
  , Tabs
  , Tab
  , Container
  , Table
  , TableBody
  , TableCell
  , TableContainer
  , TableRow
  , Paper
  , Chip
  , Link
  , Tooltip
} from '@mui/material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';


import { GamesServices } from '../../services/games.services';
import JoinGame from '../forms/JoinGame';


const games = new GamesServices();

function Game() {
  //access to url parameter based on index.js router
  const params = new useParams();
  const [game, setGame] = useState('');
  const [tabNumber, setTabNumber] = useState(0);

  //trigger before the page load
  useEffect(() => {
    getGame();
    return () => {
      getGame({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getGame() {
    var data = await games.getGameById(params.gameId);
    setGame(data);
  }

  const handleTabChange = (event, newValue) => {
    setTabNumber(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="container">
      <Navbar />
      {!game.id
        ? < Box sx={{ width: '100%' }}>
          <LinearProgress color="secondary" />
        </Box>

        : <Container fixed>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabNumber} onChange={handleTabChange} textColor="secondary">
              <Tab label="Summary" {...a11yProps(0)} />
              <Tab label="Activities" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tabNumber} index={0}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              [ This is an alpha/test version, no real transaction took place ]
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Contract Address:
                    </TableCell>
                    <TableCell align="left">
                      <Link href={`https://rinkeby.etherscan.io/address/${game.contract_address}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {game.contract_address}</Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Game Status:
                    </TableCell>
                    <TableCell align="left">
                      {game.status === 'created' ? <Chip color="secondary" label={game.status.toUpperCase()} />
                        : game.status === 'active' ? <Chip color="primary" label={game.status.toUpperCase()} />
                          : game.status === 'completed' ? <Chip color="success" label={game.status.toUpperCase()} />
                            : <Chip color="error" label={game.status.toUpperCase()} />
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Game Type:
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title={game.type}>
                        <CloudQueueIcon fontSize="large" color='primary' />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Amount:
                    </TableCell>
                    <TableCell align="left">
                      {game.amount}ETH
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Outcome:
                    </TableCell>
                    <TableCell align="left">
                      {game.outcome ? <Chip color="success" label={game.outcome} />
                        : <Chip color="error" label='UNDECIDED' />
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Create Date:
                    </TableCell>
                    <TableCell align="left">
                      {game.createdAt}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Last Updated Date:
                    </TableCell>
                    <TableCell align="left">
                      {game.updatedAt}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <JoinGame data={game}/>
          </TabPanel>
          <TabPanel value={tabNumber} index={1}>
            Coming Soon...
          </TabPanel>
        </Container>
      }
    </div >
  )
}

export default Game
