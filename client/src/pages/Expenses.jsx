import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddButton from '../components/AddButton';

function Expenses() {

  const [selection, SetSelection] = useState('Total');
  const [expenses, setExpenses] = useState([{}]);

  const handleSelection = (value) =>{
    SetSelection(value);
}

let link = selection;

useEffect(() =>{
    if(selection === 'This Week'){
        link = '/week';
    }else if(selection === 'This Month'){
        link = '/month';
    }else if(selection === 'Last Month'){
        link = '/lastmonth';
    }else if(selection === 'Total'){
      link = '/total';
    }else{
        link = '/today';
    }
    axios.get(link).then(response => setExpenses(response.data));
},[selection]);

function formatDate(date) {
  if (!date) return 'Date Not Available';
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, '0');
  const monthIndex = formattedDate.getMonth(); // Note: getMonth() returns 0-based index
  const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = monthNames[monthIndex];
  return `${day} ${monthName}`;
}

  return (
<body className="min-h-screen w-full flex relative p-6 bg-indigo-600 m-0">
  <Navbar/>
<div className="w-full p-8 bg-white rounded-2xl">
  <Header onChange={handleSelection} defaultSelection="Total"/>
  <div className="mt-8">
    <h1 className="w-44 text-left text-3xl">Expenses</h1>
    <div className='w-1/2 sm:w-full'>
      {/* <MonthGraph/> */}
    </div>

    <div>
      <h1 className="text-left text-3xl">Recent Expenses</h1>
      <hr className="border-2 my-5"/>
      <div>
      {expenses.map(expense => (
        <Link to={`/${expense._id}`}>
          <div className="flex p-1 px-5 w-4/6 my-2 justify-between rounded-xl bg-indigo-50 hover:bg-indigo-200 items-center sm:w-full">
          <div className="flex">
              <img src="https://www.qfc.com/content/v2/binary/image/bl/health/what-is-healthy-food/what-is-healthy-food--3616981_2022_dx_content_kh_whatishealthyfood_hro_mbl_640x364.jpg" alt="" className="w-16 h-16 rounded-full object-cover mr-6"/>
              <div className="flex flex-col justify-center">
                  <h1 className="text-2xl">{expense.description}</h1>
                  <div className="flex text-gray-600">
                      <h1 className="mr-5">{formatDate(expense.date)}</h1>
                      <h1>{expense.category}</h1>
                  </div>
              </div>
          </div>
          
          <h1 className="flex items-center justify-center text-2xl font-bold">₹{expense.amount}</h1>
      </div>
      </Link>
      ))}
      </div>
  </div>
  </div>  
</div>


<AddButton />
</body>
  )
}

export default Expenses
