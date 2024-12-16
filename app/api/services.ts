const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
    // Get all items
    async getItems() {
        try {
            const response = await fetch(`${API_BASE_URL}/items`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },

    // Create a new item
    async createItem(item: any) {
        try {
            const response = await fetch(`${API_BASE_URL}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    },

    // Update an item
    async updateItem(id: number, item: any) {
        try {
            const response = await fetch(`${API_BASE_URL}/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    },

    // Delete an item
    async deleteItem(id: number) {
        try {
            const response = await fetch(`${API_BASE_URL}/items/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    },
};
