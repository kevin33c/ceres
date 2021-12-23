import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar'
import {
  Typography
  , LinearProgress
  , Box
} from '@mui/material';


import { GamesServices } from '../../services/games.services';

const games = new GamesServices()

function Game() {
  //access to url parameter based on index.js router
  const params = new useParams();
  const [game, setGame] = useState({});

  //trigger before the page load
  useEffect(() => {
    getGame();
    return () => {
      setGame({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getGame() {
    var data = await games.getGameById(params.gameId);
    setGame({
      id: data.id
      , contract_address: data.contract_address
      , name: data.name
      , status: data.status
      , type: data.type
      , create_at: data.createdAt
      , updated_at: data.updatedAt
    });
  }

  return (
    <div>
      <Navbar />
      {!game.id &&
        < Box ssx={{ width: '100%' }}>
          <LinearProgress color="secondary"/>
        </Box>
      }
      <Typography align='center' variant='subtitle2' sx={{ mt: '15px' }}>
        {game.create_at}
      </Typography>
    </div >
  )
}

export default Game
