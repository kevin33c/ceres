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
} from '@mui/material';

const games = new GamesServices();

function GamesList() {

  const [gamesList, setGamesList] = useState(['']);

  //trigger before the page load
  useEffect(() => {
    getGames();
    return () => {
      getGames({});
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
      {gamesList &&
        <Container fixed>
          <Grid container spacing={2} sx={{ mt: '3%' }}>
            {gamesList.map((game) => (
              <Grid item xs={4} key={game.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="metamask"
                    height="100"
                    image="/static/images/metamask-fox.png"
                  />
                  <CardContent>
                    <Typography noWrap gutterBottom variant="body2" component="div">
                      {game.contract_address}
                    </Typography>
                    <Typography noWrap variant="body2" color="text.secondary">
                      {game.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/game/${game.id}`}>
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
