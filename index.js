const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('view engine', 'ejs');

// mongoose
mongoose.connect("mongodb+srv://DevKaran:devkaran@devcluster.pgch4da.mongodb.net/myProjects").then(()=> {
    console.log("database connected");
}).catch(error => {
    console.error(error);
})

const schema = mongoose.Schema({
    description: String,
    amount: Number,
    date: Date,
    category: String
})

const Expense = mongoose.model("expenses", schema);

// const TotalExpenses = async() => {
//     const expenses = await Expense.find();
//     let total = 0;
//     expenses.forEach((e) => {
//         total = total + e.amount;
//     })
//     return total;
// }
// const TotalAmount = TotalExpenses();





// homepage
app.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find();
        const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
        res.render('home', { expenses, totalAmount });
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred");
    }
}); 

// to get add page
app.get("/add", async(req, res) => {
    res.render('add');
})
app.post("/add", async(req, res) => {
    const expenses = new Expense(req.body);
    await expenses.save();
    res.status(200).redirect('/');
})

// edit page
app.get("/:id", async(req, res) => {
    const expenses = await Expense.findById(req.params.id);
    res.render('edit', { expenses });
})
app.put("/:id", async(req, res) => {
    await Expense.findByIdAndUpdate(req.params.id, req.body,{ new: true, runValidators: true });
    res.status(200).redirect('/');
})

// deletebyid
app.delete("/:id", async(req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/');
})


app.listen(3000, () => {
    console.log(`This Server in running on http://localhost:3000`);
} )