import React from 'react'

const Button = ({ name, onClick = () => {}, ...props }) => {
  return (
    <div>
      <button
        className=" px-5 py-2.5 font-semibold text-lg rounded-lg shadow-xl border-b-4 active:translate-y-1 active:shadow-md transition-all duration-200 hover:bg-blue-950 hover:text-white focus:outline-none focus:ring-2 opacity-100"
        style={{
          backgroundColor: 'white',
          color: 'hsl(222.2, 84%, 4.9%)',
          borderColor: 'hsl(222.2, 84%, 4.9%)',
          boxShadow: '0 8px 32px 0 hsla(222.2, 84%, 4.9%, 0.25)',
        }}
        onClick={onClick}
        {...props}
      >
        {name}
      </button>
    </div>
  )
}

export default Button