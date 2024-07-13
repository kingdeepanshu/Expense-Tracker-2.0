import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import AddButton from '../components/AddButton';
import { useNavigate } from 'react-router-dom';
import TotalGraph from '../components/TotalGraph';
import FoodGraph from '../components/FoodGraph';
import TravelGraph from '../components/TravelGraph';
import PersonalGraph from '../components/PersonalGraph';
import GroceryGraph from '../components/GroceryGraph';
import axios from '../utils/Axios';
import FlatGraph from '../components/FlatGraph';
import NavbarMobile from '../components/NavbarMobile';

function Summary() {
  const [selection, SetSelection] = useState('This Month');
  const [expenses, setExpenses] = useState([{}]);
  const [foodex, setFoodex] = useState([{}]);
  const [travelex, setTravelex] = useState([{}]);
  const [groceryex, setGroceryex] = useState([{}]);
  const [personalex, setPersonalex] = useState([{}]);
  const [flatex, setFlatex] = useState([{}]);
  const [Totalex, setTotalex] = useState([{}]);
  const navigate = useNavigate();


  const handleSelection = (value) =>{
    SetSelection(value);
}

let link = selection;

useEffect(() => {
  const fetchData = async () => {
      let link;
      if (selection === 'This Week') {
          link = '/week';
      } else if (selection === 'This Month') {
          link = '/month';
      } else if (selection === 'Last Month') {
          link = '/lastmonth';
      } else if (selection === 'Total') {
          link = '/total';
      } else {
          link = '/today';
      }

      try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get(link, {
              headers: { Authorization: `Bearer ${token}` }
          });
          setExpenses(data);
      } catch (error) {
          console.error('Error fetching data:', error);
          if (error.response && error.response.status === 401) {
              navigate('/login');
          }
      }
  };

  fetchData();
}, [selection, navigate]);

useEffect(() => {
  const fetchFoodex = async () => {
      try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get('/food', {
              headers: { Authorization: `Bearer ${token}` }
          });
          setFoodex(data);
      } catch (error) {
          console.error('Error fetching food expenses:', error);
      }
  };

  fetchFoodex();
}, []);

useEffect(() => {
  const fetchFoodex = async () => {
      try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get('/flat', {
              headers: { Authorization: `Bearer ${token}` }
          });
          setFlatex(data);
      } catch (error) {
          console.error('Error fetching food expenses:', error);
      }
  };

  fetchFoodex();
}, []);

useEffect(() => {
  const fetchFoodex = async () => {
      try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get('/travel', {
              headers: { Authorization: `Bearer ${token}` }
          });
          setTravelex(data);
      } catch (error) {
          console.error('Error fetching food expenses:', error);
      }
  };

  fetchFoodex();
}, []);

useEffect(() => {
  const fetchFoodex = async () => {
      try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get('/grocery', {
              headers: { Authorization: `Bearer ${token}` }
          });
          setGroceryex(data);
      } catch (error) {
          console.error('Error fetching food expenses:', error);
      }
  };

  fetchFoodex();
}, []);

useEffect(() => {
  const fetchFoodex = async () => {
      try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get('/personal', {
              headers: { Authorization: `Bearer ${token}` }
          });
          setPersonalex(data);
      } catch (error) {
          console.error('Error fetching food expenses:', error);
      }
  };

  fetchFoodex();
}, []);

useEffect(() => {
  const fetchFoodex = async () => {
      try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get('/total', {
              headers: { Authorization: `Bearer ${token}` }
          });
          setTotalex(data);
      } catch (error) {
          console.error('Error fetching food expenses:', error);
      }
  };

  fetchFoodex();
}, []);

const totalcat = (cat) => {
  return cat.reduce((count, ex) => count + ex.amount, 0);
};

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
<body className="w-full flex relative sm:p-2 p-5 bg-indigo-600 m-0 min-h-screen sm:flex-col">
<NavbarMobile/>
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
        <div className=" w-full">
          <TotalGraph/>
        </div>
      </div>


      <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80">
        <div>
          <h1 className="text-2xl text-left text-gray-600">Food</h1>
          <h1 className="text-xl text-left font-bold">₹{totalcat(foodex)}</h1>
        </div>
        <div className="w-full">
          <FoodGraph/>
        </div>
      </div>

      <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80">
        <div>
          <h1 className="text-2xl text-left text-gray-600">Travel</h1>
          <h1 className="text-xl text-left font-bold">₹{totalcat(travelex)}</h1>
        </div>
        <div className="w-full">
          <TravelGraph/>
        </div>
      </div>
      <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80">
        <div>
          <h1 className="text-2xl text-left text-gray-600">Personal</h1>
          <h1 className="text-xl text-left font-bold">₹{totalcat(personalex)}</h1>
        </div>
        <div className="w-full">
          <PersonalGraph/>
        </div>
      </div>

      <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80">
        <div>
          <h1 className="text-2xl text-left text-gray-600">Grocery</h1>
          <h1 className="text-xl text-left font-bold">₹{totalcat(groceryex)}</h1>
        </div>
        <div className="w-full">
          <GroceryGraph/>
        </div>
      </div>

      <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80">
        <div>
          <h1 className="text-2xl text-left text-gray-600">Flat</h1>
          <h1 className="text-xl text-left font-bold">₹{totalcat(flatex)}</h1>
        </div>
        <div className="w-full">
          <FlatGraph/>
        </div>
      </div>
    </div>
  </div>

</div>

<AddButton/>

</body>
  )
}

export default Summary
