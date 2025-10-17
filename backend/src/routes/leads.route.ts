import { Router } from "express";
import {
    getLeads,
    getLeadById,
    createLead,
    updateLead,
    deleteLead,
    convertLead,
} from "../controllers/lead.controller";

export const leadsRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Lead:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         company:
 *           type: string
 *         jobTitle:
 *           type: string
 *         source:
 *           type: string
 *         status:
 *           type: string
 *           enum: [New, Contacted, Qualified, Converted, Lost]
 *         score:
 *           type: integer
 *         userId:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/leads:
 *   get:
 *     summary: Get all leads
 *     tags:
 *       - Leads
 *     responses:
 *       200:
 *         description: List of leads
 *   post:
 *     summary: Create a new lead
 *     tags:
 *       - Leads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - userId
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *               jobTitle:
 *                 type: string
 *               source:
 *                 type: string
 *               status:
 *                 type: string
 *               score:
 *                 type: integer
 *               notes:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lead created
 */
leadsRouter.get("/", getLeads);
leadsRouter.post("/", createLead);

/**
 * @swagger
 * /api/v1/leads/{id}:
 *   get:
 *     summary: Get a lead by ID
 *     tags:
 *       - Leads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead found
 *   put:
 *     summary: Update a lead
 *     tags:
 *       - Leads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead updated
 *   delete:
 *     summary: Delete a lead
 *     tags:
 *       - Leads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead deleted
 */
leadsRouter.get("/:id", getLeadById);
leadsRouter.put("/:id", updateLead);
leadsRouter.delete("/:id", deleteLead);

/**
 * @swagger
 * /api/v1/leads/{id}/convert:
 *   post:
 *     summary: Convert lead to contact
 *     description: Convert a lead to a contact in the CRM
 *     tags:
 *       - Leads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lead converted successfully
 */
leadsRouter.post("/:id/convert", convertLead);
