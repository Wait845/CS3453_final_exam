// File: ./models/products.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  price: Number,
  sold: Number,
  creationDate: Date
});

//Export function to create "ProductSchema" model class
module.exports = mongoose.model('Product', ProductSchema );