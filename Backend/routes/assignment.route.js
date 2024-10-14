const express = require('express');
const Assignment = require('../models/assignment.model.js');
const Module = require('../models/module.model.js');
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

router.get('/MyAssignments', authorizeRoles('lecturer'), async (req, res) => {
    try {
        // Find assignments where the lecturer_id matches the logged-in lecturer's user_number
        const assignments = await Assignment.find({ lecturer_id: req.user.user_number });

        if (assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for this lecturer' });
        }

        // Return the assignments
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/all', authorizeRoles('admin'), async (req, res) => {
    try {
        const assignments = await Assignment.find({});
        if (!assignments.length) {
            return res.status(404).json({ message: "No assignments found." });
        }

        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get assignments by year_level
// Route to get assignments by year_level
router.get('/year/:year_level', authorizeRoles('admin'), async (req, res) => {
    const { year_level } = req.params;

    try {
        // Find all modules associated with the specified year_level
        const modules = await Module.find({ year_level });

        if (!modules.length) {
            return res.status(404).json({ message: "No modules found for this year level." });
        }

        // Get all assignments for the modules associated with the year_level
        const moduleNames = modules.map(module => module.module); // Get module names from the modules found
        const assignments = await Assignment.find({ module: { $in: moduleNames } });

        if (!assignments.length) {
            return res.status(404).json({ message: "No assignments found for this year level." });
        }

        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get all assignments for a specific lecturer (accessible by admin and the lecturer themselves)


  

// Route to update an assignment (admin or lecturer for the specific module)
router.put('/update/:id', authorizeRoles('admin', 'lecturer'), async (req, res) => {
    try {
        const { id } = req.params;
        const { assignment_name, description, due_date, lecturer_id } = req.body; // Destructure body for optional fields

        // Find the assignment to be updated
        const assignment = await Assignment.findById(id);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // Find the module associated with the assignment
        const moduleData = await Module.findOne({ module: assignment.module });

        if (!moduleData) {
            return res.status(404).json({ message: "Module not found" });
        }

        // If the user is a lecturer, ensure they are adding the correct lecturer_id for the module
        if (req.user.role === 'lecturer') {
            if (lecturer_id !== moduleData.lecturer_id) {
                return res.status(403).json({ message: "Lecturer ID does not match the assigned lecturer for this module" });
            }
        }

        // Update the assignment fields based on what is provided
        const updateData = {};
        if (assignment_name) updateData.assignment_name = assignment_name;
        if (description) updateData.description = description;
        if (due_date) updateData.due_date = due_date;
        if (lecturer_id) updateData.lecturer_id = lecturer_id; // Optional: allow updating lecturer_id

        // Update the assignment
        const updatedAssignment = await Assignment.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedAssignment); // Respond with the updated assignment
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to delete an assignment (admin or lecturer for the specific module)
router.delete('/delete/:id', authorizeRoles('admin', 'lecturer'), async (req, res) => {
    try {
        const { id } = req.params;

        // Find the assignment to be deleted
        const assignment = await Assignment.findById(id);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // If the user is a lecturer, ensure they are deleting only their own assignment
        if (req.user.role === 'lecturer') {
            if (assignment.lecturer_id !== req.user.user_number) {
                return res.status(403).json({ message: "You are not authorized to delete this assignment" });
            }
        }

        // Delete the assignment
        const deletedAssignment = await Assignment.findByIdAndDelete(id);
        res.status(200).json({ message: "Assignment deleted successfully", assignment: deletedAssignment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
