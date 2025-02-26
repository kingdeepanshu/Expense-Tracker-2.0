import Navbar from '../components/Navbar'
import AddForm from '../components/AddForm';

function AddExpense() {

  return (
<body className="min-h-screen  w-full flex relative p-5 bg-indigo-600 m-0">
        <Navbar/>
        <div className="w-full p-8 bg-white rounded-2xl border-2">
            
            <div className="mt-8">
                <h1 className="w-full text-left text-4xl">Add New Expense</h1>
                <hr className='border-2 my-5'/>
            </div>  

            <AddForm/>

        </div>
        <div className='w-3/12 sm:w-0'>
        </div>
</body>
  )
}

export default AddExpense
