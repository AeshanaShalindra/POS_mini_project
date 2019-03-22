const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    content: { type: String, required: true },
    item: { type: Array, required: true },
    //qty: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Order', schema);