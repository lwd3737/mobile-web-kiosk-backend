const express = require("express");
const router = express.Router();

const authController = require(__base + "/controllers/partnerApp/auth");
const roomsController = require(__base + "/controllers/partnerApp/rooms");
const seatsController = require(__base + "/controllers/partnerApp/seats");
const useticketsController = require(__base +
  "/controllers/partnerApp/usetickets");

router.post("/login", authController.login);

router.get("/rooms", roomsController.getRoomList);
router.post("/rooms", roomsController.createRoom);
router.get("/rooms/:roomId", roomsController.getRoomForm);
router.put("/rooms/:roomId", roomsController.modifyRoom);
router.delete("/rooms/:roomId", roomsController.deleteRoom);

router.get("/rooms/:roomId/seats", seatsController.getSeats);
router.post("/rooms/:roomId/seats", seatsController.createSeats);
router.put("/rooms/:roomId/seats", seatsController.modifySeats);

//router.get("/usetickets/category", useticketsController.getUseTicketCategory);
router.post(
  "/usetickets/category",
  useticketsController.createUseTicketCatetory
);
//router.delete(
//  "/usetickets/category",
//  useticketsController.deleteUseTicketCategory
//);
router.get(
  "/usetickets/definition",
  useticketsController.getUseTicketDefinitions
);
router.post(
  "/usetickets/definition",
  useticketsController.createUseTicketDefinition
);
router.put(
  "/usetickets/definition/:useticketId",
  useticketsController.modifyUseTicketDefinition
);
router.delete(
  "/usetickets/definition/:useticketId",
  useticketsController.deleteUseTicketDefinition
);

module.exports = router;
