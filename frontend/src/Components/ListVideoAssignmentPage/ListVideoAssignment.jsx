import React, { useState } from 'react';
import './ListVideoAssignment.css';
import { useNavigate } from 'react-router-dom';

const ListVideoAssignments = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentUserNumber, setCurrentUserNumber] = useState('');
  const [score, setScore] = useState('');

  const navigate = useNavigate();

  const assignments = [
    { id: 1, title: 'Assignment 1' },
    { id: 2, title: 'Assignment 2' },
    { id: 3, title: 'Assignment 3' },
  ];

  const submissions = {
    1: [
      { url: 'http://submission1.com', userNumber: '12345678' },
      { url: 'http://submission2.com', userNumber: '87654321' },
    ],
    2: [
      { url: 'http://submission3.com', userNumber: '23456789' },
      { url: 'http://submission4.com', userNumber: '98765432' },
    ],
    3: [
      { url: 'http://submission5.com', userNumber: '34567890' },
      { url: 'http://submission6.com', userNumber: '09876543' },
    ],
  };

  const handleSignOut = () => {
    navigate('/login');
  };

  const handleGoToListAssignments = () => {
    navigate('/list-assignments');
  };

  const handleReviewClick = (userNumber) => {
    setCurrentUserNumber(userNumber);
    setShowModal(true);
    setScore('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReviewText('');
    setScore('');
  };

  const handleReviewSubmit = () => {
    console.log(`Review for user ${currentUserNumber}: ${reviewText}, Score: ${score}`);
    handleCloseModal();
  };

  return (
    <div className="video-assignments-container">
      {/* Header */}
      <div className="header">
        <h1>HMS</h1>
        <div>
          <button className="btn-goto-assignments" onClick={handleGoToListAssignments} style={{ marginRight: '10px' }}>
            Go to Assignments
          </button>
          <button className="btn-signout" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Content area including assignments and submissions */}
      <div className="content-with-header">
        <div className="assignments-list">
          <h2>Assignments</h2>
          <ul>
            {assignments.map((assignment) => (
              <li
                key={assignment.id}
                className="assignment-item"
                onClick={() => setSelectedAssignment(assignment.id)}
              >
                {assignment.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="submissions-section">
          {selectedAssignment ? (
            <>
              <h3>Submissions for {assignments.find(a => a.id === selectedAssignment).title}</h3>
              <ul>
                {submissions[selectedAssignment].map(({ url, userNumber }, index) => (
                  <li key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                    <span style={{ marginLeft: '10px' }}>{userNumber}</span>
                    <button onClick={() => handleReviewClick(userNumber)}>Review</button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Please select an assignment to view submissions.</p>
          )}
        </div>
      </div>

      {/* Modal for reviews */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h3>Review for User: {currentUserNumber}</h3>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Enter your review here..."
            />
            <div>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Enter score (%)"
                style={{ width: '100px', marginRight: '10px' }}
              />
              <span>%</span>
            </div>
            <button onClick={handleReviewSubmit}>Submit Review</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListVideoAssignments;
