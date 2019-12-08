var express = require('express');
var router = express.Router();

var Products = require('../models/products');
var Categories = require('../models/categories');
var Wishlist = require('../models/wishlist');
var Cart = require('../models/cart');

//Products
router.post('/products', Products.create);
router.get('/products', Products.lists);
router.get('/products/:id', Products.list);
router.put('/products/:id', Products.update);
router.delete('/products/:id', Products.delete);

//Products
router.post('/categories', Categories.create);
router.get('/categories', Categories.lists);
router.get('/categories/:id', Categories.list);
router.put('/categories/:id', Categories.update);
router.delete('/categories/:id', Categories.delete);

//Wishlist
router.post('/wishlist', Wishlist.create);
router.get('/wishlist', Wishlist.lists);
router.get('/wishlist/:id', Wishlist.list);
router.put('/wishlist/:id', Wishlist.update);
router.delete('/wishlist/:id', Wishlist.delete);

//Cart
router.post('/cart', Cart.create);
router.get('/cart', Cart.lists);
router.get('/cart/:id', Cart.list);
router.put('/cart/:id', Cart.update);
router.delete('/cart/:id', Cart.delete);

module.exports = router;