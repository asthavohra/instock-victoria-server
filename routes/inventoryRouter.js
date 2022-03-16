const express = require("express");
const router = express.Router();
const fs = require("fs");
const { uuid } = require("uuidv4");
const filesystem = require("fs");
const { response } = require("express");
const inventoriesFile = filesystem.readFileSync("./data/inventories.json");
const inventoriesData = JSON.parse(inventoriesFile);

// GET List of all Inventory Items
router
  .get("/", (request, response) => {
    response.status(200).send(inventoriesData);
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
  });

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  inventory = inventoriesFile.filter(
    (inventory) => inventoriesFile.id !== inventoriesFile.id
  );

  res.send(`Inventory with the id ${id} deleted from database.`);
});

module.exports = router;
