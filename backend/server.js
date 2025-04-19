const express = require('express');
const connectDB = require('./DB/ConnectToDB.js');
const studentRoutes = require('./Routes/StudentRoutes.js');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

connectDB();

app.use('/students', studentRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));