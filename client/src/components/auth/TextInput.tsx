import React, { ChangeEventHandler, FC } from 'react'

type TextInputProp = {
  label:string
  type:string
  name:string
  placeholder:string
  onChange: ChangeEventHandler<HTMLInputElement>
  id:string
}

const TextInput:FC<TextInputProp> = ({label,type,name,placeholder,onChange,id}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-bold text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        required
        onChange={onChange}
      />
    </div>
  );
}

export default TextInput