const games = require('../models').games;
//games.sync({ force: true });

module.exports = {
  create(req, res) {
    return games
      .create({
        contract_id: req.body.contract_id,
        name: req.body.name,
        status: req.body.status,
        contract_address: req.body.contract_address,
        type: req.body.type,
        resolver_api: req.body.resolver_api
      })
      .then(games => res.status(201).send(games))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Games
      .findAll()
      .then(games => res.status(200).send(games))
      .catch(error => res.status(400).send(error));
  },
};