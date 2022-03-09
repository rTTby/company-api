const { MongoClient } = require("mongodb");
var express = require("express");
var router = express.Router();

// Connect to MongoDB
const url = "mongodb+srv://companyapp:eOW5Eda884lrfm3h@cluster0.xzkm7.mongodb.net/company?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "company";

async function connectToDb() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  return client.db(dbName);
}

/* GET products listing. */
router.get("/", function (req, res, next) {
  connectToDb().then(async (db) => {
    const products = db.collection("products");
    const productList = await products.find().toArray();
    // console.log(productList);
    res.json(productList);
  });

  // res.json([{ name: "Samsung", price: 10000 }]);
});

module.exports = router;