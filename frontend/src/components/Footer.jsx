import { Link } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-6 mt-8 shadow-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Branding */}
        <div className="flex items-center space-x-2">
          <ClipboardList size={24} />
          <span className="text-lg font-semibold">Task Manager</span>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/add-task" className="hover:underline">Add Task</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </nav>

        {/* Copyright */}
        <p className="text-sm mt-4 md:mt-0">&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
