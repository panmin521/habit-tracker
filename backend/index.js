require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || process.env.MONGO_URI);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/habits', require('./routes/habits'));

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
