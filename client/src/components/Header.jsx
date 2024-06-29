import React from 'react'

function Header({onChange, defaultSelection}) {
  return (
    <div class="flex justify-between">
        <div class="w-44 flex flex-col justify-center">
            <div class="flex justify-start mb-2">
                <h1 class="">Sort: </h1>
                <select name="" id="" onChange={(event) => onChange(event.target.value)} defaultValue={defaultSelection} className='text-center'>
                    <option value="Total">Total</option>
                    <option value="Today">Today</option>
                    <option value="This Week">This Week</option>
                    <option value="This Month">This Month</option>
                    <option value="Last Month">Last Month</option>
                </select>
            </div>
            <h1 class="text-gray-700 text-left">01-08 march, 2020</h1>
        </div>
        <div class="w-72 flex justify-around">
            <img src="https://pxboom.com/wp-content/uploads/2024/02/profile-picture-girl.jpg" alt="" class="w-16 h-16  rounded-full object-cover border-2 border-indigo-600" />
            <div class="flex flex-col justify-center">
                <h1 class="text-lg text-indigo-600 font-bold">Dev KARAN</h1>
                <h1 class="text-sm text-gray-600">king.deepanshu24@gmail.com</h1>
            </div>
        </div>
    </div>
  )
}

export default Header
