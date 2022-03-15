const express = require("express");

const router = express.Router();

const { v4: uuidv4 } = require("uuid");

const filesystem = require("fs");

const { body, validationResult, check } = require("express-validator");

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

//get one warehouse by id
router.get("/warehouses/:warehouseId", (req, res) => {
  let { warehouseId } = req.params;
  const warehouseInfo = warehousesData.find(
    (warehouse) => warehouse.id === warehouseId
  );
  if (!warehouseInfo) {
    res.status(400).send(`There is no warehouse with id of ${warehouseId}`);
  }
  res.status(200).send(warehouseInfo);
});

//get inventory for one warehouse
router.get("/warehouses/:warehouseId/inventory", (req, res) => {
  let { warehouseId } = req.params;
  const data = inventoriesData.filter(
    (inventory) => inventory.warehouseID === warehouseId
  );
  if (!data) {
    res.status(400).send(`There is no inventory under the ${warehouseId}`);
  }
  res.status(200).send(data);
});

router.post(
  "/",
  [
    check("name").isString(),
    check("city").isString(),
    check("country").isString(),
    check("contact.name").isString(),
    check("contact.position").isString(),
    check("contact.phone").isMobilePhone(),
    check("contact.email").isEmail(),
  ],
  (request, response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const newWareHouseInfo = {
      id: uuidv4(),
      name: request.body.name,
      city: request.body.city,
      country: request.body.country,
      contact: {
        name: request.body.contact.name,
        position: request.body.contact.position,
        phone: request.body.contact.phone,
        email: request.body.contact.email,
      },
    };
    warehousesData.push(newWareHouseInfo);
    filesystem.writeFile(
      "./data/warehouses.json",
      JSON.stringify(warehousesData),
      (error) => {
        if (error) {
          response
            .status(500)
            .send({ error: "Unable to post new warehouse data" });
        }
        response.status(200).send(newWareHouseInfo);
      }
    );
  }
);
module.exports = router;
