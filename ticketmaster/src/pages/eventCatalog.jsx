import "../styles/eventCatalog.css";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function EventCatalog() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [leagueFilter, setLeagueFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const eventsPerPage = 12;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://sportstest-cce07-default-rtdb.firebaseio.com/events.json")
            .then((response) => {
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

    const handleLeagueChange = (e) => {
        setLeagueFilter(e.target.value);
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
        (leagueFilter === "" || event.league.toLowerCase().includes(leagueFilter.toLowerCase())) &&
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
                            <select onChange={handleLeagueChange}>
                                <option value="">League</option>
                                <option value="Serie A">Serie A</option>
                                <option value="Premier League">Premier League</option>
                                <option value="Ligue 1">Ligue 1</option>
                                <option value="Bundesliga">Bundesliga</option>
                                <option value="La Liga">La Liga</option>
                                {/* Add other leagues as needed */}
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
                            <div key={index} className="card animate-card">
                                <img src={event.Url} alt={event.title} />
                                <div className="card-info">
                                    <div className="title">{event.title}</div>
                                    <div className="date">{event.date}</div>
                                    <div className="league">{event.league}</div>
                                    <div className="location">{event.location}</div>
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
