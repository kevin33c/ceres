const controller = require('../controllers/index');

module.exports = (app) => {
  //games
  app.post('/api/games', controller.games.create);
  app.get('/api/games', controller.games.list);
  app.get('/api/games/:id', controller.games.findById);
  app.put('/api/games/terminate/:id', controller.games.terminateGameByID);
  app.put('/api/games/complete/:id', controller.games.completeGameByID);
  
  //contracts
  app.post('/api/contracts', controller.contracts.create);
  app.get('/api/contracts', controller.contracts.get);


  //players
  app.post('/api/players', controller.players.join);
  app.get('/api/players/:gameId', controller.players.findByGameId);
};