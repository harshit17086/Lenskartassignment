import { Router } from "express";
import {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
} from "../controllers/note.controller";

export const notesRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         userId:
 *           type: string
 *         contactId:
 *           type: string
 *         companyId:
 *           type: string
 *         dealId:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/notes:
 *   get:
 *     summary: Get all notes
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: List of notes
 *   post:
 *     summary: Create a new note
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *               content:
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
 *         description: Note created
 */
notesRouter.get("/", getNotes);
notesRouter.post("/", createNote);

/**
 * @swagger
 * /api/v1/notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note found
 *   put:
 *     summary: Update a note
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note updated
 *   delete:
 *     summary: Delete a note
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted
 */
notesRouter.get("/:id", getNoteById);
notesRouter.put("/:id", updateNote);
notesRouter.delete("/:id", deleteNote);
