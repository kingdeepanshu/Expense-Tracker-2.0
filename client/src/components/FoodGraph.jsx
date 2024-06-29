import React, {useState, useEffect} from 'react'
import { BarChart } from '@mui/x-charts';
import { useWindowSize  } from 'react-use'

function FoodGraph() {
  const { width, height } = useWindowSize();
  const [expenses, setExpenses] = useState([{}]);
  useEffect(() =>{
    fetch('/food').then(response => response.json()).then((data) => {
      setExpenses(data);
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

export default FoodGraph
