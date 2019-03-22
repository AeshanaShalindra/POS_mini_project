const express = require('express');
const router = express.Router();
const orderService = require('./order.service');

// routes
router.post('/enter', enter);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


function enter(req, res, next) {
    orderService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    orderService.getAll()
        .then(orders => res.json(orders))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    orderService.getById(req.order.sub)
        .then(order => order ? res.json(order) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    orderService.getById(req.params.id)
        .then(order => order ? res.json(order) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    orderService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    orderService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}