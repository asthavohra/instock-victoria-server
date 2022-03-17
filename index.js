//index.js is the entry point
//imported express to start the server
let express = require("express");
let warehouseRouter = require("./routes/warehouses");
let inventoryRouter = require("./routes/inventoryRouter");
let cors = require("cors");

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

//created basic route

// app.use("/", (resquest, response) => {
//   response.send("Hello Victoria Group");
// });

app.use("/warehouse", warehouseRouter);
app.use("/inventory", inventoryRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
