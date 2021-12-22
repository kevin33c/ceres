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
  app.post('/api/players', controller.players.create);
  app.get('/api/players', controller.players.list);
  app.get('/api/players/:address', controller.players.findByAddress);
};