import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar'
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
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
  , TableHead
} from '@mui/material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';


import { GamesServices } from '../../services/games.services';
import { PlayersServices } from '../../services/players.services';
import JoinGame from '../forms/JoinGame';


const gamesServices = new GamesServices();
const playersServices = new PlayersServices();

function Game() {
  //access to url parameter based on index.js router
  const params = new useParams();
  const [game, setGame] = useState({});
  const [players, setPlayers] = useState([]);
  const [tabNumber, setTabNumber] = useState(0);

  //trigger before the page load
  useEffect(() => {
    getGame();
    getPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getGame() {
    var data = await gamesServices.getGameById(params.gameId);
    setGame(data);
  }

  async function getPlayers() {
    var data = await playersServices.getPlayersByGameId(params.gameId);
    setPlayers(data);
  }

  const handleTabChange = (event, newValue) => {
    setTabNumber(newValue);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

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

  function ParticipatedAmountSum() {
    var total = 0
    for (var i = 0; i < players.length; i++) {
      if (players[i].type === 'taker') {
        total += players[i].amount;
      }
    }
    var participatedPercentage = Math.round((total / game?.amount) * 100);

    return { total: total, percentage: participatedPercentage };
  }

  return (
    <div className="container">
      <Navbar />
      {!game?.contract_address
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
                      <Link href={`https://rinkeby.etherscan.io/address/${game?.contract_address}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {game?.contract_address}</Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Game Status:
                    </TableCell>
                    <TableCell align="left">
                      {game?.status === 'created' ? <Chip color="secondary" label={game?.status.toUpperCase()} />
                        : game?.status === 'active' ? <Chip color="success" label={game?.status.toUpperCase()} />
                          : game?.status === 'completed' ? <Chip color="primary" label={game?.status.toUpperCase()} />
                            : <Chip color="error" label={game?.status.toUpperCase()} />
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Game Type:
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title={game?.type}>
                        <CloudQueueIcon fontSize="large" color='primary' />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Game Name:
                    </TableCell>
                    <TableCell align="left">
                      {game?.name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Game Amount:
                    </TableCell>
                    <TableCell align="left">
                      {game?.amount} {game?.currency.toUpperCase()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Amount Participated:
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant='subtitle2'>
                        {ParticipatedAmountSum().total} {game?.currency.toUpperCase()} ({ParticipatedAmountSum().percentage}% participated)
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Outcome:
                    </TableCell>
                    <TableCell align="left">
                      {game?.outcome ? <Chip color="success" label={game?.outcome} />
                        : <Chip color="error" label='UNDECIDED' />
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Timestamp:
                    </TableCell>
                    <TableCell align="left">
                      {game?.createdAt}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <JoinGame data={game} />
          </TabPanel>
          <TabPanel value={tabNumber} index={1}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      Date
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Account Address
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Activity
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Amount
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.createdAt}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.address}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row?.type === 'maker' ? 'Game Created'
                          : 'Joined Game'
                        }
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.amount} ETH
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Container>
      }
    </div >
  )
}

export default Game
