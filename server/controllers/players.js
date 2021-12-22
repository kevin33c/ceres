const players = require('../models').players;
//players.sync({ force: true });

module.exports = {
    create(req, res) {
        return players
            .create({
                game_id: req.body.game_id,
                address: req.body.address,
                type: req.body.type,
                currency: req.body.currency,
                amount: req.body.amount,
            })
            .then(players => res.status(201).send(players))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return players
            .findAll()
            .then(players => res.status(200).send(players))
            .catch(error => res.status(400).send(error));
    },
};