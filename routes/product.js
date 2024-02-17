
const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router();  // mini application


// Read -
router.get('/products' , async (req, res)=>{
   let products = await Product.find({});
   res.render('index', {products})
});

// new form - 
router.get('/products/new', (req, res)=>{
    res.render('new',)
});

// Actually Adding 
router.post('/products', async (req,res)=>{     
    let {name, img, price, desc} = req.body;
    await Product.create({name, img, price, desc});  
    res.redirect('/products')
})

// show particular product 
router.get('/products/:id' , async(req,res) =>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id).populate('reviews');
    // let foundProduct = await Product.findById(id);
    console.log(foundProduct);
    res.render('show', {foundProduct});
})

// show edit form -
router.get('/products/:id/edit' , async(req,res) =>{
    let {id} = req.params;
    // let foundProduct = await Product.findById(id);
    let foundProduct = await Product.findById(id);
    res.render('edit' , {foundProduct})
})

// Actually Changing the Product -
router.patch('/products/:id', async(req,res)=>{
    let {id} = req.params;
    let {name, img, price, desc} = req.body;
    await Product.findByIdAndUpdate(id, {name, img, price, desc} );
    res.redirect('/products')
})

// Deleting -
router.delete('/products/:id', async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);

    // Deleting reviews before deleting product 
    for(let ids of foundProduct.reviews){
        await Review.findByIdAndDelete(ids);
    }

    res.redirect('/products')
    await Product.findByIdAndDelete(id);
})

module.exports = router;

















