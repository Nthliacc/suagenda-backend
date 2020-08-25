import express from "express";
import { ClientController } from "../controller/ClientController";
import { ContactController } from "../controller/ContactController";


export const router = express.Router();

const clientController = new ClientController();
const contactController = new ContactController();

router.post("/signup", clientController.signup);
router.post("/login", clientController.login);
router.get("/all-my-contacts", clientController.allMyContacts);
router.post("/add-contact", contactController.addContact);
router.delete("/delete-contact", contactController.deleteContact);
router.put("/edit-contact", contactController.editContact);
