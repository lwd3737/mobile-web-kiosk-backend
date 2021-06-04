const express = require("express");
const router = express.Router();

const authController = require(__base + "/controllers/partnerApp/auth");
const roomsController = require(__base + "/controllers/partnerApp/rooms");
const seatsController = require(__base + "/controllers/partnerApp/seats");
const useticketsController = require(__base +
  "/controllers/partnerApp/usetickets");

//auth
router.post("/login", authController.login);

//rooms
router.get("/rooms", roomsController.getRoomList);
router.post("/rooms", roomsController.createRoom);
router.get("/rooms/:roomId", roomsController.getRoomForm);
router.put("/rooms/:roomId", roomsController.modifyRoom);
router.delete("/rooms/:roomId", roomsController.deleteRoom);

//seats
router.get("/rooms/:roomId/seats", seatsController.getSeats);
router.post("/rooms/:roomId/seats", seatsController.createSeats);
router.put("/rooms/:roomId/seats", seatsController.modifySeats);

//usetickets
router.get(
  "/usetickets/categories",
  useticketsController.getUseTicketCategories
);
router.post(
  "/usetickets/categories",
  useticketsController.createUseTicketCatetory
);
router.delete(
  "/usetickets/categories/categoryId",
  useticketsController.deleteUseTicketCategory
);
router.get(
  "/usetickets/definitions",
  useticketsController.getUseTicketDefinitions
);
router.post(
  "/usetickets/definitions",
  useticketsController.createUseTicketDefinition
);
router.put(
  "/usetickets/definitions/:definitionId",
  useticketsController.modifyUseTicketDefinition
);
router.delete(
  "/usetickets/definitions/:definitionId",
  useticketsController.deleteUseTicketDefinition
);

module.exports = router;
