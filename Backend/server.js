// Load environment variables immediately
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const pool = require('./db/db.config'); // This connects MySQL and creates the table
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware & CORS Setup ---
app.use(
  cors({
    origin: '*', // Allows requests from ANY origin (including 'null' and 'file://')
    methods: 'POST,GET', // Added GET since your admin page uses GET
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Define Routes ---
app.use('/api/contact', contactRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
