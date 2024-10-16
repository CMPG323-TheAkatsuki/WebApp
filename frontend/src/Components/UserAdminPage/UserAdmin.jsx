import React from 'react';
import './UserAdmin.css';

const UserAdminPage = () => {
    const users = [
        { id: 1, username: 'john_doe', role: 'Lecturer' },
        { id: 2, username: 'jane_smith', role: 'Admin' },
        { id: 3, username: 'student_a', role: 'Student' },
    ];

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>User Administration</h1>
                <button className="btn-add">Add User</button>
            </header>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn-edit">Edit</button>
                                <button className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserAdminPage;
