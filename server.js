const express = require('express');
const { connectToDatabase } = require('./database/Db');
require('dotenv').config();
const app = express();
const cors = require('cors');
const superAdminRoutes = require('./routes/superAdminRoute');
const AdminRoute = require('./routes/adminRoute')


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;
// app.use('/', (req, res) => {
//     res.send('Hello, World! bhai');
// })


app.use("/superadmin" , superAdminRoutes);
app.use("/admin",AdminRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Server running on port: ${PORT}`);
});

connectToDatabase();