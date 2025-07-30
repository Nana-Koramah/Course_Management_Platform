const express = require('express');
require('dotenv').config();
const sequelize = require('./config/db');
const User = require('./models/user.model');
const authRoutes = require('./routes/auth.routes');
const allocationRoutes = require('./routes/allocation.routes');
const moduleRoutes = require('./routes/module.routes');
const facilitatorRoutes = require('./routes/facilitator.routes');
const classRoutes = require('./routes/class.routes');
const modeRoutes = require('./routes/mode.routes');
const cohortRoutes = require('./routes/cohort.routes');  
const studentRoutes = require('./routes/student.routes');  
const managerRoutes = require('./routes/manager.routes');   
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/allocations', allocationRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/facilitators', facilitatorRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/modes', modeRoutes);
app.use('/api/cohorts', cohortRoutes);     
app.use('/api/students', studentRoutes);   
app.use('/api/managers', managerRoutes); 

app.get('/', (req, res) => res.send('API is running'));

// Sync DB and export app
sequelize.sync().then(() => console.log('DB connected'));
module.exports = app;
