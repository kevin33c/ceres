const players = require('../models').players;
//players.sync({ force: true });

module.exports = {
    join(req, res) {
        return players
            .create({
                game_id: req.body.game_id,
                address: req.body.address,
                type: 'taker',
                amount: req.body.amount,
            })
            .then(player => res.status(201).send(player))
            .catch(error => res.status(400).send(error));
    },
    findByGameId(req, res) {
        return players
          .findAll({
            where:
            {
                game_id: req.params.gameId
            }
          })
          .then(player => res.status(200).send(player))
          .catch(error => res.status(400).send(error))
      }
};