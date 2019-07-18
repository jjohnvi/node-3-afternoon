const express = require("express");
const massive = require("massive");
const products_controller = require("./controllers/products_controller");
const app = express();
require("dotenv").config();

app.use(express.json());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => {
    console.log(err);
  });

app.post("/api/products", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/products/:id", products_controller.getOne);
app.put("/api/products/:id", products_controller.update);
app.delete("/api/products/:id", products_controller.delete);

app.listen(process.env.SERVER_PORT, () =>
  console.log("Listening on PORT" + process.env.SERVER_PORT)
);
