const express = require('express');
const Feedback = require('../models/feedback.model.js'); // Import Feedback model
const Module = require('../models/module.model.js'); // Import Module model

const router = express.Router();

// Middleware to check for roles
function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next(); // User has the required role
        } else {
            res.status(403).json({ message: 'Access denied: insufficient permissions' });
        }
    };
}

// Route to get all feedback (accessible by admin only)
router.get('/all', authorizeRoles('admin'), async (req, res) => {
    try {
        const feedback = await Feedback.find({}); // Fetch all feedback from the database
        res.status(200).json(feedback); // Send back the feedback as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
});

// Route to get feedback for a specific module by module code (accessible by admin and student)
router.get('/module/:module', authorizeRoles('admin', 'lecturer'), async (req, res) => {
    try {
        const { module } = req.params; // Get the module code from the route parameters

        // Find all feedback related to the given module
        const feedback = await Feedback.find({ module: module })
            .populate('assignment_id', 'assignment_name description due_date'); // Populate assignment details

        if (!feedback || feedback.length === 0) {
            return res.status(404).json({ message: "No feedback found for this module" });
        }

        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get feedback for a specific student by student ID (string)
// Change the endpoint to /myfeedback
router.get('/myfeedback', authorizeRoles('admin', 'student'), async (req, res) => {
    try {
        // Get the student's user_number from the authenticated user (req.user)
        const student = req.user.user_number;

        // Find all feedback entries for the logged-in student
        const feedback = await Feedback.find({ student: student })
            .populate('assignment_id', 'assignment_name description due_date') // Populate assignment details
            .populate('module', 'module') // Populate module details (only if you want specific fields)
            .exec(); // Execute the query

        if (!feedback || feedback.length === 0) {
            return res.status(404).json({ message: "No feedback found for this student" });
        }

        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to get feedback by year level (accessible by admin only)
router.get('/year/:year_level', authorizeRoles('admin'), async (req, res) => {
    try {
        const { year_level } = req.params;
        const yearLevelInt = parseInt(year_level); // Convert year_level to integer

        // Fetch modules for the specified year level
        const modules = await Module.find({ year_level: yearLevelInt });

        if (!modules || modules.length === 0) {
            return res.status(404).json({ message: "No modules found for the specified year level" });
        }

        // Get all feedback for the modules found
        const feedback = await Feedback.find({ module: { $in: modules.map(module => module.module) } })
            .populate('assignment_id', 'assignment_name description'); // Populate assignment information

        if (!feedback || feedback.length === 0) {
            return res.status(404).json({ message: "No feedback found for this year level" });
        }

        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a specific feedback by ID (accessible by admin and student)
router.get('/:id', authorizeRoles('admin', 'student'), async (req, res) => {
    try {
        const { id } = req.params;
        
        const feedback = await Feedback.findById(id)
            .populate('assignment_id', 'assignment_name description due_date')  // Populate assignment details
            .populate('module', 'module_name'); // Populate module details

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to add feedback (accessible by admin only)
router.post('/add', authorizeRoles('admin', 'lecturer'), async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body); // Create a new feedback entry
        res.status(201).json(feedback); // Respond with the created feedback
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update feedback by ID (accessible by admin only)
router.put('/update/:id', authorizeRoles('admin', 'lecturer'), async (req, res) => {
    try {
        const { id } = req.params;

        const updatedFeedback = await Feedback.findByIdAndUpdate(id, req.body, { new: true }); // Update feedback
        
        if (!updatedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        
        res.status(200).json(updatedFeedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete feedback by ID (accessible by admin only)
router.delete('/delete/:id', authorizeRoles('admin'), async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFeedback = await Feedback.findByIdAndDelete(id);
        
        if (!deletedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        
        res.status(200).json({ message: "Feedback deleted successfully", feedback: deletedFeedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
