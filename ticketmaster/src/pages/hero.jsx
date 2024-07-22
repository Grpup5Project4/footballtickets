import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';

const Hero = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Initialize Firebase
        // Ensure Firebase is initialized correctly in your application

        // Check authentication status
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
            <div className="absolute inset-0">
                <img 
                    src="https://images8.alphacoders.com/355/thumb-1920-355962.jpg" 
                    alt="Background Image" 
                    className="object-cover object-center w-full h-full" 
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
                <h1 className="text-3xl font-bold leading-tight mb-4">
                    Book now and be part of the roar of the crowd!
                </h1>
                
                {user ? (
                    <p className="text-lg text-gray-300 mb-8"></p>
                ) : (
                    <Link 
                        to="/signup" 
                        className="rounded-md bg-green-600 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                    >
                        Sign Up
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Hero;
