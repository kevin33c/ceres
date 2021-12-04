const contracts = require('../models').contracts;
//contracts.sync({ force: true });

module.exports = {
    create(req, res) {
        return contracts
            .create({
                type: req.body.type,
                name: req.body.name,
                abi: req.body.abi,
                bytecode: req.body.bytecode,
            })
            .then(contracts => res.status(201).send(contracts))
            .catch(error => res.status(400).send(error));
    },
    get(req, res) {
        return contracts
        .findOne({
            where: { type: 'main' },
            order: [ [ 'createdAt', 'DESC' ]],
        })
        .then(contracts => res.status(201).send(contracts))
        .catch(error => res.status(400).send(error));
    },
};