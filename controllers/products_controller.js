const Product = require("../models/product");

// function to show all the products
module.exports.products = async function (req, res) {
  Product.find({}, function (err, foundProducts) {
    if (err) {
      res.send(err);
    } else {
      res.send(foundProducts);
    }
  });
};

// function to create a new product
module.exports.create = function (req, res) {
  const newProduct = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
  });
  newProduct.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      console.log(newProduct);
      // console.log(req.body.name, req.body.quantity);
      res.send({
        message: "New product added successfully.",
        data: newProduct,
      });
    }
  });
};

// function to delete a product using it's ID
module.exports.delete = function (req, res) {
  Product.deleteOne({ _id: req.params.productID }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        message: "Product deleted",
      });
    }
  });
};

// function to update a product's quantity
module.exports.updateQunatity = function (req, res) {
  const ID = req.params.productID;
  // find the product using id
  Product.findById(ID, function (err, found) {
    if (err) {
      res.send(err);
    } else {
      // Note - To increment the quantity of the product put number as a positive value in the query
      //        and to decrement the quantity put the number as negative value in the query
      console.log("req.query.number", req.query.number);
      console.log("type of", typeof req.query.number);
      console.log("found", found.quantity);
      console.log("type of", typeof found.quantity);
      const newQty = parseInt(found.quantity) + parseInt(req.query.number);
      // update the product's quantity
      Product.findByIdAndUpdate(
        ID,
        { quantity: newQty },
        function (err, updatedProduct) {
          if (err) {
            console.log("quantity", newQty);
            console.log("err in updating product");
            res.send(err);
          } else {
            updatedProduct.quantity = newQty;
            res.send({
              product: updatedProduct,
              message: "updated successfully",
            });
          }
        }
      );
    }
  });
};
