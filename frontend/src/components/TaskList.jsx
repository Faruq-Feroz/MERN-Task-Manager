import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Edit, Trash2, CheckCircle, Clock, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { TaskAPI } from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await TaskAPI.getAllTasks();
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks');
        toast.error('Failed to load tasks');
        setLoading(false);
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await TaskAPI.deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
        toast.success('Task deleted successfully');
      } catch (err) {
        toast.error('Failed to delete task');
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const task = tasks.find(task => task._id === id);
      const updatedTask = { ...task, status: newStatus };
      
      await TaskAPI.updateTask(id, updatedTask);
      
      setTasks(tasks.map(task => 
        task._id === id ? { ...task, status: newStatus } : task
      ));
      
      toast.success(`Task marked as ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update task status');
      console.error(err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-task-completed" />;
      case 'in progress':
        return <Clock className="text-task-progress" />;
      default:
        return <Clock className="text-task-pending" />;
    }
  };

  const getTaskClass = (status) => {
    switch (status) {
      case 'completed':
        return 'task-completed';
      case 'in progress':
        return 'task-progress';
      default:
        return 'task-pending';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin mr-2" />
        <span>Loading tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <Link to="/add-task" className="btn btn-primary">Add New Task</Link>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-600 mb-2">No tasks yet</h3>
          <p className="text-gray-500 mb-4">Create your first task to get started</p>
          <Link to="/add-task" className="btn btn-primary">Create Task</Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div key={task._id} className={`task-card ${getTaskClass(task.status)}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <div className="flex space-x-1">
                  {getStatusIcon(task.status)}
                </div>
              </div>
              
              <p className="text-gray-600 mb-3 line-clamp-2">{task.description}</p>
              
              {task.dueDate && (
                <div className="text-sm text-gray-500 mb-3">
                  Due: {format(new Date(task.dueDate), 'PPP')}
                </div>
              )}
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div className="flex space-x-2">
                  <Link 
                    to={`/edit-task/${task._id}`}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit size={18} />
                  </Link>
                  <button 
                    onClick={() => handleDeleteTask(task._id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;