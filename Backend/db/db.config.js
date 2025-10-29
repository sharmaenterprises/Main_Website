const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' }); 

// Create a connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  // === ADD THIS LINE ===
  port: process.env.DB_PORT, // Read port from .env file
  // =====================
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to create the contact submissions table
const createTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS contact_submissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            project_type VARCHAR(50) NOT NULL,
            message TEXT,
            submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(query);
        console.log("✅ Contact table confirmed (or created).");
    } catch (err) {
        console.error("❌ Error creating table:", err.message);
    }
};

// Test connection and initialize table creation
pool.getConnection()
    .then(connection => {
        console.log("✅ MySQL connected successfully!");
        connection.release();
        createTable();
    })
    .catch(err => {
        console.error("❌ MySQL connection error:", err.message);
    });


module.exports = pool;