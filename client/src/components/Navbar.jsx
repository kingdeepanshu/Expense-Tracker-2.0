import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="w-3/12 border-none h-screen rounded-r-3xl p-10 bg-indigo-600 text-white sticky top-0 overflow-hidden sm:hidden md:w-4/12">
            <h1 className="mb-16 text-4xl font-black xl:text-5xl md:text-4xl ">Expense</h1>
            
            <div className="h-screen flex flex-col justify-between items-start">
                <menu className="w-full">
                    <h1 className="text-2xl my-3 text-left hover:font-bold"><Link to="/">DashBoard</Link></h1>
                    <h1 className="text-2xl my-3 text-left hover:font-bold"><Link to="/expenses">Expenses</Link></h1>
                    <h1 className="text-2xl my-3 text-left hover:font-bold"><Link to="/summary">Summary</Link></h1>
                    <h1 className="text-2xl my-3 text-left hover:font-bold"><Link to="/activities">Activities</Link></h1>
                </menu>
    
                <menu className="mb-60">
                    <h1 className="text-xl my-3 text-left hover:font-bold">settings</h1>
                    <h1 className="text-xl my-3 text-left hover:font-bold">logout</h1>
                </menu>
            </div>
        </div>
  )
}

export default Navbar
