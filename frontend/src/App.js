import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001/api';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    quantity: 1,
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/items`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await fetch(`${API_URL}/items/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch(`${API_URL}/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      
      setFormData({ name: '', category: '', location: '', quantity: 1, notes: '' });
      setEditingId(null);
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      location: item.location || '',
      quantity: item.quantity || 1,
      notes: item.notes || ''
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await fetch(`${API_URL}/items/${id}`, { method: 'DELETE' });
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', category: '', location: '', quantity: 1, notes: '' });
    setEditingId(null);
  };

  const categories = ['Electronics', 'Stationery', 'Books', 'Tools', 'Accessories', 'Other'];
  
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <div className="App">
      <header className="App-header">
        <h1>📋 Desk Organizer</h1>
        <p>Keep track of everything on your desk</p>
      </header>

      <div className="container">
        <div className="form-section">
          <h2>{editingId ? 'Edit Item' : 'Add New Item'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Item Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., Laptop, Notebook, Pen"
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Top drawer, Left side"
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional information..."
                rows="3"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Item' : 'Add Item'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="items-section">
          <div className="items-header">
            <h2>Your Desk Items ({filteredItems.length})</h2>
            <div className="filter-buttons">
              <button 
                className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={filter === cat ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <p>No items found. Add your first desk item!</p>
            </div>
          ) : (
            <div className="items-grid">
              {filteredItems.map(item => (
                <div key={item.id} className="item-card">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <span className="category-badge">{item.category}</span>
                  </div>
                  <div className="item-details">
                    {item.location && (
                      <p><strong>Location:</strong> {item.location}</p>
                    )}
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    {item.notes && (
                      <p><strong>Notes:</strong> {item.notes}</p>
                    )}
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(item)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
