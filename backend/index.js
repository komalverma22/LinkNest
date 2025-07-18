require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require('./generated/prisma');
const app = express();
const prisma = new PrismaClient();
const Port = process.env.PORT||3000;
const path=require("path")

//  Middlewares
app.use(cors({
  origin: true, 
  credentials: true
}));
app.use(express.json());
app.use('/converted', express.static(path.join(__dirname, 'converted')));

//  Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);


app.get("/check", function (req, res) {
    console.log("checked, everything is working fine");
    res.send("checking the server");
});


app.listen(Port, () => {
    console.log(`server is running at Port ${Port}`);
});
