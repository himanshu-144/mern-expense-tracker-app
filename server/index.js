const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser')
const morgan = require('morgan')
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRouter");
const transactionRoutes = require("./routes/transactionRouter")
const path = require("path");
dotenv.config();
connectDB();

const PORT = process.env.PORT || 8000

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//auth router
app.use("/api/v1/auth", authRoutes)

//transaction router
app.use("/api/v1/transaction", transactionRoutes);


// --------------------deployment------------------------
const __dirname2 = path.resolve();

app.use(express.static(path.join(__dirname2, "/client/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname2, "client", "dist", "index.html"));
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`.yellow.bold);
})

