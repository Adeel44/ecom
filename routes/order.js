const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../model/order');
const Product = require('../model/product');


router.post("/create", (req, res) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
       }
      const order = new Order({
       // _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        }
        
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.get("/", (req, res) => {
  Order.find()
  //.sort({quantity:"desc"})
  //.select("product quantity")
  .populate('product')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});



router.get('/:id', function(req , res ){
    Order.findById(req.params.id ) 
    .populate('product')
    .exec()
    .then(docs => {
      res.status(200).send(docs)
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
    
})



module.exports = router;
