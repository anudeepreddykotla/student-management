const express = require('express');
const connectDB = require('./DB/ConnectToDB.js');
const studentRoutes = require('./Routes/StudentRoutes.js');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

connectDB();

app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));