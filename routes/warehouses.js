let express = require("express");

let router = express.Router();

let { v4: uuidv4 } = require("uuid");

let filesystem = require("fs");

let { body, validationResult, check } = require("express-validator");

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

//get one warehouse by id
router.get("/:id", (req, res) => {
  let { id } = req.params;
  let warehouseInfo = warehousesData.find((warehouse) => warehouse.id === id);
  if (!warehouseInfo) {
    res.status(400).send(`There is no warehouse with id of ${id}`);
  }
  res.status(200).send(warehouseInfo);
});

//get inventory for one warehouse
router.get("/:id/inventory", (req, res) => {
  let { id } = req.params;
  let data = inventoriesData.filter(
    (inventory) => inventory.warehouseID === id
  );
  if (!data) {
    res.status(400).send(`There is no inventory under the ${id}`);
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

//put request to warehouse
router.put("/:id"),
  (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const index = warehousesData.findIndex((warehouse) => warehouse.id === id);
    if (index !== -1) {
      warehousesData[index] = changes;
      res.status(200).json(warehousesData[index]);
    } else {
      res.status(404).json({
        message: "Cannot change warehouse",
      });
    }
  };

//delete from warehouse
router.delete("/:id", (req, res) => {
  let deleted = warehousesData.find(
    (warehouse) => warehouse.id == req.params.id
  );
  const index = warehousesData.indexOf(deleted);
  console.log(index);
  warehousesData.splice(index, 1);
  filesystem.writeFileSync(
    "./data/warehouses.json",
    JSON.stringify(warehousesData)
  );
  if (deleted) {
    res.status(200).json(deleted);
  } else {
    res.status(404).json({
      message: "The warehouse you are trying to delete doesn't exist",
    });
  }
});

// if ((res.status(200).json(deleted))=true) {
//delete from inventory
// router.delete("/:id/inventory", (req, res) => {
//   let { id } = req.params;
//   let deletedinventory = inventoriesData.find(
//     (inventory) => inventory.warehouseID === id
//   );
//   if (deletedinventory) {
//     inventoriesData = inventoriesData.filter(
//       (inventory) => inventory.id !== id
//     );
//     res.status(200).send(deletedinventory);
//   }
//   res.status(404).json({
//     message: "The warehouse inventory you are trying to delete doesn't exist",
//   });
// });
// } else {
//   console.log("Individual inventory items cannot be deleted from warehouse");
// }

router.delete("/:id/inventory", (req, res) => {
  let deletedinventory = inventoriesData.filter(
    (inventory) => inventory.warehouseID == req.params.id
  );
  deletedinventory.map((inventoryObj) => {
    const deleteObj = inventoriesData.indexOf(inventoryObj);
    inventoriesData.splice(deleteObj, 1);

    filesystem.writeFileSync(
      "./data/inventories.json",
      JSON.stringify(inventoriesData)
    );
  });
  if (deletedinventory.length !== 0) {
    res.status(200).json(deletedinventory);
  } else {
    res.status(404).json({
      message: "The warehouse inventory you are trying to delete doesn't exist",
    });
  }
});

// warehousesData.splice(index, 1);
// filesystem.writeFileSync(
//   "./data/warehouses.json",
//   JSON.stringify(warehousesData)
// );
// if (deleted) {
//   res.status(200).json(deletedinventory);
// } else {
//   res.status(404).json({
//     message: "The warehouse inventory you are trying to delete doesn't exist",
//   });
// }
// });

module.exports = router;
