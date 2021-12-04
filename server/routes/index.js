const controller = require('../controllers/index');

module.exports = (app) => {
  //games
  app.get('/api/games', controller.games.list);
  app.post('/api/games', controller.games.create);
  
  //contracts
  app.get('/api/contracts', controller.contracts.get);
  app.post('/api/contracts', controller.contracts.create);

  //participants
  app.post('/api/participants', controller.participants.create);
};