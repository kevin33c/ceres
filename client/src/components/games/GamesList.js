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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getGames() {
    const data = await games.getGames();
    setGamesList(data);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
                    <Typography variant="body2" color="text.secondary" component="div">
                      <Chip label={capitalizeFirstLetter(game?.type)} color="primary" size="small" /> {game?.status === 'created' ? <Chip color="secondary" size="small" label={capitalizeFirstLetter(game?.status)} />
                        : game?.status === 'active' ? <Chip color="success" size="small" label={capitalizeFirstLetter(game?.status)} />
                          : game?.status === 'completed' ? <Chip color="primary" size="small" label={capitalizeFirstLetter(game?.status)} />
                            : <Chip color="error" size="small" label={capitalizeFirstLetter(game?.status)} />
                      }
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p" sx={{ mt: '5%' }}>
                      {game?.name}
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
