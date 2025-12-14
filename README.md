
A full-stack Customer Relationship Management (CRM) system built with modern web technologies.

## 🚀 Features

### Core CRM Entities
- **Users** - User management and authentication
- **Contacts** - Customer contact management with company relationships
- **Companies** - Organization/company profile management
- **Products** - Product catalog management
- **Deals** - Sales pipeline and opportunity tracking with stages (Lead, Qualified, Proposal, Negotiation, Closed Won/Lost)
- **Leads** - Lead capture, scoring, and conversion to contacts
- **Activities** - Task, call, email, and meeting management
- **Notes** - Flexible note-taking linked to any entity

### Key Capabilities
- ✅ Full CRUD operations for all entities
- ✅ RESTful API architecture
- ✅ Interactive Swagger/OpenAPI documentation
- ✅ PostgreSQL database with Prisma ORM
- ✅ Type-safe with TypeScript
- ✅ Relationship management between entities
- ✅ Lead conversion workflow
- ✅ Activity tracking across entities

## 📁 Project Structure

```
MYCREET/
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes with Swagger docs
│   │   ├── db/              # Database configuration
│   │   ├── config/          # App configuration
│   │   └── index.ts         # Entry point
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # Database migrations
│   └── package.json
└── frontend/                # React + TypeScript frontend
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── layouts/
    └── package.json
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Express middleware

### Frontend
- **Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## ⚙️ Getting Started

Let's get this CRM up and running on your machine! Don't worry, it's easier than it looks 😊

### Step 1: Grab the Code

First, clone this repository to your computer:

```bash
git clone https://github.com/harshit17086/Lenskartassignment.git
cd MYCREET
```

### Step 2: Set Up the Backend

Navigate to the backend folder and install all the necessary packages:

```bash
cd backend
npm install
```

Now, let's configure your environment. Create a `.env` file in the backend folder:

```bash
touch .env
```

Open the `.env` file and add these settings (make sure to update with your actual PostgreSQL credentials):

```env
# Database connection - Update with your PostgreSQL details
DATABASE_URL="postgresql://yourusername:yourpassword@localhost:5432/mycreet?schema=public"

# Server configuration
PORT=3000

# Frontend URLs (for CORS)
FRONTEND_URI_1=http://localhost:5173
FRONTEND_URI_2=http://localhost:8081

# API Documentation
API_TITLE=MYCREET CRM API
API_VERSION=1.0.0
API_DESCRIPTION=Customer Relationship Management System API
```

**Quick tip:** If you haven't set up PostgreSQL yet, you'll need to:
1. Install PostgreSQL on your machine
2. Create a database named `mycreet`
3. Update the DATABASE_URL with your username and password

### Step 3: Set Up the Database

Now comes the magic part! We'll use Prisma to create all the database tables:

```bash
npx prisma migrate dev
```

This will create all the tables (Users, Contacts, Companies, Deals, etc.) in your database. Pretty cool, right?

**Bonus:** Want to see your database in a nice visual interface? Run this:

```bash
npx prisma studio
```

This opens a browser-based database viewer where you can see and edit your data!

### Step 4: Start the Backend Server

Time to bring the backend to life! First, compile the TypeScript code:

```bash
npx tsc -b
```

Then start the server:

```bash
node dist/index.js
```

You should see:
```
Server running on port 3000
Swagger documentation available at http://localhost:3000/api-docs
```

🎉 Your backend is now running! Open http://localhost:3000/api-docs in your browser to see all the API endpoints.

### Step 5: Set Up the Frontend (Optional)

If you want to run the frontend as well, open a new terminal and:

```bash
cd frontend
npm install
npm run dev
```

Your React app will be available at http://localhost:5173

---

**That's it!** You're all set. The backend API is running and ready to handle your CRM data. Head over to the Swagger docs to start testing the endpoints!

## 📚 API Documentation

Once the backend is running, access the interactive Swagger documentation at:

**http://localhost:3000/api-docs**

## 🔌 API Endpoints

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Contacts
- `GET /api/v1/contacts` - Get all contacts
- `GET /api/v1/contacts/:id` - Get contact by ID
- `POST /api/v1/contacts` - Create contact
- `PUT /api/v1/contacts/:id` - Update contact
- `DELETE /api/v1/contacts/:id` - Delete contact

### Companies
- `GET /api/v1/companies` - Get all companies
- `GET /api/v1/companies/:id` - Get company by ID
- `POST /api/v1/companies` - Create company
- `PUT /api/v1/companies/:id` - Update company
- `DELETE /api/v1/companies/:id` - Delete company

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products` - Create product
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

### Deals
- `GET /api/v1/deals` - Get all deals
- `GET /api/v1/deals/:id` - Get deal by ID
- `POST /api/v1/deals` - Create deal
- `PUT /api/v1/deals/:id` - Update deal (including stage changes)
- `DELETE /api/v1/deals/:id` - Delete deal

### Leads
- `GET /api/v1/leads` - Get all leads
- `GET /api/v1/leads/:id` - Get lead by ID
- `POST /api/v1/leads` - Create lead
- `PUT /api/v1/leads/:id` - Update lead
- `DELETE /api/v1/leads/:id` - Delete lead
- `POST /api/v1/leads/:id/convert` - Convert lead to contact

### Activities
- `GET /api/v1/activities` - Get all activities
- `GET /api/v1/activities/:id` - Get activity by ID
- `POST /api/v1/activities` - Create activity
- `PUT /api/v1/activities/:id` - Update activity
- `DELETE /api/v1/activities/:id` - Delete activity

### Notes
- `GET /api/v1/notes` - Get all notes
- `GET /api/v1/notes/:id` - Get note by ID
- `POST /api/v1/notes` - Create note
- `PUT /api/v1/notes/:id` - Update note
- `DELETE /api/v1/notes/:id` - Delete note

## 💾 Database Schema

The system uses PostgreSQL with the following main entities:

- **User**: System users
- **Contact**: Customer contacts
- **Company**: Organizations/businesses
- **Product**: Product catalog
- **Deal**: Sales opportunities with pipeline stages
- **Lead**: Potential customers before conversion
- **Activity**: Tasks, calls, meetings, emails
- **Note**: Notes attached to various entities

### Key Relationships
- Users can have many contacts, companies, deals, leads, activities, and notes
- Contacts can belong to a company
- Deals can be linked to contacts and companies
- Activities and notes can be linked to contacts, companies, or deals

## 🔧 Development

### Running Migrations

```bash
cd backend

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

### Database Management

```bash
# Open Prisma Studio (Visual database editor)
npx prisma studio

# Generate Prisma Client after schema changes
npx prisma generate
```

### Building for Production

```bash
# Backend
cd backend
npx tsc -b
node dist/index.js

# Frontend
cd frontend
npm run build
```

## 📝 Example API Usage

### Create a Lead
```bash
curl -X POST http://localhost:3000/api/v1/leads \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0123",
    "company": "Acme Corp",
    "source": "Website",
    "status": "New",
    "userId": "user_id_here"
  }'
```

### Convert Lead to Contact
```bash
curl -X POST http://localhost:3000/api/v1/leads/{leadId}/convert \
  -H "Content-Type: application/json" \
  -d '{
    "companyId": "company_id_here"
  }'
```

### Create a Deal
```bash
curl -X POST http://localhost:3000/api/v1/deals \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Enterprise Deal",
    "value": 50000,
    "stage": "PROPOSAL",
    "probability": 75,
    "userId": "user_id_here",
    "contactId": "contact_id_here",
    "companyId": "company_id_here"
  }'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Harshit**

## 🙏 Acknowledgments

- Built with Express.js and Prisma
- Swagger UI for API documentation
- PostgreSQL for reliable data storage

---
