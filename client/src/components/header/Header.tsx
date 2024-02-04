import React from 'react'

const Header = () => {
  return (
    <div>

    <nav className="bg-gray-200 p-4">
      <ul className="flex space-x-4">
        <li className="mr-4">
          <a href="#" className="text-black-800 hover:bg-gray-800 hover:text-white px-4 py-2 rounded">Home</a>
        </li>
        <li className="mr-4">
          <a href="#" className="text-black-800 hover:bg-gray-800 hover:text-white px-4 py-2 rounded">About</a>
        </li>
        <li className="mr-4">
          <a href="#" className="text-black-800 hover:bg-gray-800 hover:text-white px-4 py-2 rounded">Services</a>
        </li>
        <li className="mr-4">
          <a href="#" className="text-black-800 hover:bg-gray-800 hover:text-white px-4 py-2 rounded">Contact</a>
        </li>
        <li className="mr-4">
          <a href="#" className="text-black-800 hover:bg-gray-800 hover:text-white px-4 py-2 rounded">Profile</a>
        </li>
      </ul>
    </nav>

    </div>
  )
}

export default Header