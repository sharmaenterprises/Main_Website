const express = require('express');
const router = express.Router();
const pool = require('../db/db.config'); // Import the MySQL connection pool

// @route   POST /api/contact
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, projectType, message } = req.body;

        if (!name || !email || !phone || !projectType) {
            return res.status(400).json({ success: false, msg: 'All required fields must be filled.' });
        }

        const query = `
            INSERT INTO contact_submissions (name, email, phone, project_type, message)
            VALUES (?, ?, ?, ?, ?); 
        `; // MySQL uses '?' as placeholders
        const values = [name, email, phone, projectType, message];

        // Execute the SQL INSERT statement
        await pool.query(query, values); 

        res.status(201).json({ 
            success: true, 
            msg: 'Thank you! Your query has been successfully submitted to MySQL.' 
        });

    } catch (err) {
        console.error("Submission Error:", err.message);
        res.status(500).json({ 
            success: false, 
            msg: 'Server Error: Failed to process your request.' 
        });
    }
});
// @route   GET /api/contact
// @desc    Fetch all contact submissions for the admin page
router.get('/', async (req, res) => {
    try {
        // SQL query to select all columns from the contact_submissions table
        const query = `SELECT * FROM contact_submissions ORDER BY submission_date DESC;`;
        
        // Execute the query; the result is an array containing the rows (data)
        const [rows] = await pool.query(query);

        // Send the fetched rows as a JSON response
        res.status(200).json({ success: true, data: rows });

    } catch (err) {
        console.error("Admin Fetch Error:", err.message);
        res.status(500).json({ 
            success: false, 
            msg: 'Server Error: Could not fetch submissions.' 
        });
    }
});
module.exports = router;