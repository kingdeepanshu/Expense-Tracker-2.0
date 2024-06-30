import { BarChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function MonthGraph() {
  const [expenses, setExpenses] = useState([{}]);
  useEffect(() =>{
    axios.get('https://expense-tracker-2-0-one.vercel.app/month').then(response => {
      setExpenses(response.data);
    })
  })

  const data = expenses.map(expense => expense.amount);


  const date = expenses.map(expense => (
    new Date(expense.date).getDate()
  ))

  return (
    <div>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: date,
            scaleType: 'band',
          },
        ]}
        series={[ 
          {
            data: data,
          },
        ]}
        width = {200}
        height={150}      
      />
    </div>
  )
}

export default MonthGraph
