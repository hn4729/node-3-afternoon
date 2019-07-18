const express = require("express");
const massive = require("massive");
require("dotenv").config();
const pc = require("./products_controller");

const app = express();

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Database Connected");
  })
  .catch(e => console.log(e));

app.use(express.json());

app.get("/api/products", pc.getAll);
app.get("/api/products/:id", pc.getOne);
app.put("/api/products/:id", pc.update);
app.post("/api/products", pc.create);
app.delete("/api/products/:id", pc.delete);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Listening on PORT " + process.env.SERVER_PORT);
});
