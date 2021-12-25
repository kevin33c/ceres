import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { GamesServices } from '../../services/games.services';

import Navbar from '../navbar/Navbar'
import {
  Container
  , Typography
  , CardContent
  , CardActions
  , Button
  , Card
  , CardMedia
  , Grid
  , Chip
  , Box
  , LinearProgress
} from '@mui/material';

const games = new GamesServices();

function GamesList() {

  const [gamesList, setGamesList] = useState([]);

  //trigger before the page load
  useEffect(() => {
    getGames();
    return () => {
      setGamesList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getGames() {
    const data = await games.getGames();
    setGamesList(data);
  }

  return (
    <div className="container">
      <Navbar />
      {gamesList?.length === 0
        ? < Box sx={{ width: '100%' }}>
          <LinearProgress color="secondary" />
        </Box>

        : <Container fixed>
          <Grid container spacing={2} sx={{ mt: '3%' }}>
            {gamesList?.map((game) => (
              <Grid item xs={3} key={game?.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="metamask"
                    height="100"
                    image="/static/images/metamask-fox.png"
                  />
                  <CardContent>
                    <Typography noWrap gutterBottom variant="body2" component="div">
                      {game?.contract_address}
                    </Typography>
                    <Typography noWrap variant="body2" color="text.secondary" component="div">
                      <Chip label={game?.type} color="primary" size="small" /> <Chip label={game?.status} color="secondary" size="small" />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/game/${game?.id}`}>
                      <Button size="small">
                        See Details
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      }
    </div>
  )
}

export default GamesList
