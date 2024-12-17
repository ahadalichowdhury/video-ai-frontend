'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../app/api/services';
import { Item } from '../types';

export default function ItemList() {
    const [items, setItems] = useState<Item[]>([]);
    const [newItemName, setNewItemName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            setError(`Failed to fetch items: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateItem = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.createItem({ name: newItemName });
            if (response.success) {
                setItems([...items, response.data]);
                setNewItemName('');
            }
        } catch (err) {
            setError(`Failed to create item: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };

    const handleDeleteItem = async (id: number) => {
        try {
            const response = await api.deleteItem(id);
            if (response.success) {
                setItems(items.filter(item => item.id !== id));
            }
        } catch (err) {
            setError(`Failed to delete item: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Items</h2>
            
            {/* Create new item form */}
            <form onSubmit={handleCreateItem} className="mb-4">
                <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Enter item name"
                    className="border p-2 mr-2 rounded"
                />
                <button 
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Item
                </button>
            </form>

            {/* List of items */}
            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between border p-2 rounded">
                        <span>{item.name}</span>
                        <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
