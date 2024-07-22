
import Dnavbar from "../components/DnabBar";
import Footer from "../components/footer";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function DashBoard() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [GPrice, setGPrice] = useState(0);
    const [VPrice, setVPrice] = useState(0);
    const [GAvailability, setGAvailability] = useState(0);
    const [VAvailability, setVAvailability] = useState(0);
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [softDeletedEvents, setSoftDeletedEvents] = useState(() => {
        const saved = localStorage.getItem('softDeletedEvents');
        return saved ? JSON.parse(saved) : [];
    });
    const [softDeletedUsers, setSoftDeletedUsers] = useState(() => {
        const saved = localStorage.getItem('softDeletedUsers');
        return saved ? JSON.parse(saved) : [];
    });
    const [editMode, setEditMode] = useState(false);
    const [editEventId, setEditEventId] = useState(null);

    useEffect(() => {
        fetchUsers();
        fetchEvents();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://sportstest-cce07-default-rtdb.firebaseio.com/users.json');
            const data = response.data;
            const usersArray = Object.keys(data).map(key => ({
                id: key,
                email: data[key].email,
                fullName: data[key].fullName
            }));
            setUsers(usersArray);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await axios.get('https://sportstest-cce07-default-rtdb.firebaseio.com/events.json');
            const data = response.data;
            const eventsArray = Object.keys(data).map(key => {
                const event = data[key];
                return {
                    id: key,
                    title: event.title || '',
                    description: event.description || '',
                    date: event.date || '',
                    location: event.location || '',
                    GPrice: event.tickets?.general?.GPrice || '',
                    VPrice: event.tickets?.vip?.VPrice || '',
                    GAvailability: event.tickets?.general?.GAvailability || '',
                    VAvailability: event.tickets?.vip?.VAvailability || '',
                    Url: event.Url || 'https://via.placeholder.com/300'
                };
            });
            setEvents(eventsArray);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        const newEvent = {
            title,
            description,
            date,
            location,
            tickets: {
                general: {
                    GPrice,
                    GAvailability
                },
                vip: {
                    VPrice,
                    VAvailability
                }
            },
            imageUrl: '' // Add this if needed
        };

        try {
            await axios.post('https://sportstest-cce07-default-rtdb.firebaseio.com/events.json', newEvent);
            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');
            setGPrice(0);
            setVPrice(0);
            setGAvailability(0);
            setVAvailability(0);
            alert('Event added successfully!');
            fetchEvents();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        const updatedEvent = {
            title,
            description,
            date,
            location,
            tickets: {
                general: {
                    GPrice,
                    GAvailability
                },
                vip: {
                    VPrice,
                    VAvailability
                }
            },
            imageUrl: '' // Add this if needed
        };

        try {
            await axios.put(`https://sportstest-cce07-default-rtdb.firebaseio.com/events/${editEventId}.json`, updatedEvent);
            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');
            setGPrice(0);
            setVPrice(0);
            setGAvailability(0);
            setVAvailability(0);
            setEditMode(false);
            setEditEventId(null);
            alert('Event updated successfully!');
            fetchEvents();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleSoftDeleteEvent = (eventId) => {
        const updatedSoftDeletedEvents = [...softDeletedEvents, eventId];
        setSoftDeletedEvents(updatedSoftDeletedEvents);
        localStorage.setItem('softDeletedEvents', JSON.stringify(updatedSoftDeletedEvents));
    };

    const handleSoftDeleteUser = async (userId) => {
        const updatedSoftDeletedUsers = [...softDeletedUsers, userId];
        setSoftDeletedUsers(updatedSoftDeletedUsers);
        localStorage.setItem('softDeletedUsers', JSON.stringify(updatedSoftDeletedUsers));
    };

    const handleEditEvent = (event) => {
        setEditMode(true);
        setEditEventId(event.id);
        setTitle(event.title);
        setDescription(event.description);
        setDate(event.date);
        setLocation(event.location);
        setGPrice(event.GPrice);
        setVPrice(event.VPrice);
        setGAvailability(event.GAvailability);
        setVAvailability(event.VAvailability);
    };

    const filteredEvents = events.filter(event => !softDeletedEvents.includes(event.id));
    const filteredUsers = users.filter(user => !softDeletedUsers.includes(user.id));
/*********************************************************************************************************************************************************************** */
    return (
       <>
            <Dnavbar />
            <div className="min-h-screen bg-gray-900 text-white ml-14">
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                </div>

                <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Event' : 'Add Event'}</h2>
                    <form onSubmit={editMode ? handleUpdateEvent : handleAddEvent}>
                        <div className="mb-4">
                            <label className="block">Event Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block">Event Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block">Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block">Location:</label>
                            <input
                                type="text"
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block">G & V Price:</label>
                            <div className="flex space-x-4">
                                <input
                                    type="number"
                                    name="GPrice"
                                    value={GPrice}
                                    onChange={(e) => setGPrice(e.target.value)}
                                    className="w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                    placeholder="General Price"
                                />
                                <input
                                    type="number"
                                    name="VPrice"
                                    value={VPrice}
                                    onChange={(e) => setVPrice(e.target.value)}
                                    className="w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                    placeholder="VIP Price"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block">G & V Availability:</label>
                            <div className="flex space-x-4">
                                <input
                                    type="number"
                                    name="GAvailability"
                                    value={GAvailability}
                                    onChange={(e) => setGAvailability(e.target.value)}
                                    className="w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                    placeholder="General Availability"
                                />
                                <input
                                    type="number"
                                    name="VAvailability"
                                    value={VAvailability}
                                    onChange={(e) => setVAvailability(e.target.value)}
                                    className="w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                    placeholder="VIP Availability"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                            {editMode ? 'Update Event' : 'Add Event'}
                        </button>
                    </form>
                </div>

                <div id="event-list" className="bg-gray-800 shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Event List</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredEvents.length === 0 ? (
                            <p>No events to display.</p>
                        ) : (
                            filteredEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="relative p-4 border border-gray-700 rounded-lg bg-gray-900 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${event.Url || 'https://via.placeholder.com/300'})` }}
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                                    <div className="relative z-10 text-white">
                                        <h3 className="text-xl font-bold">{event.title}</h3>
                                        <p>{event.description}</p>
                                        <p>{event.date}</p>
                                        <p>{event.location}</p>
                                        <div className="mt-4 flex space-x-2">
                                            <button
                                                onClick={() => handleEditEvent(event)}
                                                className="bg-green-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg transition duration-300"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleSoftDeleteEvent(event.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg transition duration-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

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
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-4 py-2 border-b border-gray-700">{user.email}</td>
                                    <td className="px-4 py-2 border-b border-gray-700">{user.fullName}</td>
                                    <td className="px-4 py-2 border-b border-gray-700">
                                        <button
                                            onClick={() => handleSoftDeleteUser(user.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg transition duration-300"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
           
        </div>
        </>
    );
}

export default DashBoard;
