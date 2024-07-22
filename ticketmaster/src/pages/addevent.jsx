// src/components/AddEvent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEvent = ({ editMode, eventData, onSubmit }) => {
    const [title, setTitle] = useState(eventData?.title || '');
    const [description, setDescription] = useState(eventData?.description || '');
    const [date, setDate] = useState(eventData?.date || '');
    const [location, setLocation] = useState(eventData?.location || '');
    const [GPrice, setGPrice] = useState(eventData?.GPrice || 0);
    const [VPrice, setVPrice] = useState(eventData?.VPrice || 0);
    const [GAvailability, setGAvailability] = useState(eventData?.GAvailability || 0);
    const [VAvailability, setVAvailability] = useState(eventData?.VAvailability || 0);

    useEffect(() => {
        if (eventData) {
            setTitle(eventData.title);
            setDescription(eventData.description);
            setDate(eventData.date);
            setLocation(eventData.location);
            setGPrice(eventData.GPrice);
            setVPrice(eventData.VPrice);
            setGAvailability(eventData.GAvailability);
            setVAvailability(eventData.VAvailability);
        }
    }, [eventData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, date, location, GPrice, VPrice, GAvailability, VAvailability });
    };

    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Event' : 'Add Event'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="mb-4">
                    <label className="block">Event Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Event Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 block w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">G & V Price:</label>
                    <div className="flex space-x-4">
                        <input
                            type="number"
                            value={GPrice}
                            onChange={(e) => setGPrice(e.target.value)}
                            className="w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm"
                            placeholder="General Price"
                        />
                        <input
                            type="number"
                            value={VPrice}
                            onChange={(e) => setVPrice(e.target.value)}
                            className="w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm"
                            placeholder="VIP Price"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block">G & V Availability:</label>
                    <div className="flex space-x-4">
                        <input
                            type="number"
                            value={GAvailability}
                            onChange={(e) => setGAvailability(e.target.value)}
                            className="w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm"
                            placeholder="General Availability"
                        />
                        <input
                            type="number"
                            value={VAvailability}
                            onChange={(e) => setVAvailability(e.target.value)}
                            className="w-full border border-gray-700 rounded-md bg-gray-700 text-white shadow-sm"
                            placeholder="VIP Availability"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    {editMode ? 'Update Event' : 'Add Event'}
                </button>
            </form>
        </div>
    );
};

export default AddEvent;
