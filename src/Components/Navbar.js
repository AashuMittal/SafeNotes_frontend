import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <nav className="bg-white dark:bg-gray-500">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Left Side - Main Navigation */}
          <div className="flex items-center">
            <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://static.vecteezy.com/system/resources/previews/000/503/997/original/vector-notes-icon-design.jpg" className="h-8" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">SaveNotes</span>
            </a>
            <ul className="flex flex-row font-medium ml-8 space-x-8 rtl:space-x-reverse text-sm mr-10">

              <li>
                <Link to="/" className="text-gray-900 dark:text-white hover:underline">Home</Link>
              </li>

              <li>
                <Link to="/notes" className="text-gray-900 dark:text-white hover:underline">My Notes</Link>
              </li>
              <li>
                <Link to="/add" className="text-gray-900 dark:text-white hover:underline">Add Notes</Link>
              </li>

            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/signup" className="text-gray-900 dark:text-white hover:underline mr-8">Signup</Link>
            {auth ?
              <div><span className='text-red-600 text-xl font-bold'>{auth.user.name}</span>
                <Link onClick={logout} to="/login" className="text-gray-900 hover:underline text-2xl dark:text-blue-800 font-bold ">
                  <span className="ml-5 dark:text-black text-xl font-medium">Logout</span>
                </Link>
              </div>

              :
              <Link to="/login" className="text-gray-900 dark:text-white hover:underline ">Login</Link>

            }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
