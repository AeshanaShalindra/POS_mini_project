const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Order = db.Order;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Order.find().select();
}

async function getById(id) {
    return await Order.findById(id).select('-hash');
}

async function create(orderParam) {
    const order = new Order(orderParam);
    await order.save();
}

async function update(id, orderParam) {
    const order = await Order.findById(id);

    // validate
    if (!order) throw 'User not found';
    if (order.id !== orderParam.id && await Order.findOne({ id: orderParam.id })) {
        throw 'id "' + orderParam.id + '" is already taken';
    }


    // copy userParam properties to user
    Object.assign(order, orderParam);

    await order.save();
}

async function _delete(id) {
    await Order.findByIdAndRemove(id);
}