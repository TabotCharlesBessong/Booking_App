import React, { useState } from 'react';

const Input = ({ label, type, placeholder, errorMessage, inputProps }) => {
  const [value, setValue] = useState(''); // State for input value

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor={label} className="block mb-2 text-sm font-bold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={label}
        name={label}
        placeholder={placeholder}
        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        value={value}
        onChange={handleChange}
        {...inputProps} // Pass additional props (e.g., disabled)
        required
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Input;
