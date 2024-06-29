import React from 'react'
import Navbar from '../components/Navbar'
import AddButton from '../components/AddButton'

function Activities() {
  return (
<body className="min-h-screen w-full flex relative p-6 bg-indigo-600 m-0">
  <Navbar/>
<div className="w-full p-8 bg-white rounded-2xl">

  <div className="mt-8">
    <h1 className="w-44 text-left text-3xl">Activities</h1>
    <hr className="border-2 my-5"/>
    
    <div className='flex flex-wrap justify-between'>
    <div className="flex p-1 px-5 w-5/12 my-2 justify-between rounded-xl bg-indigo-50 hover:bg-indigo-200 items-center sm:w-full">
      <div className="flex">
        <div className="flex flex-col justify-center">
          <h1 className="text-xl">Download Daily Report</h1>
          <div className="flex text-gray-600">
            <h1 className="mr-5">from time to time</h1>
          </div>
        </div>
        </div>
        <h1 className="flex items-center justify-center text-3xl font-bold"><i class="fa-solid fa-download fa-xl" style={{color: "#4f47e6"}}></i></h1>
        </div>

      <div className="flex p-1 px-5 w-5/12 my-2 justify-between rounded-xl bg-indigo-50 hover:bg-indigo-200 items-center sm:w-full">
      <div className="flex">
        <div className="flex flex-col justify-center">
          <h1 className="text-xl">Download Weekly Report</h1>
          <div className="flex text-gray-600">
            <h1 className="mr-5">from time to time</h1>
          </div>
        </div>
        </div>
        <h1 className="flex items-center justify-center text-3xl font-bold"><i class="fa-solid fa-download fa-xl" style={{color: "#4f47e6"}}></i></h1>
        </div>

        <div className="flex p-1 px-5 w-5/12 my-2 justify-between rounded-xl bg-indigo-50 hover:bg-indigo-200 items-center sm:w-full">
      <div className="flex">

        <div className="flex flex-col justify-center">
          <h1 className="text-xl">Download monthly Report</h1>
          <div className="flex text-gray-600">
            <h1 className="mr-5">from time to time</h1>
          </div>
        </div>
        </div>
        <h1 className="flex items-center justify-center text-3xl font-bold"><i class="fa-solid fa-download fa-xl" style={{color: "#4f47e6"}}></i></h1>
        </div>

        <div className="flex p-1 px-5 w-5/12 my-2 justify-between rounded-xl bg-indigo-50 hover:bg-indigo-200 items-center sm:w-full">
      <div className="flex">
        <div className="flex flex-col justify-center">
          <h1 className="text-xl">Download yearly Report</h1>
          <div className="flex text-gray-600">
            <h1 className="mr-5">from time to time</h1>
          </div>
        </div>
        </div>
        <h1 className="flex items-center justify-center text-3xl font-bold"><i class="fa-solid fa-download fa-xl" style={{color: "#4f47e6"}}></i></h1>
        </div>  
    </div>
  </div>  
</div>

<AddButton/>

</body>
  )
}

export default Activities

