const games_contract = require('../../contracts/bin/games');

module.exports = {
    get(req, res) {
        return res.send(games_contract)
      },
  };