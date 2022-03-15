//index.js is the entry point
//imported express to start the server
const express = require("express");
const warehouseRouter = require("./routes/warehouses");
const inventoryRouter = require("./routes/inventoryRouter");
const cors = require("cors");

const app = express();
const port = 8080;

//created basic route
/*
app.use("/", (resquest, response) => {
  response.send("Hello Victoria Group");
});
*/
app.use(cors());
app.use("/warehouse", warehouseRouter);
app.use("/inventory", inventoryRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
