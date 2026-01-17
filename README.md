# DeskOrganization
A full-stack web application to organize and track items on your desk.

## Features

- ✅ Add, edit, and delete desk items
- 📦 Categorize items (Electronics, Stationery, Books, Tools, Accessories, Other)
- 📍 Track item location and quantity
- 📝 Add notes for each item
- 🔍 Filter items by category
- 💾 Persistent storage with SQLite database

## Tech Stack

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)
- CORS enabled

### Frontend
- React 18
- Modern CSS with responsive design
- Fetch API for backend communication

## Project Structure

```
DeskOrganization/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── package.json       # Backend dependencies
│   └── desk.db           # SQLite database (auto-created)
├── frontend/
│   ├── public/
│   │   └── index.html    # HTML template
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styling
│   │   ├── index.js      # React entry point
│   │   └── index.css     # Global styles
│   └── package.json      # Frontend dependencies
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Plavixal2023/DeskOrganization.git
cd DeskOrganization
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:3001`

### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## API Endpoints

### Items

- `GET /api/items` - Get all desk items
- `GET /api/items/:id` - Get a specific item
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an existing item
- `DELETE /api/items/:id` - Delete an item
- `GET /api/health` - Health check endpoint

### Request/Response Examples

**Create Item (POST /api/items):**
```json
{
  "name": "Laptop",
  "category": "Electronics",
  "location": "Center of desk",
  "quantity": 1,
  "notes": "MacBook Pro 2023"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Laptop",
  "category": "Electronics",
  "location": "Center of desk",
  "quantity": 1,
  "notes": "MacBook Pro 2023",
  "created_at": "2026-01-17 15:20:39"
}
```

## Usage

1. **Add an Item**: Fill out the form on the left side with item details and click "Add Item"
2. **Filter Items**: Use the category buttons to filter items by category
3. **Edit an Item**: Click the "Edit" button on any item card, modify the details, and click "Update Item"
4. **Delete an Item**: Click the "Delete" button on any item card and confirm the deletion

## License

MIT
