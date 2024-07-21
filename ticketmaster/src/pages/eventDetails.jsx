import "../styles/eventDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import Footer from "../components/footer";

function EventDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state || {};

    if (!event) {
        return <div>Event not found.</div>;
    }

    const handleBuyTicket = (ticketType, price) => {
        navigate('/checkout', { state: { event, ticketType, price } });
    };

    return (
        <div>
            <NavBar />
            <div className="hero-section">
                <img src={event.Url} alt={event.title} className="hero-image" />
                <div className="hero-content animate-content">
                    <h1>{event.title}</h1>
                    <p><i className="fa fa-calendar"></i> Date : {event.date}</p>
                    <p><i className="fa fa-map-marker"></i> Stadium : {event.location}</p>
                    <p><i className="fa fa-map-marker"></i> {event.description}</p>
                </div>
            </div>
            <div className="container">
                <div className="event-details animate-content">
                    <div className="description"></div>
                </div>
                <h2 className="tickets-header">Tickets</h2>
                <div className="pricing-plans animate-content">
                    <div className="pricing-cards">
                        <div className="pricing-card vip animate-card">
                            <h3>VIP</h3>
                            <div className="features">
                                <p>
                                    Experience the best with VIP access, including official E-tickets, lounge access, free drinks, buffet menu, live music, access to the museum, a 10% voucher, and a club gift.
                                </p>
                            </div>
                            <div className="pricing-info">
                                <p className="price">{event.tickets.vip.VPrice} $</p>
                                <button className="buy-button" onClick={() => handleBuyTicket('vip', event.tickets.vip.VPrice)}>Check out</button>
                            </div>
                        </div>
                        <div className="pricing-card general animate-card">
                            <h3>General</h3>
                            <div className="features">
                                <p>
                                    Enjoy the event with general admission, including official E-tickets, lounge access, drinks at half-time, hot food dish, luxury padded seats, and access to all basic amenities.
                                </p>
                            </div>
                            <div className="pricing-info">
                                <p className="price">{event.tickets.general.GPrice} $</p>
                                <button className="buy-button" onClick={() => handleBuyTicket('general', event.tickets.general.GPrice)}>Check out</button>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="location-header">Stadium Location</h2>
                <div className="location-section animate-content">
                    <iframe
                        width="100%"
                        height="200"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                        title="Event Location"
                    >
                    </iframe>
                    <a href={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}`} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EventDetails;
