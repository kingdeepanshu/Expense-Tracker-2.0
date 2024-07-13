import './index.css';
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import { Routes, Route, Navigate } from "react-router-dom";
import Summary from './pages/Summary';
import Activities from './pages/Activities';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  let user = localStorage.getItem("token")?true:false;
  console.log(localStorage.getItem("token"));
  if(!user){
    return (
    <Routes>

        <Route path="/Signup" exact element={<Register/>} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/" exact element={<Login/>} />
        <Route path="/expenses" exact element={<Navigate replace to="/login" />} />
        <Route path="/summary" exact element={<Navigate replace to="/login" />} />
        <Route path="/activities" exact element={<Navigate replace to="/login" />}/>
        <Route path="/add" exact element={<Navigate replace to="/login" />} />
        <Route path="/:id" exact element={<Navigate replace to="/login" />} />

      </Routes>
  )}
  if(user){
    return (

      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" exact element={<Navigate replace to="/" />} />
      <Route path="/expenses" exact element={<Expenses />} />
      <Route path="/summary" exact element={<Summary />} />
      <Route path="/activities" exact element={<Activities />} />
      <Route path="/add" exact element={<AddExpense />} />
      <Route path="/:id" exact element={<EditExpense />} />
    </Routes>

  );
  }
  
}

export default App;
