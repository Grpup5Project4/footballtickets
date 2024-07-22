import React from 'react';

function Dnavbar() {
    return (
        <>
            <div 
                id="sidebar-mini" 
                className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-20 bg-gray-900 border-e border-gray-700 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600"
            >
                <div className="flex flex-col justify-center items-center gap-y-2 py-4">
                    <div className="mb-4">
                        {/* Optional logo section */}
                    </div>

                    <div className="hs-tooltip [--placement:right] inline-block">
                        <a 
                            href="#event-list" 
                            className="hs-tooltip-toggle w-[2.375rem] mt-[9rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <svg 
                                className="flex-shrink-0 size-4" 
                                xmlns="https://cdn-icons-png.flaticon.com/128/1165/1165156.png" 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                            <span 
                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap" 
                                role="tooltip"
                            >
                                Home
                            </span>
                        </a>
                    </div>
                    <div className="hs-tooltip [--placement:right] inline-block">
                        <a 
                            href="#users" 
                            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 mt-[9rem] text-sm font-semibold rounded-full border border-transparent text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <svg 
                                className="flex-shrink-0 size-4" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            <span 
                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap" 
                                role="tooltip"
                            >
                                Users
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hs-overlay {
                    background: #1f2937; /* Dark background color */
                }

                .hs-tooltip-content {
                    background: #1f2937; /* Dark tooltip background */
                }

                .hs-tooltip-toggle:hover {
                    background-color: #374151; /* Darker hover effect */
                }

                .hs-tooltip-content.hs-tooltip-shown {
                    opacity: 1; /* Show tooltip */
                }
            `}</style>
        </>
    );
}

export default Dnavbar;
