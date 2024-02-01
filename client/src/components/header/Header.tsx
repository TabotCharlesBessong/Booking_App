import React from 'react';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div>
      <nav className="p-4 bg-gray-200">
        <ul className="flex space-x-4">
          <li className="mr-4">
            <a
              href="#"
              className="px-4 py-2 rounded text-black-800 hover:bg-gray-800 hover:text-white"
            >
              Home
            </a>
          </li>
          <li className="mr-4">
            <a
              href="#"
              className="px-4 py-2 rounded text-black-800 hover:bg-gray-800 hover:text-white"
            >
              About
            </a>
          </li>
          <li className="mr-4">
            <a
              href="#"
              className="px-4 py-2 rounded text-black-800 hover:bg-gray-800 hover:text-white"
            >
              Services
            </a>
          </li>
          <li className="mr-4">
            <a
              href="#"
              className="px-4 py-2 rounded text-black-800 hover:bg-gray-800 hover:text-white"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
