import { Router } from "express";
import { 
    getContacts, 
    getContactById,
    createContact,
    updateContact,
    deleteContact
} from "../controllers/contacts.controller";

export const contactsRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the contact
 *         firstName:
 *           type: string
 *           description: The contact's first name
 *         lastName:
 *           type: string
 *           description: The contact's last name
 *         address:
 *           type: string
 *           nullable: true
 *           description: The contact's address
 *         email:
 *           type: string
 *           description: The contact's email address
 *         phone:
 *           type: string
 *           nullable: true
 *           description: The contact's phone number
 *         userId:
 *           type: string
 *           description: The ID of the user who owns this contact
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             email:
 *               type: string
 *             name:
 *               type: string
 *           description: The user who owns this contact
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the contact was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the contact was last updated
 *       example:
 *         id: clxyz789ghi
 *         firstName: John
 *         lastName: Doe
 *         address: 123 Main Street, New York, NY 10001
 *         email: john.doe@example.com
 *         phone: +1-555-0123
 *         userId: clxyz123abc
 *         createdAt: 2025-10-17T10:18:48.000Z
 *         updatedAt: 2025-10-17T10:18:48.000Z
 *     ContactInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - userId
 *       properties:
 *         firstName:
 *           type: string
 *           description: The contact's first name
 *         lastName:
 *           type: string
 *           description: The contact's last name
 *         address:
 *           type: string
 *           description: The contact's address
 *         email:
 *           type: string
 *           description: The contact's email address
 *         phone:
 *           type: string
 *           description: The contact's phone number
 *         userId:
 *           type: string
 *           description: The ID of the user who owns this contact
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         address: 123 Main Street, New York, NY 10001
 *         email: john.doe@example.com
 *         phone: +1-555-0123
 *         userId: clxyz123abc
 *     ContactUpdate:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The contact's first name
 *         lastName:
 *           type: string
 *           description: The contact's last name
 *         address:
 *           type: string
 *           description: The contact's address
 *         email:
 *           type: string
 *           description: The contact's email address
 *         phone:
 *           type: string
 *           description: The contact's phone number
 *       example:
 *         firstName: Jane
 *         lastName: Smith
 *         address: 456 Oak Avenue, Los Angeles, CA 90001
 *         email: jane.smith@example.com
 *         phone: +1-555-9876
 */

/**
 * @swagger
 * /api/v1/contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve a list of all contacts with their associated user information
 *     tags:
 *       - Contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
contactsRouter.get("/", getContacts);

/**
 * @swagger
 * /api/v1/contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Retrieve a single contact by its ID with associated user information
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Contact found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
contactsRouter.get("/:id", getContactById);

/**
 * @swagger
 * /api/v1/contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Create a new contact associated with a user
 *     tags:
 *       - Contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
contactsRouter.post("/", createContact);

/**
 * @swagger
 * /api/v1/contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     description: Update an existing contact's information
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactUpdate'
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
contactsRouter.put("/:id", updateContact);

/**
 * @swagger
 * /api/v1/contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Delete a contact by its ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
contactsRouter.delete("/:id", deleteContact);
