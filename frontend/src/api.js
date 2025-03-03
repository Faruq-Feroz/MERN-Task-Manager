import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const TaskAPI = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await api.get("/tasks");
      console.log("Response Data:", response.data); // Debugging log
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error); // Debugging log
      throw error;
    }
  },
  
// Get a single task by ID
  getTask: async (id) => {
    try {
      if (!id) throw new Error("Task ID is required"); // Prevent empty ID issues
      const response = await api.get(`/tasks/${id}`);
      console.log(`Fetched Task ${id}:`, response.data); // Debugging log
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error); // Debugging log
      throw error;
    }
  },
  

  // Create a new task
  createTask: async (taskData) => {
    try {
      if (!taskData || Object.keys(taskData).length === 0) {
        throw new Error("Task data is required"); // Prevent empty data issues
      }
      const response = await api.post('/tasks', taskData);
      console.log("Created Task:", response.data); // Debugging log
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error); // Debugging log
      throw error;
    }
  },
  

  // Update a task
  updateTask: async (id, taskData) => {
    try {
      if (!id) {
        throw new Error("Task ID is required"); // Ensure ID is provided
      }
      if (!taskData || Object.keys(taskData).length === 0) {
        throw new Error("Task data is required"); // Prevent empty updates
      }
      
      const response = await api.put(`/tasks/${id}`, taskData);
      console.log("Updated Task:", response.data); // Debugging log
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error); // Debugging log
      throw error;
    }
  },
  

  // Delete a task
    // Delete a task
    deleteTask: async (id) => {
        try {
          if (!id) {
            throw new Error("Task ID is required"); // Ensure ID is provided
          }
          
          const response = await api.delete(`/tasks/${id}`);
          console.log("Deleted Task ID:", id); // Debugging log
          return response.data;
        } catch (error) {
          console.error("Error deleting task:", error); // Debugging log
          throw error;
        }
      },
    }; 
    
    export default api;
    