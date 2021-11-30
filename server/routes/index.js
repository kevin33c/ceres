const controller = require('../controllers/index');

module.exports = (app) => {
  app.get('/api/games', controller.games.list);
  app.post('/api/games', controller.games.create);
  app.get('/api/contracts', controller.contracts.get);
};