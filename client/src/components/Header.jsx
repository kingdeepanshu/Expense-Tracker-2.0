import React from 'react'

function Header({onChange, defaultSelection}) {

    const today = new Date();
    const week = new Date(today);
    week.setDate(today.getDate() - 7);

    const month = new Date(today);
    month.setDate(today.getMonth() - 1);
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const monthName = monthNames[month.getMonth()];

  return (
    <div className="flex justify-between">
        <div className="w-44 flex flex-col justify-center">
            <div className="flex justify-start mb-2 sm:mb-1">
                <h1 className="">Sort: </h1>
                <select name="" id="" onChange={(event) => onChange(event.target.value)} defaultValue={defaultSelection} className='text-center'>
                    <option value="Total">Total</option>
                    <option value="Today">Today</option>
                    <option value="This Week">This Week</option>
                    <option value="This Month">This Month</option>
                    <option value="Last Month">Last Month</option>
                </select>
            </div>
            <h1 className="text-gray-700 text-left">{today.getDate()} {monthName}, {today.getFullYear()}</h1>
        </div>
        <div className="sm:w-3/6 w-72 flex justify-around items-center">
            <img src="https://pxboom.com/wp-content/uploads/2024/02/profile-picture-girl.jpg" alt="" className="w-16 h-16  rounded-full object-cover border-2 border-indigo-600 sm:w-9 sm:h-9 sm:hidden" />
            <div className="flex flex-col justify-center">
                <h1 className="text-lg text-indigo-600 font-bold sm:text-sm">Dev KARAN</h1>
                <h1 className="text-sm text-gray-600 sm:text-xs">king.deepanshu24@gmail.com</h1>
            </div>
        </div>
    </div>
  )
}

export default Header
