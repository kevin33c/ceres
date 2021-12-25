const players = require('../models').players;
const games = require('../models').games;
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
            .then(player => {
                //set game as active
                games
                    .update({
                        status: 'active'
                    },
                        {
                            where:
                                { id: req.body.game_id, }
                        })
                    .then(game => res.status(201).send(game))
                    .catch(error => res.status(400).send(error));
            })
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