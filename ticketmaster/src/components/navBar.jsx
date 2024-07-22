import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StartFirebase } from "../../public/fireBaseConfig"; // Ensure Firebase is initialized here
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';

const Navbar = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Initialize Firebase
        StartFirebase(); // Ensure this initializes Firebase correctly

        // Check session storage for userId
        const storedUserId = sessionStorage.getItem('userId');
        setUserId(storedUserId);

        // Check authentication status
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Update session storage and state if user is logged in
                sessionStorage.setItem('userId', currentUser.uid);
                setUserId(currentUser.uid);
            } else {
                // Clear session storage and state if user is logged out
                sessionStorage.removeItem('userId');
                setUserId(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleAuthClick = (event) => {
        event.preventDefault(); // Prevent default anchor behavior

        const auth = getAuth();
        if (userId) {
            // If the user is logged in, sign them out
            signOut(auth).then(() => {
                console.log('User signed out');
                // Clear session storage and update state
                sessionStorage.removeItem('userId');
                setUserId(null);
                // Optionally redirect to home or another page
                window.location.href = '/'; // Adjust as needed
            }).catch((error) => {
                console.error('Sign out error', error);
            });
        } else {
            // If the user is not logged in, redirect to login page
            window.location.href = '/login'; // Adjust as needed
        }
    };

    return (
        <header className="sticky  inset-0 z-50 border-b border-slate-100 bg-white/10 backdrop-blur-lg">
            <nav className="mx-auto flex w-[100%] h-20 gap-8 px-6 transition-all duration-200 ease-in-out py-1">
                <div className="relative flex items-center w-[25%]">
                    <a href="/">
                        <img src="https://www.svgrepo.com/show/499831/target.svg" loading="lazy" style={{ color: 'transparent' }} width="45" height="45" alt="Logo" />
                    </a>
                </div>
                <ul className="hidden w-[50%] items-center  justify-center gap-6 md:flex">
                    <li className="pt-1.5 font-dm text-xl font-medium text-grey">
                        <Link to="/catalog">Home</Link>
                    </li>
                    <li className="pt-1.5 font-dm text-xl font-medium text-grey">
                        <Link to="/catalog">Events</Link>
                    </li>
                    <li className="pt-1.5 font-dm text-xl font-medium text-grey">
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className="pt-1.5 font-dm text-xl font-medium text-grey">
                        <Link to="/contactus">Support</Link>
                    </li>
                </ul>
                <div className="flex-grow"></div>
                <div className="hidden w-[25%] items-center justify-end gap-6 md:flex">
                    <a
                        href="#"
                        onClick={handleAuthClick}
                        className="rounded-md bg-green-600 px-3 py-1.5 font-semibold text-xl font-medium text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                    >
                        {userId ? 'Log out' : 'Log in'}
                    </a>
                </div>
                <div className="relative flex items-center justify-center md:hidden">
                    <button type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-6 w-auto text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
