const players = require('../models').players;
//players.sync({ force: true });

module.exports = {
    create(req, res) {
        return players
            .create({
                game_id: req.body.game_id,
                address: req.body.address,
                type: req.body.type
            })
            .then(players => res.status(201).send(players))
            .catch(error => res.status(400).send(error));
    }
};