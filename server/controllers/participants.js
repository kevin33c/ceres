const participants = require('../models').participants;
//participants.sync({ force: true });

module.exports = {
    create(req, res) {
        return participants
            .create({
                game_id: req.body.game_id,
                address: req.body.address,
                type: req.body.type
            })
            .then(participants => res.status(201).send(participants))
            .catch(error => res.status(400).send(error));
    }
};