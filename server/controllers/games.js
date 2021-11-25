const Games = require('../models').Games;

module.exports = {
  create(req, res) {
    return Games
      .create({
        title: req.body.title,
      })
      .then(Games => res.status(201).send(Games))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Games
      .findAll()
      .then(Games => res.status(200).send(Games))
      .catch(error => res.status(400).send(error));
  },
};