const games = require('../models').games;
//games.sync({ force: true });
const players = require('../models').players;

module.exports = {
  create(req, res) {
    return games
      .create({
        contract_id: req.body.contract_id,
        name: req.body.name,
        contract_address: req.body.contract_address,
        type: req.body.gameType,
        resolver_api: req.body.resolver_api,
        currency: 'eth',
        amount: req.body.amount
      })
      .then(game => {
        //create maker player
        players
          .create({
            game_id: game.id,
            address: req.body.address,
            type: 'maker',
            currency: 'eth',
            amount: req.body.amount,
          })
          .then(player => res.status(201).send(player))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return games
      .findAll()
      .then(games => res.status(200).send(games))
      .catch(error => res.status(400).send(error));
  },
  findById(req, res) {
    return games
      .findOne({
        where:
        {
          id: req.params.id
        }
      })
      .then(game => res.status(200).send(game))
      .catch(error => res.status(400).send(error))
  }
};