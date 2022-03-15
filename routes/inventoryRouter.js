const express = require("express");
const router = express.Router();
const fs = require("fs");
const { uuid } = require("uuidv4");

router
  .get("/", (req, res) => {
    //write your code here
  })
  .get("/:id", (req, res) => {
    //write your code here
  })
  .post("/", (req, res) => {
    console.log(req.body);
    const newItem = {
      id: uuid(),
      warehouseID: req.body.warehouseID,
      warehouseName: req.body.warehouseName,
      itemName: req.body.itemName,
      description: req.body.description,
      category: "Accessories",
      status: "Out of Stock",
      quantity: "",
    };
    const fileContent = readFile("./data/video-details.json");
    fileContent.push(newVideo);
    fs.writeFileSync("./data/video-details.json", JSON.stringify(fileContent));
    res.status(201).json(newVideo);
  })
  .put("/:id", (req, res) => {
    //write your code here
  })
  .patch("/:id", (req, res) => {
    //write your code here
  })
  .delete("/:id", (req, res) => {
    //write your code here
  });

module.exports = router;
