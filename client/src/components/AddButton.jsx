import React from 'react'
import { Link } from 'react-router-dom'

function AddButton() {
  return (
    <Link to="/add">
    <h1 className="fixed z-10 bottom-12 right-12 w-20 h-20 text-white text-2xl rounded-full text-center bg-indigo-600 flex items-center justify-center font-bold sm:bottom-6 sm:right-6">ADD</h1>
    </Link>
  )
}

export default AddButton
