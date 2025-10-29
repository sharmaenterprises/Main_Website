const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        trim: true,
        lowercase: true
    },
    phone: { 
        type: String, 
        required: [true, 'Phone number is required'],
        trim: true
    },
    projectType: { 
        type: String, 
        required: [true, 'Project type is required'],
        // Ensure only allowed values are saved
        enum: ['structure-design', 'construction', 'government-project'], 
        trim: true
    },
    message: { 
        type: String, 
        required: false, 
        default: '' 
    },
    submissionDate: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('ContactSubmission', ContactSchema);