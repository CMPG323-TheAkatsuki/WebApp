const express = require('express');
const router = express.Router();
//const express = require('express');
const mongoose = require('mongoose');
const Submission = require('../models/submission.model'); // Importing the Submission model
const Assignment = require('../models/assignment.model'); // Make sure this is correctly imported
const User = require('../models/user.model'); // Adjust the path if necessary



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

// Middleware to check if the student is the owner of the submission
async function isSubmissionOwner(req, res, next) {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        // Check if the submitter is the user making the request
        if (submission.submitter_id.toString() === req.user.id || req.user.role === 'admin') {
            next(); // Allow if the user is the owner or admin
        } else {
            res.status(403).json({ message: 'Access denied: you do not own this submission' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all submissions (admin only)
router.get('/', authorizeRoles('admin'), async (req, res) => {
    try {
        const submissions = await Submission.find().populate('assignment_id').populate('submitter_id');
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/Student/Me', authorizeRoles('student'), async (req, res) => {
    try {
        // Find all submissions made by the logged-in student
        const submissions = await Submission.find({ submitter_id: req.user.user_number })
            .populate('assignment_id'); // No need to populate submitter_id as it's the same as req.user

        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found for this student' });
        }

        // Return the submissions
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route for lecturers to get submissions related to their assignments
router.get('/Lecturer/Me', authorizeRoles('lecturer'), async (req, res) => {
    try {
        // Find assignments related to the logged-in lecturer
        const assignments = await Assignment.find({ lecturer_id: req.user.user_number });

        if (assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for this lecturer' });
        }

        const assignmentIds = assignments.map(assignment => assignment._id); // Get assignment ObjectIds

        // Find submissions related to the assignments
        const submissions = await Submission.find({ assignment_id: { $in: assignmentIds } });

        // Optionally, if you want to add user info, do a manual lookup:
        const userNumbers = submissions.map(submission => submission.submitter_id); // Collect all submitter_ids
        const users = await User.find({ user_number: { $in: userNumbers } }); // Fetch users based on submitter_ids

        // Map to create a readable response
        const result = submissions.map(submission => ({
            ...submission.toObject(),
            submitter: users.find(user => user.user_number === submission.submitter_id) // Attach user info
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching assignments and submissions:", error);
        res.status(500).json({ message: error.message });
    }
});




// Get a specific submission by ID (accessible by owner and admin)
router.get('/:id', authorizeRoles('admin', 'student', 'lecturer'), async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id)
            .populate('assignment_id')
            .populate('submitter_id');

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        const assignment = submission.assignment_id;

        // Check if the logged-in user is a lecturer
        if (req.user.role === 'lecturer') {
            // Ensure the lecturer can only view submissions linked to their own assignments
            if (assignment.lecturer_id !== req.user.user_number) {
                return res.status(403).json({ message: "You are not authorized to view this submission" });
            }
        }

        // If the user is authorized, return the submission
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Add a new submission (students only)
router.post('/add', authorizeRoles('student'), async (req, res) => {
    try {
        const { assignment_id, videoUrl, videoFileName, videoFileType, videoSize } = req.body;

        // Check if the assignment exists
        const assignment = await Assignment.findById(assignment_id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        // Ensure submitter_id is taken from the logged-in user's user_number
        const submitter_id = req.user.user_number;

        // Create a new submission with the logged-in user's user_number as submitter_id
        const submission = new Submission({
            assignment_id: new mongoose.Types.ObjectId(assignment_id), // Use 'new' keyword for ObjectId
            videoUrl,
            videoFileName,
            videoFileType,
            videoSize,
            submitter_id // Automatically use the logged-in student's user_number as submitter_id
        });

        // Save the submission to the database
        await submission.save();

        res.status(201).json(submission); // Return the newly created submission
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Update a submission by ID (accessible by owner and admin)
router.put('/update/:id', authorizeRoles('admin', 'student'), isSubmissionOwner, async (req, res) => {
    try {
        const { assignment_id, videoUrl, videoFileName, videoFileType, videoSize } = req.body;

        const submission = await Submission.findByIdAndUpdate(
            req.params.id,
            { assignment_id, videoUrl, videoFileName, videoFileType, videoSize },
            { new: true, runValidators: true }
        );

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a submission by ID (admin only)
router.delete('/delete/:id', authorizeRoles('admin', 'student'), async (req, res) => {
    try {
        const submission = await Submission.findByIdAndDelete(req.params.id);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        res.status(200).json({ message: 'Submission deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
