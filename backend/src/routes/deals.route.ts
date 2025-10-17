import { Router } from "express";
import {
    getDeals,
    getDealById,
    createDeal,
    updateDeal,
    deleteDeal,
} from "../controllers/deal.controller";

export const dealsRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Deal:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         value:
 *           type: number
 *         stage:
 *           type: string
 *           enum: [LEAD, QUALIFIED, PROPOSAL, NEGOTIATION, CLOSED_WON, CLOSED_LOST]
 *         probability:
 *           type: integer
 *           minimum: 0
 *           maximum: 100
 *         expectedCloseDate:
 *           type: string
 *           format: date-time
 *         actualCloseDate:
 *           type: string
 *           format: date-time
 *         userId:
 *           type: string
 *         contactId:
 *           type: string
 *         companyId:
 *           type: string
 *       example:
 *         title: Enterprise Deal
 *         description: Large enterprise contract
 *         value: 50000
 *         stage: PROPOSAL
 *         probability: 75
 *         userId: clxyz123abc
 */

/**
 * @swagger
 * /api/v1/deals:
 *   get:
 *     summary: Get all deals
 *     description: Retrieve all deals with related information
 *     tags:
 *       - Deals
 *     responses:
 *       200:
 *         description: List of deals
 *   post:
 *     summary: Create a new deal
 *     description: Create a new sales deal
 *     tags:
 *       - Deals
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - value
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               value:
 *                 type: number
 *               stage:
 *                 type: string
 *               probability:
 *                 type: integer
 *               expectedCloseDate:
 *                 type: string
 *                 format: date-time
 *               userId:
 *                 type: string
 *               contactId:
 *                 type: string
 *               companyId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Deal created successfully
 */
dealsRouter.get("/", getDeals);
dealsRouter.post("/", createDeal);

/**
 * @swagger
 * /api/v1/deals/{id}:
 *   get:
 *     summary: Get a deal by ID
 *     tags:
 *       - Deals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal found
 *   put:
 *     summary: Update a deal
 *     tags:
 *       - Deals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               value:
 *                 type: number
 *               stage:
 *                 type: string
 *               probability:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Deal updated
 *   delete:
 *     summary: Delete a deal
 *     tags:
 *       - Deals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal deleted
 */
dealsRouter.get("/:id", getDealById);
dealsRouter.put("/:id", updateDeal);
dealsRouter.delete("/:id", deleteDeal);
