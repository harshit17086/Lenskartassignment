import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swagger";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routes/user.routes";
import { productsRouter } from "./routes/products.route";
import { contactsRouter } from "./routes/contacts.route";
import { companiesRouter } from "./routes/companies.route";
import { dealsRouter } from "./routes/deals.route";
import { leadsRouter } from "./routes/leads.route";
import { activitiesRouter } from "./routes/activities.route";
import { notesRouter } from "./routes/notes.route";


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// CORS configuration
app.use(
  cors({
    origin: [
      "*",
      process.env.FRONTEND_URI_1 || "http://localhost:5173",
      process.env.FRONTEND_URI_2 || "http://localhost:8081",

    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



/**
 * @swagger
 * /api/v1/hello:
 *   get:
 *     summary: Returns a hello message
 *     description: A simple endpoint that returns a greeting
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: A successful response with a greeting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, World!
 */
app.get("/api/v1/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});


// ==================== Routes ====================
/**
 * @swagger
 * tags:
 *   - name: General
 *     description: General API endpoints
 *   - name: Users
 *     description: User management endpoints (CRUD operations)
 *   - name: Products
 *     description: Product management endpoints (CRUD operations)
 *   - name: Contacts
 *     description: Contact management endpoints (CRUD operations)
 *   - name: Companies
 *     description: Company/Organization management endpoints (CRUD operations)
 *   - name: Deals
 *     description: Sales deal/opportunity management endpoints (CRUD operations)
 *   - name: Leads
 *     description: Lead management and conversion endpoints (CRUD operations)
 *   - name: Activities
 *     description: Activity/Task management endpoints (CRUD operations)
 *   - name: Notes
 *     description: Note management endpoints (CRUD operations)
 */

// User Routes - Full CRUD operations with database
app.use('/api/v1/users', userRouter);

// Product Routes - Full CRUD operations with database
app.use('/api/v1/products', productsRouter);

// Contact Routes - Full CRUD operations with database
app.use('/api/v1/contacts', contactsRouter);

// Company Routes - Full CRUD operations with database
app.use('/api/v1/companies', companiesRouter);

// Deal Routes - Full CRUD operations with database
app.use('/api/v1/deals', dealsRouter);

// Lead Routes - Full CRUD operations with database
app.use('/api/v1/leads', leadsRouter);

// Activity Routes - Full CRUD operations with database
app.use('/api/v1/activities', activitiesRouter);

// Note Routes - Full CRUD operations with database
app.use('/api/v1/notes', notesRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Swagger documentation available at http://localhost:${PORT}/api-docs`
  );
});