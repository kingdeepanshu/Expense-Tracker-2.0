const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const cors = require('cors');


app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors());

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
},
{
    timestamps: true,
});

const Expense = mongoose.model("expenses", schema);

// today time
const today = new Date();

// Start of today in UTC
let todayStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0));

// End of today in UTC
let todayEnd = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

// Start of the current week (7 days ago) in UTC
const weekStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 6, 0, 0, 0, 0));

// Start of last week (14 days ago) in UTC
const lastWeekStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 13, 0, 0, 0, 0));

// Start of the current month (1 month ago) in UTC
const monthStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, today.getUTCDate(), 0, 0, 0, 0));

// For better clarity on the month start, you may want to start at the beginning of the month
const beginningOfMonthStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1, 0, 0, 0, 0));


app.get("/", async (req, res) => {
    const expenses = await Expense.find().sort({ createdAt: -1 })
    res.json(expenses);
}); 


// homepage
app.get("/today", async (req, res) => {
    const expenses = await Expense.find({ date: { $gte: todayStart, $lte: today }}).sort({ date: -1 })
    res.json(expenses);
}); 

app.get("/week", async (req, res) => {
    const expenses = await Expense.find({ date: { $gte: weekStart, $lte: today }}).sort({ date: -1 })
    res.json(expenses);
}); 

app.get("/total", async (req, res) => {
    const expenses = await Expense.find().sort({ date: -1 })
    res.json(expenses);
}); 

app.get("/lastweek", async (req, res) => {
    const expenses = await Expense.find({ date: { $gte: lastWeekStart, $lte: week }}).sort({ date: -1 })
    res.json(expenses);
}); 
app.get("/month", async (req, res) => {
    const expenses = await Expense.find({ date: { $gte: monthStart, $lte: today }}).sort({ date: -1 })
    res.json(expenses);
}); 
app.get("/lastmonth", async (req, res) => {
    const expenses = await Expense.find({ createdAt: { $gte: firstDayOfPreviousMonth, $lte: lastDayOfPreviousMonth }}).sort({ date: -1 })
    res.json(expenses);
}); 

app.get("/food", async (req, res) => {
    const expenses = await Expense.find({ category: "Food"}).sort({ date: -1 })
    res.json(expenses);
}); 

app.get("/travel", async (req, res) => {
    const expenses = await Expense.find({ category: "Travel"}).sort({ date: -1 })
    res.json(expenses);
});

app.get("/grocery", async (req, res) => {
    const expenses = await Expense.find({ category: "Grocery"}).sort({ date: -1 })
    res.json(expenses);
});

app.get("/flat", async (req, res) => {
    const expenses = await Expense.find({ category: "Flat"}).sort({ date: -1 })
    res.json(expenses);
});

app.get("/personal", async (req, res) => {
    const expenses = await Expense.find({ category: "Personal"}).sort({ date: -1 })
    res.json(expenses);
});

app.post("/add", async(req, res) => {
    const expenses = new Expense(req.body);
    await expenses.save();
})

app.get("/:id", async (req, res) => {
    const expenses = await Expense.findById(req.params.id);
    res.json(expenses);
});
app.put("/:id", async (req, res) => {
    await Expense.findByIdAndUpdate(req.params.id, req.body);
});

app.delete("/:id", async(req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
})

app.listen(5000, () => {
    console.log(`This Server in running on http://localhost:5000`);
} )
