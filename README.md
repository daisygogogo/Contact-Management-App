# Contact-Management-App

A full-stack Contact Management App with complete CRUD functionality, user authentication, and role-based access control.

## 🏗️ Project Structure

This repository contains two main projects:

- **Backend** - NestJS API server with Prisma ORM and PostgreSQL
- **Frontend** - React application with TypeScript and Tailwind CSS

## View through this link and try the following accounts:
[Contact Management App](https://contact-management-app-158.vercel.app/)

| User Type     | Email              | Password | Role  | Permissions                        |
| ------------- | ----------------- | -------- | ----- | ---------------------------------- |
| Regular User  | test@example.com  | 123456   | USER  | Can only access their own contacts |
| Admin User    | admin@example.com | 123456   | ADMIN | Can access all users' contacts     |


## 🚀 Quick Start

### Backend
Navigate to the backend directory and follow the setup instructions:
See [Backend README](./backend/README.md) for detailed setup instructions.

### Frontend
Navigate to the frontend directory and install dependencies:
See [Frontend README](./frontend/README.md) for detailed setup instructions.

### Page Display

#### Authentication Pages
![Login Page](./docs/images/login.png)
*User login interface*

![Signup Page](./docs/images/singup.png)
*User registration interface*

#### Contact Management
![Add Contact](./docs/images/add-contact.png)
*Add new contact form*

![Manage Contacts](./docs/images/manage-contacts.png)
*Contact list and management interface*

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **API Documentation**: Swagger

### Frontend
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Custom components with shadcn/ui

## 📁 Repository Structure

```
Contact-Management-App/
├── backend/          # NestJS API server
├── frontend/         # React application
└── README.md         # This file
```

## 🔧 Development

Both projects can be developed independently. Each has its own package.json and dependencies.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
