import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ref, update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { StartFirebase } from "../../public/fireBaseConfig";
import Dnavbar from "../components/DnabBar";
import Overview from "./overview";
import AddEvent from './addevent';
import AllEvents from './allevents';
import Users from './users';
import ContactMessages from './contactMessage';

const DashBoard = () => {
    const { database } = StartFirebase();
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
                fullName: data[key].fullName,
                active: data[key].active
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

    const handleAddEvent = async (eventData) => {
        const newEvent = {
            title: eventData.title,
            description: eventData.description,
            date: eventData.date,
            location: eventData.location,
            tickets: {
                general: {
                    GPrice: eventData.GPrice,
                    GAvailability: eventData.GAvailability
                },
                vip: {
                    VPrice: eventData.VPrice,
                    VAvailability: eventData.VAvailability
                }
            },
            imageUrl: '' 
        };

        try {
            await axios.post('https://sportstest-cce07-default-rtdb.firebaseio.com/events.json', newEvent);
            alert('Event added successfully!');
            fetchEvents();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleUpdateEvent = async (eventData) => {
        const updatedEvent = {
            title: eventData.title,
            description: eventData.description,
            date: eventData.date,
            location: eventData.location,
            tickets: {
                general: {
                    GPrice: eventData.GPrice,
                    GAvailability: eventData.GAvailability
                },
                vip: {
                    VPrice: eventData.VPrice,
                    VAvailability: eventData.VAvailability
                }
            },
        };

        try {
            await axios.put(`https://sportstest-cce07-default-rtdb.firebaseio.com/events/${editEventId}.json`, updatedEvent);
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

    const handleActivateUser = async (userId) => {
        try {
            const userRef = ref(database, `users/${userId}`);
            await update(userRef, { active: true });
            alert('User has been activated');
            fetchUsers();
        } catch (error) {
            console.error('Error activating user:', error);
        }
    };

    const handleDeactivateUser = async (userId) => {
        try {
            const userRef = ref(database, `users/${userId}`);
            await update(userRef, { active: false });
            alert('User has been deactivated');
            fetchUsers();
        } catch (error) {
            console.error('Error deactivating user:', error);
        }
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

    return (
        <>
            <Dnavbar />
            <div className="min-h-screen bg-gray-900 text-white ml-14">
                <div className="p-6">
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                    </div>

                    <Overview />

                    <AllEvents
                        events={filteredEvents}
                        onEdit={handleEditEvent}
                        onDelete={handleSoftDeleteEvent}
                    />

                    <AddEvent
                        editMode={editMode}
                        eventData={{
                            title,
                            description,
                            date,
                            location,
                            GPrice,
                            VPrice,
                            GAvailability,
                            VAvailability
                        }}
                        onSubmit={editMode ? handleUpdateEvent : handleAddEvent}
                    />

                    <Users
                        users={users}
                        onActivate={handleActivateUser}
                        onDeactivate={handleDeactivateUser}
                    />
                    
                    <ContactMessages />
                </div>
            </div>
        </>
    );
};

export default DashBoard;
