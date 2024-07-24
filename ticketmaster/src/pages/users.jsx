import React from 'react';

const Users = ({ users, onActivate, onDeactivate }) => {
    return (
        <div id="users" className="bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 border border-gray-700">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-700 text-left text-white">Email</th>
                            <th className="px-4 py-2 border-b border-gray-700 text-left text-white">Full Name</th>
                            <th className="px-4 py-2 border-b border-gray-700 text-left text-white">Status</th>
                            <th className="px-4 py-2 border-b border-gray-700 text-left text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-4 py-2 border-b border-gray-700 text-white">{user.email}</td>
                                <td className="px-4 py-2 border-b border-gray-700 text-white">{user.fullName}</td>
                                <td className="px-4 py-2 border-b border-gray-700 text-white">
                                    {user.active ? 'Active' : 'Inactive'}
                                </td>
                                <td className="px-4 py-2 border-b border-gray-700">
                                    {user.active ? (
                                        <button
                                            onClick={() => onDeactivate(user.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg"
                                        >
                                            Deactivate
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onActivate(user.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded-lg"
                                        >
                                            Activate
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
