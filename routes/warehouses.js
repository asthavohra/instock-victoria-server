const express = require("express");

const router = express.Router();

const { v4: uuidv4 } = require("uuid");

const filesystem = require("fs");

let warehousesFile = filesystem.readFileSync("./data/warehouses.json");

let inventoriesFile = filesystem.readFileSync("./data/inventories.json");

let warehousesData = JSON.parse(warehousesFile);

let inventoriesData = JSON.parse(inventoriesFile);

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

//delete from warehouse
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleted = warehousesData.find((warehouse) => warehouse.id === id);
  if (deleted) {
    warehousesData = warehousesData.filter((warehouse) => warehouse.id !== id);
    res.status(200).json(deleted);
  } else {
    res.status(404).json({
      message: "The warehouse you are trying to delete doesn't exist",
    });
  }

  if (warehouseID === id) {
    inventoriesData = inventoriesData.filter(
      (inventory) => inventory.warehouseID !== id
    );
    res.status(200).json({ message: "matriculation" });
  } else {
    res.status(404).json({
      message: "we're dun out ere",
    });
  }
});

//delete inventory for selected warehouse wip
// router.delete("/:warehouseID", (req, res) => {
//   const { id } = req.path;
//   const deletedinventory = inventoriesData.find(
//     (inventory) => inventory.warehouseID === id
//   );
//   if (deletedinventory) {
//     inventoriesData = inventoriesData.filter(
//       (inventory) => inventory.warehouseID !== id
//     );
//     res.status(200).json(deletedinventory);
//   } else {
//     res.status(404).json({
//       message: "The warehouse flvdfvjdfdfjvndfkjn",
//     });
//   }
// });

module.exports = router;
