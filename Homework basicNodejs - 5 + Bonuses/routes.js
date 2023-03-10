import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import express from "express";

const router = express.Router();

// DEFAULT ROUTE*****************************************

router.get("/", (req, res) => {
  res.send("<h1>Online Shop</h1>");
});

// ADD PRODUCT ROUTE*****************************************

router.post("/add_product", (req, res) => {
  console.log("Create product route");

  const body = req.body;
  console.log(body);

  let product = {
    id: uuidv4(),
    name: body.name,
    price: body.price,
    rating: body.rating,
    description: body.description,
    category: body.category,
    isInStock: body.isInStock,
  };

  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );
  products.push(product);

  fs.writeFileSync("./products.json", JSON.stringify(products, null, 2));

  res.status(201).send({ message: "Product was added in database." });
});

// ALL PRODUCTS ROUTE*****************************************

router.get("/products", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  res.send(JSON.stringify(products, null, 2));
});

// DELETE PRODUCT BY ID ROUTE*****************************************

router.delete("/delete_product/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);

    fs.writeFileSync("./products.json", JSON.stringify(products));

    res.status(200).send({ message: "Product was deleted from the database." });
  } else {
    res.status(404).send({ message: "Product not found." });
  }
});

// DELETE ALL PRODUCTS*****************************************

router.delete("/delete_products", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );
  const allProducts = req.params.product;

  if (allProducts !== -1) {
    products.splice(allProducts);
    fs.writeFileSync("./products.json", JSON.stringify(products));
    res.status(202).send({ message: "All products deleted." });
  } else {
    res.status(404).send({ message: "Products not found." });
  }
});

// GET PRODUCT BY ID ROUTE*****************************************

router.get("/product/:id", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  const id = req.params.id;

  const foundId = products.find((product) => product.id === id);

  if (foundId) {
    res.send(JSON.stringify(foundId));
    console.log("Product with id:", id, "was found.");
  } else {
    res.status(404).send({ message: "Product not found." });
    console.log(`Product with id: "${id}" not found.`);
  }
});

// SET ITEM OUT OF STOCK*****************************************

router.put("/out_of_stock/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index].isAvailable = false;

    fs.writeFileSync("./products.json", JSON.stringify(products));

    res.status(200).send({ message: "Product is now out of stock." });
  } else {
    res.status(404).send({ message: "Product not found." });
  }
});

// EDIT PRODUCT BY ID*****************************************

router.put("/edit_product/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(id, body);

  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...body };

    fs.writeFileSync("./products.json", JSON.stringify(products));

    res.status(200).send({ message: "Product was updated successfully." });
  } else {
    res.status(404).send({ message: "Product not found." });
  }
});

// ADD PRODUCT TO CART {BONUS}*****************************************

router.post("/add_to_cart/:id", (req, res) => {
  const id = req.params.id;

  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).send({ message: "Product does not exist" });
  }
  const cart = JSON.parse(
    fs.readFileSync("./cart.json", { encoding: "utf-8" })
  );

  cart.push(product);
  fs.writeFileSync("./cart.json", JSON.stringify(cart));

  res.status(201).send({ message: "Product was added to cart." });
});

// IF ROUTE DOESN'T EXSIST REDIRECT TO DEFAULT PAGE*****************************************

router.get("*", (req, res) => {
  res.redirect("/");
});

export default router;
