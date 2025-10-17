import { Router } from "express";
import {
    getActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
} from "../controllers/activity.controller";

export const activitiesRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 *           enum: [CALL, EMAIL, MEETING, TASK, DEADLINE]
 *         status:
 *           type: string
 *           enum: [PENDING, COMPLETED, CANCELLED]
 *         dueDate:
 *           type: string
 *           format: date-time
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High]
 *         userId:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/activities:
 *   get:
 *     summary: Get all activities
 *     tags:
 *       - Activities
 *     responses:
 *       200:
 *         description: List of activities
 *   post:
 *     summary: Create a new activity
 *     tags:
 *       - Activities
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [CALL, EMAIL, MEETING, TASK, DEADLINE]
 *               status:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               priority:
 *                 type: string
 *               userId:
 *                 type: string
 *               contactId:
 *                 type: string
 *               companyId:
 *                 type: string
 *               dealId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Activity created
 */
activitiesRouter.get("/", getActivities);
activitiesRouter.post("/", createActivity);

/**
 * @swagger
 * /api/v1/activities/{id}:
 *   get:
 *     summary: Get an activity by ID
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activity found
 *   put:
 *     summary: Update an activity
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activity updated
 *   delete:
 *     summary: Delete an activity
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activity deleted
 */
activitiesRouter.get("/:id", getActivityById);
activitiesRouter.put("/:id", updateActivity);
activitiesRouter.delete("/:id", deleteActivity);
