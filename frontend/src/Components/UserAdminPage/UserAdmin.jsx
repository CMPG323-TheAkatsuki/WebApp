// src/components/UserAdminPage/UserAdmin.jsx
import React, { useEffect, useState } from 'react';
import { getAllUsers, editUser, deleteUser } from '../../services/api'; // Import the API functions
import './UserAdmin.css';

const UserAdminPage = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [userNumber, setUserNumber] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
        setUserNumber(user.user_number);
        setRole(user.role);
    };

    const handleSave = async () => {
        try {
            const updatedUser = await editUser(editingUser._id, { user_number: userNumber, role });
            setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
            setEditingUser(null);
            setUserNumber('');
            setRole('');
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

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
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.user_number}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn-edit" onClick={() => handleEdit(user)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingUser && (
                <div className="edit-form">
                    <h2>Edit User</h2>
                    <label>
                        User Number:
                        <input
                            type="text"
                            value={userNumber}
                            onChange={(e) => setUserNumber(e.target.value)}
                        />
                    </label>
                    <label>
                        Role:
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </label>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default UserAdminPage;