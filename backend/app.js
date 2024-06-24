const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
require('dotenv').config();
require('./config/db');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

module.exports = app;
