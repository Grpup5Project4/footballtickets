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
                            href="#add" 
                            className="hs-tooltip-toggle w-[2.375rem] mt-[4rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold  text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <svg 
                            
                            className="flex-shrink-0 size-4" 
                           
                            width="24" 
                            height="24" 
                
                            fill="white" 

                            
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> <path d="M336 292v24c0 6.6-5.4 12-12 
                            12h-76v76c0 6.6-5.4 12-12 12h-24c-6.6 0-12-5.4-12-12v-76h-76c-6.6 0-12-5.4-12-12v-24c0-6.6 5.4-12 12-12h76v-76c0-6.6 5.4-12 12-12h24c6.6 0 12 5.4 12 12v76h76c6.6 0 12 5.4 12 12zm112-180v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 
                            48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"/>
                            </svg>
                            <span 
                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap" 
                                role="tooltip"
                            >
                                Add
                            </span>
                        </a>
                    </div>
                    <div className="hs-tooltip [--placement:right] inline-block">
                        <a 
                            href="#users" 
                            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 mt-[4rem] text-sm font-semibold rounded-full border border-transparent text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
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

                    <div className="hs-tooltip [--placement:right] inline-block">
                        <a 
                            href="#event-list" 
                            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 mt-[4rem] text-sm font-semibold rounded-full border border-transparent text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                        >
                              
                              <svg
                              className="flex-shrink-0 size-4" 
                              width="34" 
                              height="34" 
                               
                              fill="white" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                              <path d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-48 0l0-.3-26.1 22.7-62.7-58.5 16.5-84.4 34.3 3.1c-24.9-34.2-60-60.1-100.7-73.1l13.7 31.9L256 139l-75-41.5 13.7-31.9c-40.6 13-75.8 38.9-100.7 73.1l34.6-3.1 16.2 84.4-62.7 58.5-26.1-22.7 0 .3c0 43 13.5 84 38.5 118l7.
                              7-33.9 85.1 10.4 36.3 77.8-29.9 17.8c40.2 13.1 84.3 13.1 124.6 0l-29.9-17.8 36.3-77.8 85.1-10.4 7.7 33.9C442.5 340 456 299 456 256zm-248.1 69.6l-29.9-91.3L256 177.7l78 56.5-29.6 91.3h-96.5z"/>
                              
                              </svg>
                            <span 
                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap" 
                                role="tooltip"
                            >
                                events
                            </span>
                        </a>
                    </div>

                    <div className="hs-tooltip [--placement:right] inline-block">
                        <a 
                            href="#over" 
                            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 mt-[4rem] text-sm font-semibold rounded-full border border-transparent text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                        >
                              
                              <svg
                              className="flex-shrink-0 size-4" 
                              width="34" 
                              height="34" 
                              fill="white" 
                            
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <path d="M396.8 352h22.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-192 0h22.4c6.4 0 12.8-6.4 12.8-12.8V140.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h22.4c6.4 0 12.8-6.4 12.8-12.8V204.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zM496 400H48V80c0-8.8-7.2-16-16-16H16C7.2 64 0 71.2 0 80v336c0 17.7 14.3 32 32 32h464c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16zm-387.2-48h22.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-
                              12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8z"/>
                              </svg>
                            <span 
                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap" 
                                role="tooltip"
                            >
                                overview
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
