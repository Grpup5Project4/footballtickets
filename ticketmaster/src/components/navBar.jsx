import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StartFirebase } from "../../public/fireBaseConfig"; // Ensure Firebase is initialized here
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';

const Navbar = () => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        // Initialize Firebase
        StartFirebase(); // Ensure this initializes Firebase correctly
        
        // Check authentication status
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleAuthClick = (event) => {
        event.preventDefault(); // Prevent default anchor behavior

        const auth = getAuth();
        if (user) {
            // If the user is logged in, sign them out
            signOut(auth).then(() => {
                console.log('User signed out');
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
        <header className="sticky inset-0 z-50 border-b border-slate-100 bg-white/10 backdrop-blur-lg">
            <nav className="mx-auto flex max-w-6xl gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-1">
                <div className="relative flex items-center">
                    <a href="/">
                        <img src="https://www.svgrepo.com/show/499831/target.svg" loading="lazy" style={{ color: 'transparent' }} width="32" height="32" alt="Logo" />
                    </a>
                </div>
                <ul className="hidden items-center justify-center gap-6 md:flex">
                    <li className="pt-1.5 font-dm text-sm font-medium text-grey">
                        <Link to="/catalog">Events</Link>
                    </li>
                    <li className="pt-1.5 font-dm text-sm font-medium text-grey">
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className="pt-1.5 font-dm text-sm font-medium text-grey">
                        <Link to="/contactus">Contact Us</Link>
                    </li>
                </ul>
                <div className="flex-grow"></div>
                <div className="hidden items-center justify-center gap-6 md:flex">
                    <a
                        href="#"
                        onClick={handleAuthClick}
                        className="rounded-md bg-green-600 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                    >
                        {user ? 'Log out' : 'Log in'}
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
