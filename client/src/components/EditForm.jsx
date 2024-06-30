import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditForm() {
  const [expenses, setExpenses] = useState([{}]);
    
  const [amount, setAmount] = useState(expenses.amount);
  const [category, setCategory] = useState(expenses.category);
  const [date, setDate] = useState(expenses.date);
  const [description, setDescription] = useState(expenses.description);
  const [added, setAdded] = useState(false)
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://expense-tracker-2-0-one.vercel.app/${id}`)
      .then(response => {
        const expense = response.data;
        setAmount(expense.amount);
        setCategory(expense.category);
        setDate(expense.date ? expense.date.split('T')[0] : '');
        setDescription(expense.description);
      })
      .catch(error => {
        console.error('Error fetching expense:', error);
      });
  }, [id]);

  const deleteSubmit = async(event) => {
    event.preventDefault();
    try{
        axios.delete(`https://expense-tracker-2-0-one.vercel.app/${id}`);
        setAdded(true)
    }catch(err){
        console.log(err);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newexpense = { amount, category, date, description };
    console.log(newexpense);
    try {
        axios.put(`https://expense-tracker-2-0-one.vercel.app/${id}`, newexpense)
        setAdded(true)
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  if (added) {
    return (
        <Navigate to='/expenses'/>
    )
  }else{
    return (
        <>
        <form onSubmit={handleSubmit} className="w-full p-3">
        <div>
          <h1 className="w-4/5 capitalize text-xl">Description</h1>
          <input
            type="text"
            name="description"
            className="inline w-full border-2 text-4xl border-black mb-5 capitalize placeholder:capitalize overflow-hidden"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
  
          <h1 className="w-4/5 capitalize text-xl">Amount</h1>
          <input
            type="number"
            name="amount"
            className="inline w-full border-2 text-4xl border-black mb-5"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
  
          <h1 className="w-4/5 capitalize text-xl">Date</h1>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="inline border-2 text-2xl border-black mb-5"
            required
          />
  
          <h1 className="w-4/5 capitalize text-xl">Category</h1>
          <select
            name="category"
            className="inline w-1/2 border-2 text-2xl border-black mb-5"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food" className="capitalize">Food</option>
            <option value="Travel" className="capitalize">Travel</option>
            <option value="Grocery" className="capitalize">Grocery</option>
            <option value="Personal" className="capitalize">Personal</option>
            <option value="Flat" className="capitalize">Flat</option>
          </select>
        </div>
        <button type="submit" className="text-2xl rounded-full p-2 bg-red-600 text-white">
          Update Expense
        </button>
      </form>
      <form action="" method="POST" class="px-3" onSubmit={deleteSubmit}>
        <button type="submit" class="text-2xl rounded-full p-2 bg-green-600 text-white">Delete</button>
    </form>
    </>
    )
  }
}

export default EditForm;
