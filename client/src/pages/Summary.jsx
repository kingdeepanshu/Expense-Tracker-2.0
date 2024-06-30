import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';
import TotalGraph from '../components/TotalGraph';
import FoodGraph from '../components/FoodGraph';
import TravelGraph from '../components/TravelGraph';
import PersonalGraph from '../components/PersonalGraph';
import GroceryGraph from '../components/GroceryGraph';
import FlatGraph from '../components/FlatGraph';

function Summary() {
  const [selection, SetSelection] = useState('This Month');
  const [expenses, setExpenses] = useState([{}]);
  const [foodex, setFoodex] = useState([{}]);
  const [travelex, setTravelex] = useState([{}]);
  const [groceryex, setGroceryex] = useState([{}]);
  const [personalex, setPersonalex] = useState([{}]);
  const [flatex, setFlatex] = useState([{}]);
  const [Totalex, setTotalex] = useState([{}]);

  const handleSelection = (value) =>{
    SetSelection(value);
}

let link = selection;

useEffect(() =>{
    if(selection === 'This Week'){
        link = 'https://expense-tracker-2-0-one.vercel.app/week';
    }else if(selection === 'This Month'){
        link = 'https://expense-tracker-2-0-one.vercel.app/month';
    }else if(selection === 'Last Month'){
        link = 'https://expense-tracker-2-0-one.vercel.app/lastmonth';
    }else{
        link = 'https://expense-tracker-2-0-one.vercel.app/today';
    }
    fetch(link).then(response => response.json()).then(data => {
        setExpenses(data);
    })
},[selection]);

  useEffect(() => {
    fetch("https://expense-tracker-2-0-one.vercel.app/food").then(response => response.json()).then(data =>{
        setFoodex(data);
    })
  },[]);

  useEffect(() => {
    fetch("https://expense-tracker-2-0-one.vercel.app/flat").then(response => response.json()).then(data =>{
        setFlatex(data);
    })
  },[]);

  useEffect(() => {
    fetch("https://expense-tracker-2-0-one.vercel.app/travel").then(response => response.json()).then(data =>{
        setTravelex(data);
    })
  },[]);

  useEffect(() => {
    fetch("https://expense-tracker-2-0-one.vercel.app/grocery").then(response => response.json()).then(data =>{
        setGroceryex(data);
    })
  },[]);

  useEffect(() => {
    fetch("https://expense-tracker-2-0-one.vercel.app/personal").then(response => response.json()).then(data =>{
        setPersonalex(data);
    })
  },[]);

  useEffect(() => {
    fetch("https://expense-tracker-2-0-one.vercel.app/total").then(response => response.json()).then(data =>{
        setTotalex(data);
    })
  },[]);

const totalcat = (cat) =>{
    let count = 0;
    cat.map(ex => (
        count = count + ex.amount
    ))
    return count
}

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
<body className="w-full flex relative p-5 bg-indigo-600 m-0 min-h-screen">

<Navbar/>

<div className="w-full p-8 bg-white rounded-2xl ">
<Header onChange={handleSelection} defaultSelection="This Month"/>
  <div className="mt-8">
    <h1 className="w-44 text-left text-3xl">Categories</h1>
    <div className="flex flex-wrap justify-between m-auto mt-6 sm:flex-col sm:justify-center sm:items-center md:flex-col md:justify-center md:items-center">

      <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80">
        <div>
          <h1 className="text-2xl text-left text-gray-600">Total</h1>
          <h1 className="text-xl text-left font-bold">₹{totalcat(Totalex)}</h1>
        </div>
        <div className="border-2 w-full">
          <TotalGraph/>
        </div>
      </div>


      <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80">
        <div>
          <h1 className="text-2xl text-left text-gray-600">Food</h1>
          <h1 className="text-xl text-left font-bold">₹{totalcat(foodex)}</h1>
        </div>
        <div className="border-2 w-full">
          <FoodGraph/>
        </div>
      </div>

      <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80">
        <div>
          <h1 className="text-2xl text-left text-gray-600">Travel</h1>
          <h1 className="text-xl text-left font-bold">₹{totalcat(travelex)}</h1>
        </div>
        <div className="border-2 w-full">
          <TravelGraph/>
        </div>
      </div>
      <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80">
        <div>
          <h1 className="text-2xl text-left text-gray-600">Personal</h1>
          <h1 className="text-xl text-left font-bold">₹{totalcat(personalex)}</h1>
        </div>
        <div className="border-2 w-full">
          <PersonalGraph/>
        </div>
      </div>

      <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80">
        <div>
          <h1 className="text-2xl text-left text-gray-600">Grocery</h1>
          <h1 className="text-xl text-left font-bold">₹{totalcat(groceryex)}</h1>
        </div>
        <div className="border-2 w-full">
          <GroceryGraph/>
        </div>
      </div>

      <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80">
        <div>
          <h1 className="text-2xl text-left text-gray-600">Flat</h1>
          <h1 className="text-xl text-left font-bold">₹{totalcat(flatex)}</h1>
        </div>
        <div className="border-2 w-full">
          <FlatGraph/>
        </div>
      </div>
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

<AddButton/>

</body>
  )
}

export default Summary
