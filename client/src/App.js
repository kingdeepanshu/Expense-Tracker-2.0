import './App.css';
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Summary from './pages/Summary';
import Activities from './pages/Activities';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/:id" element={<EditExpense />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
