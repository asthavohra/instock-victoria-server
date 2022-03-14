//index.js is the entry point
//imported express to start the server
const express = require("express");

const app = express();
const port = 8080;

//created basic route
app.use("/", (resquest, response) => {
  response.send("Hello Victoria Group");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
