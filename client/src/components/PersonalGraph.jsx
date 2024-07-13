import { BarChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'
import axios from '../utils/Axios';



function MonthGraph() {
  const [expenses, setExpenses] = useState([{}]);
  useEffect(() =>{
    axios.get('/personal').then(response => {
      setExpenses(response.data);
    })
  })
  
  const totalAmounts = expenses.reduce((acc, curr, index) => {
    if (!acc[curr.date]) {
      acc[curr.date] = 0;
    }
    acc[curr.date] += curr.amount;
    return acc;
  }, {});

  const totalAmountsArray = Object.keys(totalAmounts).map((date) => {
    return { date, totalAmount: totalAmounts[date] };
  });

  const data = totalAmountsArray.map(expense => expense.totalAmount);


  const date = totalAmountsArray.map(expense => (
    new Date(expense.date).getDate()
  ))
  const tabwidth = window.screen.width;

  let width;
  if(window.screen.width < 740){
    width = tabwidth - 133;
  }else if(window.screen.width < 1024 && window.screen.width > 740){
    width = 500;
  }else if(window.screen.width < 1700 && window.screen.width > 1220){
    width = 280;
  }else{
    width = 220;
  }

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
            color: '#4f47e6',
          },
        ]}
        width = {width}
        height={190}      
      />
    </div>
  )
}

export default MonthGraph
