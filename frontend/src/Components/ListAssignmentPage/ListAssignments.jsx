import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './ListAssignments.css';

const ListAssignments = () => {
    const [assignments, setAssignments] = useState([
        { id: 1, title: 'Assignment 1', description: 'Description for Assignment 1' },
        { id: 2, title: 'Assignment 2', description: 'Description for Assignment 2' },
        { id: 3, title: 'Assignment 3', description: 'Description for Assignment 3' },
    ]);

    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const navigate = useNavigate(); // Initialize navigate

    const handleAssignmentClick = (assignment) => {
        setSelectedAssignment(selectedAssignment?.id === assignment.id ? null : assignment);
    };

    const handleDeleteAssignment = (id) => {
        setAssignments(assignments.filter((assignment) => assignment.id !== id));
        if (selectedAssignment && selectedAssignment.id === id) {
            setSelectedAssignment(null);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddAssignment = () => {
        const newAssignment = {
            id: assignments.length + 1,
            title: formData.title,
            description: formData.description,
        };
        setAssignments([...assignments, newAssignment]);
        setFormData({ title: '', description: '' }); // Reset form
    };

    // Function to handle sign out and navigate to login page
    const handleSignOut = () => {
        // Perform any necessary sign-out logic (like clearing tokens if used)
        navigate('/login'); // Navigate to login page
    };

    // Function to navigate to ListVideoAssignments
    const handleGoToVideoAssignments = () => {
        navigate('/list-video-assignments');
    };

    return (
        <div className="assignments-container">
            <header className="assignments-header">
                <h1>HMS</h1>
                <div className="button-group">
                    <button className="btn-goto-assignments" onClick={handleGoToVideoAssignments}>
                        Go to Video Assignments
                    </button>
                    <button className="btn-signout" onClick={handleSignOut}>Sign Out</button>
                </div>
            </header>

            <div className="assignments-list-container">
                {assignments.map((assignment) => (
                    <div key={assignment.id} className="assignment-item">
                        <div 
                            onClick={() => handleAssignmentClick(assignment)}
                            className="assignment-title"
                        >
                            {assignment.title}
                        </div>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the click for the title
                                handleDeleteAssignment(assignment.id);
                            }} 
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </div>
                ))}

                {selectedAssignment && (
                    <div className="assignment-description">
                        <h3>Description:</h3>
                        <p>{selectedAssignment.description}</p>
                    </div>
                )}

                <div className="assignment-form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Assignment Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Assignment Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                    <button onClick={handleAddAssignment} className="add-button">
                        Add Assignment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListAssignments;
