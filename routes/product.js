const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../model/product');


router.post('/create', function(req , res ){
    let product = new Product(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        }
    );
    product.save(function (err) {
        if (err) {
            res.status(400).send("Error in ctrateing")
        }
        res.send('Product Created successfully')
    })
})

router.get('/:id', function(req , res ){
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            res.status(400).send("Error in getting product")
        }
        res.send(product);
    })
    
})


router.get('/', async(req,res) => {
    try{
           const products = await Product.find()
           res.json(products)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/:id/update', function(req , res ){
    Product.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, product) {
            if (err) {
                res.status(400).send("Error in updating product")
            }
            res.send('Product is updated.');
        });
})

router.delete('/:id/delete', function(req , res ){
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.status(400).send("Error in deleting")
        }
        res.send('Deleted product'+req.params.id+'succesfully')
    })
})




module.exports = router;