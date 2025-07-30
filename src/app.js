const express = require('express');
require('dotenv').config();
const sequelize = require('./config/db');
const User = require('./models/user.model');
const authRoutes = require('./routes/auth.routes');
const allocationRoutes = require('./routes/allocation.routes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/allocations', allocationRoutes);

app.get('/', (req, res) => res.send('API is running'));

// Sync DB and export app
sequelize.sync().then(() => console.log('DB connected'));
module.exports = app;
