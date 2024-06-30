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
    console.log("Database connected");
}).catch(error => {
    console.error(error);
});

const schema = mongoose.Schema({
    description: String,
    amount: Number,
    date: Date,
    category: String
}, {
    timestamps: true,
});

const Expense = mongoose.model("expenses", schema);

app.get("/", async (req, res) => {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
});

app.get("/today", async (req, res) => {
    const today = new Date();
    const todayStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0));
    const todayEnd = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

    const expenses = await Expense.find({ date: { $gte: todayStart, $lte: todayEnd } }).sort({ date: -1 });
    res.json(expenses);
});

app.get("/week", async (req, res) => {
    const today = new Date();
    const weekStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 6, 0, 0, 0, 0));
    
    const expenses = await Expense.find({ date: { $gte: weekStart, $lte: today } }).sort({ date: -1 });
    res.json(expenses);
});

app.get("/lastweek", async (req, res) => {
    const today = new Date();
    const week = new Date(today);
    week.setDate(today.getUTCDate() - 7);
    const lastWeekStart = new Date(week);
    lastWeekStart.setDate(week.getUTCDate() - 7);

    const expenses = await Expense.find({ date: { $gte: lastWeekStart, $lte: week } }).sort({ date: -1 });
    res.json(expenses);
});

app.get("/month", async (req, res) => {
    const today = new Date();
    const monthStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, today.getUTCDate(), 0, 0, 0, 0));

    const expenses = await Expense.find({ date: { $gte: monthStart, $lte: today } }).sort({ date: -1 });
    res.json(expenses);
});

app.get("/lastmonth", async (req, res) => {
    const today = new Date();
    const firstDayOfPreviousMonth = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1, 0, 0, 0, 0));
    const lastDayOfPreviousMonth = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0, 23, 59, 59, 999));

    const expenses = await Expense.find({ date: { $gte: firstDayOfPreviousMonth, $lte: lastDayOfPreviousMonth } }).sort({ date: -1 });
    res.json(expenses);
});

app.get("/food", async (req, res) => {
    const expenses = await Expense.find({ category: "Food" }).sort({ date: -1 });
    res.json(expenses);
});

app.get("/travel", async (req, res) => {
    const expenses = await Expense.find({ category: "Travel" }).sort({ date: -1 });
    res.json(expenses);
});

app.get("/grocery", async (req, res) => {
    const expenses = await Expense.find({ category: "Grocery" }).sort({ date: -1 });
    res.json(expenses);
});

app.get("/flat", async (req, res) => {
    const expenses = await Expense.find({ category: "Flat" }).sort({ date: -1 });
    res.json(expenses);
});

app.get("/personal", async (req, res) => {
    const expenses = await Expense.find({ category: "Personal" }).sort({ date: -1 });
    res.json(expenses);
});

app.post("/add", async(req, res) => {
    const expenses = new Expense(req.body);
    await expenses.save();
    res.status(201).json(expenses);
});

app.get("/:id", async (req, res) => {
    const expenses = await Expense.findById(req.params.id);
    res.json(expenses);
});

app.put("/:id", async (req, res) => {
    await Expense.findByIdAndUpdate(req.params.id, req.body);
    res.status(204).end();
});

app.delete("/:id", async(req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
});
