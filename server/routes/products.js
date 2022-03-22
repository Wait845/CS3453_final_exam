var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Product = require("../db/models/products");

/* GET products listing. */
router.get("/", (req, res, next) => {

  Product.find({}).sort({creationDate: -1}).exec((err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      // console.log(res);
      res.json(result);
    }
  })
});

// Create new product
router.post("/order", (req, res, next) => {
  console.debug(req.body);
  const data = req.body;

  for (let i = 0; i < data.length; i++) {
    let name = data[i].name
    let qty = data[i].qty
    console.log(name, qty)
    Product.findOne({name:name}, (err, result) => {
      if (err) {
        console.debug("Hey Look! Error", err);
      } else {
        console.log(result);
        result.sold += qty
        result.save()
      }
    });
  }
  res.json("ok")
});


router.post("/", (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const product1 = new Product({
    name: data.name,
    price: data.price,
    sold: 0,
    creationDate: new Date()
  });
  product1.save((err, newInstance) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.json(newInstance);
    }
  });

});

router.delete("/:id", (req, res, next) => {
  // const id = req.params["id"]
  const id = req.params.id
  console.debug('Product ID to delete',id);
  Product.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

// router.put("/", async (req, res, next) => {
//   console.debug(req.body)
//   const data = req.body
//   const id = data._id
//   delete data._id
//   console.debug(data)

//   Product.findByIdAndUpdate(id, data, (err, doc) => {
//     if (err) {
//       console.error("hey look, error!", err)
//       res.json(err)
//     } else {
//       res.status(200).json(doc)
//     }
//   })
  // console.debug(req.body);
  // const data = req.body;

  // Product.findOneAndUpdate({ code: data.code }, data, (err, doc) => {
  //   if (err) {
  //     console.error("Hey look, Error!", err);
  //     res.json(err);
  //   } else {
  //     res.status(200).json(doc);
  //   }
  // });
  // or findOne(), set values, then save()
  // var product1 = await Product.findOne({ code: data.code });
  // product1.code = data.newCode;
  // product1.name = data.name;
  // product1.price = data.price;
  // await product1.save();
  // res.status(200).json(product1);
// });
module.exports = router;
