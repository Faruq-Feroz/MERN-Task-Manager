import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { TaskAPI } from '../api';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await TaskAPI.getTask(id);
        const task = response.data;
        
        // Format date to YYYY-MM-DD for input field
        const formattedDate = task.dueDate 
          ? new Date(task.dueDate).toISOString().split('T')[0]
          : '';
        
        setFormData({
          title: task.title,
          description: task.description || '',
          status: task.status,
          dueDate: formattedDate
        });
        
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load task details');
        console.error(error);
        navigate('/');
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Task title is required');
      return;
    }
    
    try {
      setSubmitting(true);
      await TaskAPI.updateTask(id, formData);
      toast.success('Task updated successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update task');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin mr-2" />
        <span>Loading task details...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center">
        <button 
          onClick={() => navigate('/')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Edit Task</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              className="form-input min-h-32"
              rows="4"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="dueDate" className="form-label">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex items-center"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="mr-2">Saving.</span> <Loader className="animate-spin" size={16} /> </> ) : ( <> <Save size={16} className="mr-2" /> Save Changes </> )} </button> </div> </form> </div> </div> ); };

export default EditTask;