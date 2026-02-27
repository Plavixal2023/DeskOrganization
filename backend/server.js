const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = new Database(path.join(__dirname, 'desk.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT,
    quantity INTEGER DEFAULT 1,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.get('/api/items', (req, res) => {
  try {
    const items = db.prepare('SELECT * FROM items ORDER BY created_at DESC').all();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/items/:id', (req, res) => {
  try {
    const item = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/items', (req, res) => {
  try {
    const { name, category, location, quantity, notes } = req.body;
    
    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }

    const parsedQuantity = parseInt(quantity) || 1;
    if (parsedQuantity < 1) {
      return res.status(400).json({ error: 'Quantity must be a positive number' });
    }

    const stmt = db.prepare(
      'INSERT INTO items (name, category, location, quantity, notes) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(name, category, location || '', parsedQuantity, notes || '');
    
    const newItem = db.prepare('SELECT * FROM items WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/items/:id', (req, res) => {
  try {
    const { name, category, location, quantity, notes } = req.body;
    
    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }

    const parsedQuantity = parseInt(quantity) || 1;
    if (parsedQuantity < 1) {
      return res.status(400).json({ error: 'Quantity must be a positive number' });
    }

    const stmt = db.prepare(
      'UPDATE items SET name = ?, category = ?, location = ?, quantity = ?, notes = ? WHERE id = ?'
    );
    const result = stmt.run(name, category, location || '', parsedQuantity, notes || '', req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const updatedItem = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/items/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM items WHERE id = ?');
    const result = stmt.run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  db.close();
  process.exit(0);
});
