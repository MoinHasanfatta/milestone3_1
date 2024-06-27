const express = require("express");
const EventController = require("../controllers/eventController");
const router = express.Router();

router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getEventById);
router.post("/", EventController.addEvent);
router.post("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);

module.exports = router;
