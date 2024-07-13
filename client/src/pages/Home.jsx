import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import MonthGraph from '../components/MonthGraph';
import FoodGraph from '../components/FoodGraph';
import ThisWeekGraph from '../components/ThisWeekGraph';
import { Link, useNavigate } from 'react-router-dom';
import AddButton from '../components/AddButton';
import NavbarMobile from '../components/NavbarMobile';
import CategoryChart from '../components/CategoryChart';
import axios from '../utils/Axios';

function Home() {
    const [selection, setSelection] = useState('Today');
    const [expenses, setExpenses] = useState([]);
    const [monthex, setMonthex] = useState([]);
    const [foodex, setFoodex] = useState([]);
    const [weekex, setweekex] = useState([]);
    const navigate = useNavigate();

    const handleSelection = (value) => {
        setSelection(value);
    };

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
        const fetchMonthex = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('/month', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMonthex(data);
            } catch (error) {
                console.error('Error fetching monthly expenses:', error);
            }
        };

        fetchMonthex();
    }, []);

    useEffect(() => {
        const fetchWeekex = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('/week', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setweekex(data);
            } catch (error) {
                console.error('Error fetching weekly expenses:', error);
            }
        };

        fetchWeekex();
    }, []);

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

    const totalcat = (cat) => {
        return cat.reduce((count, ex) => count + ex.amount, 0);
    };

    function formatDate(date) {
        if (!date) return 'Date Not Available';
        const formattedDate = new Date(date);
        const day = formattedDate.getDate().toString().padStart(2, '0');
        const monthIndex = formattedDate.getMonth();
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const monthName = monthNames[monthIndex];
        return `${day} ${monthName}`;
    }

    return (
        <div className="min-h-screen w-full flex relative sm:p-2 p-5 bg-indigo-600 m-0 sm:flex-col">
            <NavbarMobile />
            <Navbar />
            <div className="w-full p-8 bg-white rounded-2xl">
                <Header onChange={handleSelection} defaultSelection="Today" />
                <div className="mt-8">
                    <h1 className="w-44 text-left text-3xl">DashBoard</h1>
                    <div className='w-full m-auto mt-2'>
                        <CategoryChart />
                    </div>  
                    <div className="flex flex-wrap justify-between m-auto mt-6 sm:flex-col sm:justify-center sm:items-center md:flex-col md:justify-center md:items-center">
                        <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-fit 2xl:w-80 2xl:h-80 sm:hidden">
                            <div>
                                <h1 className="text-2xl text-left text-gray-600">This Month</h1>
                                <h1 className="text-xl text-left font-bold">₹{totalcat(monthex)}</h1>
                            </div>
                            <div className='w-full flex justify-center items-center overflow-hidden'>
                                <MonthGraph />
                            </div>
                        </div>
                        <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80 sm:hidden">
                            <div>
                                <h1 className="text-2xl text-left text-gray-600">This Week</h1>
                                <h1 className="text-xl text-left font-bold">₹{totalcat(weekex)}</h1>
                            </div>
                            <div className='w-full flex justify-center items-center overflow-hidden'>
                                <ThisWeekGraph />
                            </div>
                        </div>
                        <div className="w-60 h-60 mb-10 rounded-xl shadow-2xl shadow-indigo-600 p-7 flex flex-col justify-between bg-indigo-200 xl:w-72 xl:h-72 sm:w-full sm:h-full md:w-full md:h-full 2xl:w-80 2xl:h-80 sm:hidden">
                            <div>
                                <h1 className="text-2xl text-left text-gray-600">Food</h1>
                                <h1 className="text-xl text-left font-bold">₹{totalcat(foodex)}</h1>
                            </div>
                            <div className='w-full flex justify-center items-center overflow-hidden'>
                                <FoodGraph />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-left text-3xl">Recent Expenses</h1>
                        <hr className="border-2 my-5" />
                        <div>
                            {expenses.map(expense => (
                                <Link to={`/${expense._id}`} key={expense._id}>
                                    <div className="flex p-1 px-5 w-4/6 my-2 justify-between rounded-xl bg-indigo-50 hover:bg-indigo-200 items-center sm:w-full">
                                        <div className="flex">
                                            <img src="https://www.qfc.com/content/v2/binary/image/bl/health/what-is-healthy-food/what-is-healthy-food--3616981_2022_dx_content_kh_whatishealthyfood_hro_mbl_640x364.jpg" alt="" className="w-16 h-16 rounded-full object-cover mr-6" />
                                            <div className="flex flex-col justify-center">
                                                <h1 className="text-2xl sm:text-lg">{expense.description}</h1>
                                                <div className="flex text-gray-600 sm:flex-col sm:items-start md:flex-col md:items-start">
                                                    <h1 className="mr-5">{formatDate(expense.date)}</h1>
                                                    <h1 className='sm:text-sm'>{expense.category}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 className="flex items-center justify-center text-2xl font-bold sm:text-xl">₹{expense.amount}</h1>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <AddButton />
        </div>
    );
}

export default Home;
