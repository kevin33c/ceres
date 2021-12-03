const contracts = require('../models').contracts;
const games_contract = require('../../contracts/bin/games');
//contracts.sync({ force: true });

module.exports = {
    get(req, res) {
        return res.send(games_contract)
      },
  };