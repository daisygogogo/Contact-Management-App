# Contact Management Admin System

A modern, responsive contact management system built with React, TypeScript, and shadcn/ui.

## Features

- 🔐 **Authentication System** - Secure login and registration with JWT tokens
- 👥 **Contact Management** - Full CRUD operations for contacts
- 🎨 **Modern UI** - Beautiful, responsive design with shadcn/ui
- 🌓 **Dark/Light Mode** - Toggle between themes
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 📊 **Dashboard** - Overview of your contact statistics
- 📤 **CSV Export** - Export your contacts data
- 🔍 **Search & Filter** - Find contacts quickly
- 📄 **Pagination** - Handle large numbers of contacts efficiently
- ✨ **User Registration** - Complete user registration with validation

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: shadcn/ui + Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Craco (for path aliases)

## Port Configuration

The frontend runs on port **4001** by default. This is configured in the `package.json` start script.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd contact-admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:4001](http://localhost:4001) to view it in the browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── layout/         # Layout components (Sidebar, Header, Layout)
├── pages/              # Page components
│   ├── Dashboard.tsx   # Dashboard page
│   ├── Contacts.tsx    # Contacts management page
│   └── Login.tsx       # Authentication page
├── services/           # API services
│   ├── api.ts          # Base API configuration
│   ├── auth.ts         # Authentication service
│   └── contact.ts      # Contact management service
├── stores/             # State management
│   ├── auth.ts         # Authentication state
│   └── theme.ts        # Theme state
├── types/              # TypeScript type definitions
│   └── index.ts        # Main type definitions
├── lib/                # Utility functions
│   └── utils.ts        # shadcn/ui utilities
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Key Components

### Layout System
- **Sidebar**: Navigation menu with user info and theme toggle
- **Header**: Top navigation with search and user menu
- **Layout**: Main layout wrapper that combines sidebar and header

### Authentication
- JWT-based authentication
- Protected routes
- Persistent login state
- Automatic token refresh

### Contact Management
- List all contacts with pagination
- Add new contacts
- Edit existing contacts
- Delete contacts with confirmation
- Search and filter functionality
- CSV export

## Configuration

### Path Aliases
The project uses TypeScript path aliases configured with Craco:

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/lib/*` → `src/lib/*`
- `@/types/*` → `src/types/*`
- `@/services/*` → `src/services/*`
- `@/stores/*` → `src/stores/*`
- `@/pages/*` → `src/pages/*`

### API Configuration
Update the API base URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4001';
```

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:4001
```

## Backend Configuration

Make sure your backend has CORS configured to allow requests from `http://localhost:4001`.

## Customization

### Theme Colors
Modify the primary colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      }
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
