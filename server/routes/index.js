const controller = require('../controllers/index');

module.exports = (app) => {
  //games
  app.get('/api/games', controller.games.list);
  app.get('/api/games/:id', controller.games.findById);
  app.post('/api/games', controller.games.create);
  
  //contracts
  app.get('/api/contracts', controller.contracts.get);
  app.post('/api/contracts', controller.contracts.create);

  //players
  app.post('/api/players', controller.players.join);
  app.get('/api/players/:gameId', controller.players.findByGameId);
};