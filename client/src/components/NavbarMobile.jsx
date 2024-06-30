import React from 'react'
import { Link } from 'react-router-dom'

function NavbarMobile() {
  return (
    <div className='w-full bg-indigo-600 hidden sm:flex p-4 text-white mb-2 flex-col justify-between'>
      <h1 className='text-3xl font-bold'>Expenses</h1>

      <menu className="w-full flex justify-between text-indigo-600">
        <h1 className="text-lg my-3 text-left hover:font-bold bg-white px-2 rounded-lg"><Link to="/">DashBoard</Link></h1>
        <h1 className="text-lg my-3 text-left hover:font-bold bg-white px-2 rounded-lg"><Link to="/expenses">Expenses</Link></h1>
        <h1 className="text-lg my-3 text-left hover:font-bold bg-white px-2 rounded-lg"><Link to="/summary">Summary</Link></h1>
        <h1 className="text-lg my-3 text-left hover:font-bold bg-white px-2 rounded-lg"><Link to="/activities">Activities</Link></h1>
      </menu>
    </div>
  )
}

export default NavbarMobile
