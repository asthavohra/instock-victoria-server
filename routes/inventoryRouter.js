const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router
  .get("/", (req, res) => {
    //write your code here
    res.status(200).json("newVideo");
  })
  .get("/:id", (req, res) => {
    //write your code here
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
      res.status(201).json(newItem);
    } else {
      const template = {
        warehouseID: "req.body.warehouseID",
        warehouseName: "req.body.warehouseName",
        itemName: "req.body.itemName",
        description: "req.body.description",
        category: "req.body.category",
        status: "req.body.status",
        quantity: "req.body.quantity",
      };

      res
        .status(400)
        .json(
          "The request is missing a value, you have to provide: warehouseID, warehouseName, itemName, description, category, status and quantity"
        );
    }
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
