require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require("./config/db")
const GuardianRoute = require("./routes/GuardianRoute")
const TeacherRoute = require("./routes/TeacherRoute")
const StudentRoute = require("./routes/StudentRoute")
const AdminRoute = require('./routes/Admin')
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDb();
app.use("/guardian",GuardianRoute)
app.use("/teacher",TeacherRoute)
app.use("/student",StudentRoute)
app.use('/admin',AdminRoute)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});