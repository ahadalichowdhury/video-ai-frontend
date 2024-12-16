import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

function ItemList() {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch items when component mounts
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await api.getItems();
            if (response.success) {
                setItems(response.data);
            }
        } catch (err) {
            setError('Failed to fetch items');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateItem = async (e) => {
        e.preventDefault();
        try {
            const response = await api.createItem({ name: newItemName });
            if (response.success) {
                setItems([...items, response.data]);
                setNewItemName('');
            }
        } catch (err) {
            setError('Failed to create item');
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            const response = await api.deleteItem(id);
            if (response.success) {
                setItems(items.filter(item => item.id !== id));
            }
        } catch (err) {
            setError('Failed to delete item');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Items</h2>
            
            {/* Create new item form */}
            <form onSubmit={handleCreateItem}>
                <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Enter item name"
                />
                <button type="submit">Add Item</button>
            </form>

            {/* List of items */}
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
