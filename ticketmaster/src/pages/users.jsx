// src/components/Users.js
import React from 'react';

const Users = ({ users, onDelete }) => {
    return (
        <div id="users" className="bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            <table className="min-w-full bg-gray-800 border border-gray-700">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b border-gray-700 text-left">Email</th>
                        <th className="px-4 py-2 border-b border-gray-700 text-left">Full Name</th>
                        <th className="px-4 py-2 border-b border-gray-700 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-4 py-2 border-b border-gray-700">{user.email}</td>
                            <td className="px-4 py-2 border-b border-gray-700">{user.fullName}</td>
                            <td className="px-4 py-2 border-b border-gray-700">
                                <button
                                    onClick={() => onDelete(user.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
