//index.js is the entry point
//imported express to start the server
const express = require("express");
const warehouseRouter = require("./routes/warehouses");
const cors = require("cors");

const app = express();
const port = 8080;
//parsing request body for post request
app.use(express.json());
//created basic route
/*
app.use("/", (resquest, response) => {
  response.send("Hello Victoria Group");
});
*/
app.use(cors());
app.use("/warehouse", warehouseRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
