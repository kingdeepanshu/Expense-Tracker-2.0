import { PieChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'
import axios from 'axios';


function MonthGraph() {
  const [expenses, setExpenses] = useState([{}]);
  useEffect(() =>{
    axios.get('https://expense-tracker-2-0-one.vercel.app/month').then(response => {
      setExpenses(response.data);
    })
  })
  
  const categories = expenses.reduce((acc, curr, index) => {
    if (!acc[curr.category]) {
      acc[curr.category] = 0;
    }
    acc[curr.category] += curr.amount;
    return acc;
  }, {});
  
  const categoriesArray = Object.keys(categories).map((category) => {
    return { category, value: categories[category] };
  });

  const newArray = categoriesArray.map((item, index) => {
    return {
      id: index,
      value: item.value,
      label: item.category
    };
  });

  let width;
  let height;
  let outangle;
  let inangle;
  if(window.screen.width < 740){
    width = 350;
    height = 200;
    outangle = 70;
    inangle = 10;
  }else if(window.screen.width < 1024 && window.screen.width > 740){
    width = 350;
    height = 200;
    outangle = 70;
    inangle = 10;
  }else if(window.screen.width < 1700 && window.screen.width > 1220){
    width = 450;
    height = 350;
    outangle = 150;
    inangle = 40;
  }else{
    width = 450;
    height = 350;
    outangle = 150;
    inangle = 40;
  }

  return (
    <div className='m-auto'>

<PieChart
  series={[
    {
      data: newArray,
      innerRadius: inangle,
      outerRadius: outangle,
      paddingAngle: 5,
      cornerRadius: 5,
      startAngle: -120,
      endAngle: 210,
      highlightScope: { faded: 'global', highlighted: 'item' },
      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
      },
  ]}
  width={width}
  height={height}
/>
    </div>
  )
}

export default MonthGraph
