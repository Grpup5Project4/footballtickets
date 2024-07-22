// src/components/AllEvents.js
import React from 'react';

const AllEvents = ({ events, onEdit, onDelete }) => {
    return (
        <div id="event-list" className="bg-gray-800 shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Event List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.length === 0 ? (
                    <p>No events to display.</p>
                ) : (
                    events.map((event) => (
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
                                        onClick={() => onEdit(event)}
                                        className="bg-green-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(event.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg"
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
    );
};

export default AllEvents;
