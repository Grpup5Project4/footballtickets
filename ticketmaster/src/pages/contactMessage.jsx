import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('https://sportstest-cce07-default-rtdb.firebaseio.com/contactmsg.json');
            const data = response.data;
            const messagesArray = Object.keys(data).map(key => ({
                id: key,
                email: data[key].email,
                message: data[key].message,
                name: data[key].name,
                timestamp: data[key].timestamp,
            }));
            setMessages(messagesArray);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Contact Messages</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 border border-gray-700">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-700 text-left text-white">Name</th>
                            <th className="px-4 py-2 border-b border-gray-700 text-left text-white">Email</th>
                            <th className="px-4 py-2 border-b border-gray-700 text-left text-white">Message</th>
                            <th className="px-4 py-2 border-b border-gray-700 text-left text-white">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message) => (
                            <tr key={message.id}>
                                <td className="px-4 py-2 border-b border-gray-700 text-white">{message.name}</td>
                                <td className="px-4 py-2 border-b border-gray-700 text-white">{message.email}</td>
                                <td className="px-4 py-2 border-b border-gray-700 text-white">{message.message}</td>
                                <td className="px-4 py-2 border-b border-gray-700 text-white">{new Date(message.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactMessages;
