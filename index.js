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

let todayStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0));

let endTime = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

// week time
const week = new Date();
week.setDate(today.getDate() - 7);

// lastweek time
const lastWeekStart = new Date(week);
lastWeekStart.setDate(week.getDate() - 7);


const month = new Date();
month.setDate(today.getMonth() - 1);

let firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

let lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
lastDayOfPreviousMonth.setDate(firstDayOfCurrentMonth.getDate() - 1);

let firstDayOfPreviousMonth = new Date(lastDayOfPreviousMonth.getFullYear(), lastDayOfPreviousMonth.getMonth(), 1);




// homepage
app.get("/today", async (req, res) => {
    const expenses = await Expense.find({ date: { $gte: todayStart, $lte: today }}).sort({ createdAt: -1 })
    res.json(expenses);
}); 

app.get("/week", async (req, res) => {
    const expenses = await Expense.find({ date: { $gte: week, $lte: today }}).sort({ createdAt: -1 })
    res.json(expenses);
}); 

app.get("/total", async (req, res) => {
    const expenses = await Expense.find().sort({ createdAt: -1 })
    res.json(expenses);
}); 

app.get("/lastweek", async (req, res) => {
    const expenses = await Expense.find({ date: { $gte: lastWeekStart, $lte: week }}).sort({ createdAt: -1 })
    res.json(expenses);
}); 
app.get("/month", async (req, res) => {
    const expenses = await Expense.find({ date: { $gte: month, $lte: today }}).sort({ createdAt: -1 })
    res.json(expenses);
}); 
app.get("/lastmonth", async (req, res) => {
    const expenses = await Expense.find({ createdAt: { $gte: firstDayOfPreviousMonth, $lte: lastDayOfPreviousMonth }}).sort({ createdAt: -1 })
    res.json(expenses);
}); 

app.get("/food", async (req, res) => {
    const expenses = await Expense.find({ category: "Food"}).sort({ createdAt: -1 })
    res.json(expenses);
}); 

app.get("/travel", async (req, res) => {
    const expenses = await Expense.find({ category: "Travel"}).sort({ createdAt: -1 })
    res.json(expenses);
});

app.get("/grocery", async (req, res) => {
    const expenses = await Expense.find({ category: "Grocery"}).sort({ createdAt: -1 })
    res.json(expenses);
});

app.get("/flat", async (req, res) => {
    const expenses = await Expense.find({ category: "Flat"}).sort({ createdAt: -1 })
    res.json(expenses);
});

app.get("/personal", async (req, res) => {
    const expenses = await Expense.find({ category: "Personal"}).sort({ createdAt: -1 })
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

// to get add page

// app.post("/add", async(req, res) => {
//     const expenses = new Expense(req.body);
//     await expenses.save();
//     res.status(200).redirect('/');
// })

// edit page
// app.get("/:id", async(req, res) => {
//     const expenses = await Expense.findById(req.params.id);
//     res.json({ expenses });
// })
// app.put("/:id", async(req, res) => {
//     await Expense.findByIdAndUpdate(req.params.id, req.body,{ new: true, runValidators: true });
//     res.status(200).redirect('/');
// })

// deletebyid
app.delete("/:id", async(req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
})

// const datedata = Expense.find({ date: "2024-06-12T00:00:00.000+00:00" });
// { date: { $gte: "2024-06-24T00:00:00.000+00:00", $lte: "2024-07-02T00:00:00.000+00:00" }}
// .sort({ createdAt: -1 })

app.listen(5000, () => {
    console.log(`This Server in running on http://localhost:5000`);
} )