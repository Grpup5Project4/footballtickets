import "../styles/eventCatalog.css";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";  // Import useNavigate

function EventCatalog() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const eventsPerPage = 9;
    const navigate = useNavigate();  // Initialize useNavigate

    useEffect(() => {
        axios.get("https://sportstest-cce07-default-rtdb.firebaseio.com/events.json")
            .then((response) => {
                console.log("Response data:", response.data);
                const eventsData = response.data ? Object.values(response.data) : [];
                setEvents(eventsData);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleLocationChange = (e) => {
        setLocationFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleDateChange = (e) => {
        setDateFilter(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleViewDetails = (event) => {
        navigate('/eventdetails', { state: { event } });
    };

    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (locationFilter === "" || event.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
        (dateFilter === "" || event.date === dateFilter)
    );

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredEvents.length / eventsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar />

            <div>
                <main>
                    <div className="searchcont">
                        <div className="search-form">
                            <input 
                                type="text" 
                                placeholder="Search Event" 
                                value={searchTerm} 
                                onChange={handleSearchChange} 
                            />
                            <select onChange={handleLocationChange}>
                                <option value="">Place</option>
                                <option value="Amman">Amman</option>
                                <option value="Cairo">Cairo</option>
                                <option value="Zarqa">Zarqa</option>
                                <option value="Jeddah">Jeddah</option>
                                <option value="Riyad">Riyad</option>
                                {/* Add other locations as needed */}
                            </select>
                            <input 
                                type="date" 
                                value={dateFilter} 
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>

                    <div className="event-cards">
                        {currentEvents.map((event, index) => (
                            <div key={index} className="card">
                                <img src={event.Url} alt={event.title} />
                                <div className="card-info">
                                    <div className="date">{event.date}</div>
                                    <div className="title">{event.title}</div>
                                    <div className="title">{event.location}</div>
                                    <div className="description">{event.description}</div><br></br>
                                    <div className="containerButton">
                                        <button 
                                            className="ticketButton"
                                            onClick={() => handleViewDetails(event)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                className={`page-button ${currentPage === number ? 'active' : ''}`}
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </main>
            </div>

            <Footer />
        </>
    );
}

export default EventCatalog;
