import { Link } from 'react-router-dom';
import { ClipboardList, Plus } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <ClipboardList size={24} />
            <span>Task Manager</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="hover:bg-primary-dark px-3 py-2 rounded-md transition"
            >
              Tasks
            </Link>
            <Link 
              to="/add-task" 
              className="flex items-center space-x-1 bg-white text-primary hover:bg-gray-100 px-3 py-2 rounded-md transition"
            >
              <Plus size={18} />
              <span>New Task</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;