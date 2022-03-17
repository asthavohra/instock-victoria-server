const express = require("express");
const router = express.Router();
const fs = require("fs");
const { uuid } = require("uuidv4");
const { response } = require("express");
const inventoriesFile = fs.readFileSync("./data/inventories.json");
const inventoriesData = JSON.parse(inventoriesFile);
const { v4: uuidv4 } = require("uuid");

// GET List of all Inventory Items
router
  .get("/", (req, res) => {
    res.status(200).send(inventoriesData);
  })
  .get("/:id", (req, res) => {
    const inventoriesFile = JSON.parse(
      fs.readFileSync("./data/inventories.json")
    );
    const selectedItem = inventoriesFile.find(
      (item) => item.id == req.params.id
    );

    if (selectedItem) {
      res.status(201).json(selectedItem);
    } else {
      res.status(400).send("Item does not exist");
    }
  })

  .post("/", (req, res) => {
    if (
      !!req.body.warehouseID &&
      !!req.body.warehouseName &&
      !!req.body.itemName &&
      !!req.body.description &&
      !!req.body.category &&
      !!req.body.status &&
      (req.body.quantity === 0 || !!req.body.quantity)
    ) {
      const newItem = {
        id: uuidv4(),
        warehouseID: req.body.warehouseID,
        warehouseName: req.body.warehouseName,
        itemName: req.body.itemName,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status,
        quantity: req.body.quantity,
      };
      const inventoriesFile = JSON.parse(
        fs.readFileSync("./data/inventories.json")
      );
      inventoriesFile.push(newItem);
      fs.writeFileSync(
        "./data/inventories.json",
        JSON.stringify(inventoriesFile)
      );
      res.status(201).json(newItem);
    } else {
      res
        .status(400)
        .json(
          "The request is missing a value, you have to provide: warehouseID, warehouseName, itemName, description, category, status and quantity"
        );
    }
  })
  .patch("/:id", (req, res) => {
    const inventoriesFile = JSON.parse(
      fs.readFileSync("./data/inventories.json")
    );
    const selectedItem = inventoriesFile.find(
      (item) => item.id == req.params.id
    );

    if (selectedItem) {
      selectedItem.warehouseName =
        req.body.warehouseName || selectedItem.warehouseName;
      selectedItem.itemName = req.body.itemName || selectedItem.itemName;
      selectedItem.description =
        req.body.description || selectedItem.description;
      selectedItem.category = req.body.category || selectedItem.category;
      selectedItem.status = req.body.status || selectedItem.status;
      selectedItem.quantity = req.body.quantity || selectedItem.quantity;
      fs.writeFileSync(
        "./data/inventories.json",
        JSON.stringify(inventoriesFile)
      );
      res.status(201).json(selectedItem);
    } else {
      res.status(400).send("Item does not exist");
    }
  })

  .delete("/:id", (req, res) => {
    const inventoriesFile = JSON.parse(
      fs.readFileSync("./data/inventories.json")
    );
    const deletedItem = inventoriesFile.find(
      (item) => item.id == req.params.id
    );

    if (deletedItem) {
      res.status(201).json(deletedItem);
      //
    } else {
      console.log(deletedItem);
      res.status(400).send("Item you are looking for does not exist");
    }
  });

module.exports = router;
