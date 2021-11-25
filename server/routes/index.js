const controllers = require('../controllers/index');

module.exports = (app) => {
  app.get('/api/games', controllers.games.list);
  app.post('/api/games', controllers.games.create);
};