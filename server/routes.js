'use strict';

const { Router } = require("express");
const { getUser, getUsers, editUser } = require("./controllers/user.js");
const { getContacts, postContact, deleteContact, getPairs, getRelationship } = require("./controllers/relationship.js");
const { getNotificationsMessages, postNotificationMessage, deleteNotificationMessage } = require("./controllers/mess_notif.js");
const { postTimetable, getTimetable } = require("./controllers/timetable.js");
const { getMentors , putMentor, postMentor } = require("./controllers/mentor.js");

const router = Router();

router.get("/users/:id", getUser);
router.get("/users", getUsers);
router.put("/users/:id", editUser);

router.get("/relationships/:id", getContacts);
router.get("/relationships/pairs/:id", getPairs);
router.get("/relationships/:srcId/:targetId", getRelationship);
router.post("/relationships/:id", postContact);
router.delete("/relationships/:id", deleteContact);

router.get("/messages/:id", getNotificationsMessages);
router.post("/messages/:id", postNotificationMessage);
router.delete("/messages/:id", deleteNotificationMessage);

router.get("/timetable/:id", getTimetable);
router.post("/timetable/:id", postTimetable);

router.get("/mentors", getMentors);
router.post('/mentors/:id', postMentor);
router.put("/mentors/:id", putMentor);

module.exports = { router };
