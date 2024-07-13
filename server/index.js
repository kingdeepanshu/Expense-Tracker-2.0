// const express = require("express");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override');
// const path = require('path');
// const cors = require('cors');
// require('dotenv').config();
// const joi = require('joi');
// const passwordComplexity = require('joi-password-complexity');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// app.use(methodOverride());

// // MongoDB connection
// mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Database connected"))
//     .catch(err => console.log("Database connection error: ", err));

// // User Schema and Model
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// }, { timestamps: true });

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ id: this._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '30d' });
//     return token;
// };

// const User = mongoose.model("User", userSchema);

// // Expense Schema and Model
// const expenseSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     description: { type: String, required: true },
//     amount: { type: Number, required: true },
//     date: { type: Date, required: true },
//     category: { type: String, required: true }
// }, { timestamps: true });

// const Expense = mongoose.model("Expense", expenseSchema);

// const validateUser = (data) => {
//     const schema = joi.object({
//         username: joi.string().required().label('Username'),
//         email: joi.string().email().required().label('Email'),
//         password: passwordComplexity().required().label('Password'),
//     });
//     return schema.validate(data);
// };

// const validateAuth = (data) => {
//     const schema = joi.object({
//         email: joi.string().email().required().label('Email'),
//         password: joi.string().required().label('Password'),
//     });
//     return schema.validate(data);
// };

// app.post('/api/signin', async (req, res) => {
//     try {
//         const { error } = validateUser(req.body);
//         if (error) return res.status(400).json({ message: error.details[0].message });

//         const existingUser = await User.findOne({ email: req.body.email });
//         if (existingUser) return res.status(409).json({ message: 'User already exists' });

//         const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);

//         const newUser = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: hashedPassword,
//         });

//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// app.post('/api/login', async (req, res) => {
//     try {
//         const { error } = validateAuth(req.body);
//         if (error) return res.status(400).json({ message: error.details[0].message });

//         const user = await User.findOne({ email: req.body.email });
//         if (!user) return res.status(400).json({ message: 'Invalid email or password' });

//         const validPassword = await bcrypt.compare(req.body.password, user.password);
//         if (!validPassword) return res.status(401).json({ message: 'Invalid email or password' });

//         const token = user.generateAuthToken();
//         res.status(200).json({ data: token, message: 'Logged in successfully' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Middleware for protecting routes
// const protect = async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             console.error(error);
//             return res.status(401).json({ message: 'Not authorized, token failed' });
//         }
//     }

//     if (!token) {
//         return res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };

// // Get Expenses
// app.get('/api/expenses', protect, async (req, res) => {
//     const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
//     res.json(expenses);
// });

// // Add Expense
// app.post('/api/expenses', protect, async (req, res) => {
//     const { description, amount, date, category } = req.body;
//     const expense = new Expense({
//         user: req.user._id,
//         description,
//         amount,
//         date,
//         category
//     });
//     const createdExpense = await expense.save();
//     res.status(201).json(createdExpense);
// });

// // Various Expense Query Routes
// const expenseQueryRoutes = [
//     { path: "/today", query: (today) => ({ $gte: new Date(today.setUTCHours(0, 0, 0, 0)), $lte: new Date(today.setUTCHours(23, 59, 59, 999)) }) },
//     { path: "/week", query: (today) => ({ $gte: new Date(today.setDate(today.getUTCDate() - 6)), $lte: new Date() }) },
//     { path: "/lastweek", query: (today) => {
//         const week = new Date(today);
//         week.setDate(today.getUTCDate() - 7);
//         return { $gte: new Date(week.setDate(week.getUTCDate() - 7)), $lte: week };
//     }},
//     { path: "/month", query: (today) => ({ $gte: new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)), $lte: new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999)) }) },
//     { path: "/lastmonth", query: (today) => {
//         return { $gte: new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1)), $lte: new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0, 23, 59, 59, 999)) };
//     }},
// ];

// expenseQueryRoutes.forEach(route => {
//     app.get(route.path, protect, async (req, res) => {
//         const today = new Date();
//         const expenses = await Expense.find({ user: req.user._id, date: route.query(today) }).sort({ date: -1 });
//         res.json(expenses);
//     });
// });

// // Category-based Expense Query Routes
// const categoryRoutes = ["food", "travel", "grocery", "flat", "personal"];
// categoryRoutes.forEach(category => {
//     app.get(`/${category}`, protect, async (req, res) => {
//         const expenses = await Expense.find({ user: req.user._id, category }).sort({ date: -1 });
//         res.json(expenses);
//     });
// });

// app.get("/total", protect, async (req, res) => {
//     const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
//     res.json(expenses);
// });

// app.post("/add", protect, async (req, res) => {
//     const expenses = new Expense({ ...req.body, user: req.user._id });
//     await expenses.save();
//     res.status(201).json(expenses);
// });

// app.get("/:id", protect, async (req, res) => {
//     const expenses = await Expense.findById(req.params.id);
//     res.json(expenses);
// });

// app.put("/:id", protect, async (req, res) => {
//     await Expense.findByIdAndUpdate(req.params.id, req.body);
//     res.send("Updated Successfully");
// });

// app.delete("/:id", protect, async (req, res) => {
//     await Expense.findByIdAndDelete(req.params.id);
//     res.send("Deleted Successfully");
// });

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));

//     app.get('*', (req, res) =>
//         res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
//     );
// }

// app.listen(5002, () => {
//     console.log(`Server running on http://localhost:5002`);
// });


const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride());

// MongoDB connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Database connection error: ", err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '30d' });
    return token;
};

const User = mongoose.model("User", userSchema);

// Expense Schema and Model
const expenseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true }
}, { timestamps: true });

const Expense = mongoose.model("Expense", expenseSchema);

const validateUser = (data) => {
    const schema = joi.object({
        username: joi.string().required().label('Username'),
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    });
    return schema.validate(data);
};

const validateAuth = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label('Email'),
        password: joi.string().required().label('Password'),
    });
    return schema.validate(data);
};

app.post('/api/signin', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(409).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { error } = validateAuth(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Invalid email or password' });

        const token = user.generateAuthToken();
        res.status(200).json({ data: token, message: 'Logged in successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Middleware for protecting routes
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Get Expenses
app.get('/', protect, async (req, res) => {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.json(expenses);
});

// Add Expense
app.post('/add', protect, async (req, res) => {
    const { description, amount, date, category } = req.body;
    const expense = new Expense({
        user: req.user._id,
        description,
        amount,
        date,
        category
    });
    const createdExpense = await expense.save();
    res.status(201).json(createdExpense);
});

// Various Expense Query Routes
const expenseQueryRoutes = [
    { path: "/today", query: (today) => ({ $gte: new Date(today.setUTCHours(0, 0, 0, 0)), $lte: new Date(today.setUTCHours(23, 59, 59, 999)) }) },
    { path: "/week", query: (today) => ({ $gte: new Date(today.setDate(today.getUTCDate() - 6)), $lte: new Date() }) },
    { path: "/lastweek", query: (today) => {
        const week = new Date(today);
        week.setDate(today.getUTCDate() - 7);
        return { $gte: new Date(week.setDate(week.getUTCDate() - 7)), $lte: week };
    }},
    { path: "/month", query: (today) => ({ $gte: new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)), $lte: new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999)) }) },
    { path: "/lastmonth", query: (today) => {
        return { $gte: new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1)), $lte: new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0, 23, 59, 59, 999)) };
    }},
];

expenseQueryRoutes.forEach(route => {
    app.get(route.path, protect, async (req, res) => {
        const today = new Date();
        const expenses = await Expense.find({ user: req.user._id, date: route.query(today) }).sort({ date: -1 });
        res.json(expenses);
    });
});

// Category-based Expense Query Routes
const categoryRoutes = ["food", "travel", "grocery", "flat", "personal"];
categoryRoutes.forEach(category => {
    app.get(`/${category}`, protect, async (req, res) => {
        const expenses = await Expense.find({ user: req.user._id, category }).sort({ date: -1 });
        res.json(expenses);
    });
})

app.get("/total", protect, async (req, res) => {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.json(expenses);
});

app.post("/add", protect, async (req, res) => {
    const expenses = new Expense({ ...req.body, user: req.user._id });
    await expenses.save();
    res.status(201).json(expenses);
});

app.get("/:id", protect, async (req, res) => {
    const expenses = await Expense.findById(req.params.id);
    res.json(expenses);
});

app.put("/:id", protect, async (req, res) => {
    await Expense.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated Successfully");
});

app.delete("/:id", protect, async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.send("Deleted Successfully");
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    );
}

app.listen(5002, () => {
    console.log(`Server running on http://localhost:5002`);
});
