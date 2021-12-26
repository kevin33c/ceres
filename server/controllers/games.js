const games = require('../models').games;
const players = require('../models').players;
//games.sync({ force: true });

module.exports = {
  create(req, res) {
    return games
      .create({
        contract_id: req.body.contract_id,
        name: req.body.name,
        contract_address: req.body.contract_address,
        type: req.body.gameType,
        attributes: JSON.stringify(req.body.attributes),
        amount: req.body.amount
      })
      .then(game => {
        //create maker player
        players
          .create({
            game_id: game.id,
            address: req.body.address,
            type: 'maker',
            amount: req.body.amount,
          })
          .then(player => res.status(201).send(player))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return games
      .findAll({
        where:
        {
          status: ['created', 'active', 'completed'] //TODO remove completed
        }
        , order: [
          ['createdAt', 'DESC'],
        ]
      })
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
  },
  terminateGameByID(req, res) {
    return games
      .update({
        status: 'terminated'
      },
        {
          where:
            { id: req.params.id }
        })
      .then(game => res.status(201).send(game))
      .catch(error => res.status(400).send(error));
  },
  completeGameByID(req, res) { //TODO remove complete game end point
    return games
      .update({
        status: 'completed'
        ,outcome: 'taker_wins'
      },
        {
          where:
            { id: req.params.id }
        })
      .then(game => res.status(201).send(game))
      .catch(error => res.status(400).send(error));
  }
};