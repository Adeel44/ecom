const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrderSchema = new Schema({
  //  _id: mongoose.Schema.Types.ObjectId,
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity: {type: Number,
    },
    
});

module.exports = mongoose.model('Order', OrderSchema);