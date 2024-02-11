import React from 'react';

const Header = () => {
  return (
    <div className="sticky top-0 z-10">
      <nav className="p-4 text-white bg-black">
        <ul className="flex space-x-32">
          <li className="mr-4">
            <a href="#" className="px-8 py-2 rounded hover:bg-gray-800">HOME</a>
          </li>
          <li className="mr-4">
            <a href="#" className="px-4 py-2 rounded hover:bg-gray-800">MOVIES</a>
          </li>
          <li className="mr-4">
            <a href="#" className="px-4 py-2 rounded hover:bg-gray-800">TICKETS STORE</a>
          </li>
          <li className="mr-4">
            <a href="#" className="px-4 py-2 rounded hover:bg-gray-800">PROFILE</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
