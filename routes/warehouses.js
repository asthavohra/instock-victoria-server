const express = require("express");

const router = express.Router();

const { v4: uuidv4 } = require("uuid");

const filesystem = require("fs");

const warehousesFile = filesystem.readFileSync("./data/warehouses.json");

const inventoriesFile = filesystem.readFileSync("./data/inventories.json");

const warehousesData = JSON.parse(warehousesFile);

const inventoriesData = JSON.parse(inventoriesFile);

/* flat data for warehouse list
router.get("/", (request, response) => {
  const mappedWarehouseData = warehousesData.map((warehouse) => {
    const warehouseDetails = {
      id: warehouse.id,
      warehouse: warehouse.name,
      address:
        warehouse.address + ", " + warehouse.city + ", " + warehouse.country,
      contact: warehouse.contact.name,
      contactInfo: warehouse.contact.phone + " " + warehouse.contact.email,
    };
    return warehouseDetails;
  });
  response.status(200).send(mappedWarehouseData);
});

//flat data for one warehouse and its inventory
router.get("/:id", (request, response) => {
  const warehouseId = request.params.id;
  const warehouseData = warehousesData.find(
    (warehouse) => warehouse.id == warehouseId
  );
  const inventoryData = inventoriesData
    .filter((inventory) => {
      return inventory.warehouseID === warehouseData.id;
    })
    .map((inventory) => {
      return {
        id: inventory.id,
        itemName: inventory.itemName,
        category: inventory.category,
        status: inventory.status,
        quantity: inventory.quantity,
      };
    });

  const mappedData = {
    id: warehouseData.id,
    warehouse: warehouseData.name,
    address:
      warehouseData.address +
      ", " +
      warehouseData.city +
      ", " +
      warehouseData.country,
    contact: warehouseData.contact.name,
    position: warehouseData.contact.position,
    contactInfo:
      warehouseData.contact.phone + " " + warehouseData.contact.email,
    inventoryData: inventoryData,
  };
  response.status(200).send(mappedData);
});
*/

//entire warehouse list
router.get("/", (request, response) => {
  response.status(200).send(warehousesData);
});

module.exports = router;
