import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Overview = () => {
    const [userCount, setUserCount] = useState(0);
    const [eventCount, setEventCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Fetch the number of users
                const usersResponse = await axios.get('https://sportstest-cce07-default-rtdb.firebaseio.com/users.json');
                const usersData = usersResponse.data;
                setUserCount(Object.keys(usersData).length);

                // Fetch the number of events
                const eventsResponse = await axios.get('https://sportstest-cce07-default-rtdb.firebaseio.com/events.json');
                const eventsData = eventsResponse.data;
                setEventCount(Object.keys(eventsData).length);

                // Fetch the number of orders
                const ordersResponse = await axios.get('https://sportstest-cce07-default-rtdb.firebaseio.com/orders.json');
                const ordersData = ordersResponse.data;
                setOrderCount(Object.keys(ordersData).length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="p-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v9.75M12 21v-3.75M4.5 12h15M4.5 15.75h15M4.5 8.25h15"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700">Users</h3>
                    <p className="text-3xl font-bold text-gray-900">{userCount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5M3.75 6.75h16.5m-16.5 10.5h16.5"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700">Events</h3>
                    <p className="text-3xl font-bold text-gray-900">{eventCount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-red-500 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 12h13.5M5.25 6.75h13.5m-13.5 10.5h13.5"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700">Orders</h3>
                    <p className="text-3xl font-bold text-gray-900">{orderCount}</p>
                </div>
            </div>
        </div>
    );
};

export default Overview;
