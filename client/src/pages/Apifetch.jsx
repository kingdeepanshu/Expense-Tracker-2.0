import React from 'react'
import { useState, useEffect } from 'react';

function Apifetch({link}) {
    const [expenses, setExpenses] = useState([{}]);

  useEffect(() => {
    fetch(link)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setExpenses(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  console.log(expenses);
  return (
    <div className='text-black'>
        {expenses.map(expense => (
            <div className="flex p-1 px-5 w-4/6 my-2 justify-between rounded-xl bg-indigo-50 hover:bg-indigo-200 items-center sm:w-full">
            <div className="flex">
                <img src="https://www.qfc.com/content/v2/binary/image/bl/health/what-is-healthy-food/what-is-healthy-food--3616981_2022_dx_content_kh_whatishealthyfood_hro_mbl_640x364.jpg" alt="" className="w-16 h-16 rounded-full object-cover mr-6"/>
                <div className="flex flex-col justify-center">
                    <h1 className="text-2xl">{expense.description}</h1>
                    <div className="flex text-gray-600">
                        <h1 className="mr-5">time</h1>
                        <h1>{expense.category}</h1>
                    </div>
                </div>
            </div>
            
            <h1 className="flex items-center justify-center text-2xl font-bold">₹{expense.amount}</h1>
        </div>
        ))}
    </div>
  )
}

export default Apifetch
