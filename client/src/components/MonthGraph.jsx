import { BarChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function MonthGraph() {
  const [expenses, setExpenses] = useState([{}]);
  useEffect(() =>{
    axios.get('/month').then(response => {
      setExpenses(response.data);
    })
  })

  const data = expenses.forEach(expense => expense.amount);


  const date = expenses.forEach(expense => (
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
