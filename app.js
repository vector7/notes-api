const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./routes/notes');
const connectDB = require('./config/db');

connectDB();
app.use(express.json());
app.use('/api/notes', router);

app.get('/', (req, res) => {
  res.send('Welcome to the Notes API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
