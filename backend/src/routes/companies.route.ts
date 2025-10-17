import { Router } from "express";
import {
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
} from "../controllers/company.controller";

export const companiesRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         industry:
 *           type: string
 *           nullable: true
 *         website:
 *           type: string
 *           nullable: true
 *         phone:
 *           type: string
 *           nullable: true
 *         address:
 *           type: string
 *           nullable: true
 *         city:
 *           type: string
 *           nullable: true
 *         state:
 *           type: string
 *           nullable: true
 *         country:
 *           type: string
 *           nullable: true
 *         size:
 *           type: string
 *           nullable: true
 *           description: Company size (e.g., "1-10", "11-50", "51-200")
 *         revenue:
 *           type: number
 *           format: float
 *           nullable: true
 *         description:
 *           type: string
 *           nullable: true
 *         userId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: clxyz890jkl
 *         name: Acme Corporation
 *         industry: Technology
 *         website: https://acme.com
 *         phone: +1-555-1234
 *         address: 789 Business Blvd
 *         city: San Francisco
 *         state: CA
 *         country: USA
 *         size: "51-200"
 *         revenue: 5000000
 *         description: Leading technology solutions provider
 *     CompanyInput:
 *       type: object
 *       required:
 *         - name
 *         - userId
 *       properties:
 *         name:
 *           type: string
 *         industry:
 *           type: string
 *         website:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         size:
 *           type: string
 *         revenue:
 *           type: number
 *         description:
 *           type: string
 *         userId:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/companies:
 *   get:
 *     summary: Get all companies
 *     description: Retrieve a list of all companies with related data
 *     tags:
 *       - Companies
 *     responses:
 *       200:
 *         description: List of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *       500:
 *         description: Server error
 */
companiesRouter.get("/", getCompanies);

/**
 * @swagger
 * /api/v1/companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     description: Retrieve a single company with all related data
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company found
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
companiesRouter.get("/:id", getCompanyById);

/**
 * @swagger
 * /api/v1/companies:
 *   post:
 *     summary: Create a new company
 *     description: Create a new company record
 *     tags:
 *       - Companies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyInput'
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
companiesRouter.post("/", createCompany);

/**
 * @swagger
 * /api/v1/companies/{id}:
 *   put:
 *     summary: Update a company
 *     description: Update an existing company's information
 *     tags:
 *       - Companies
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
 *               name:
 *                 type: string
 *               industry:
 *                 type: string
 *               website:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               size:
 *                 type: string
 *               revenue:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
companiesRouter.put("/:id", updateCompany);

/**
 * @swagger
 * /api/v1/companies/{id}:
 *   delete:
 *     summary: Delete a company
 *     description: Delete a company by ID
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
companiesRouter.delete("/:id", deleteCompany);
