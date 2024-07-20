import "../styles/eventDetails.css";
import { useLocation, useNavigate } from "react-router-dom";

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
        <div className="container">
            <div className="carddet">
                <div className="card-image">
                    <img src={event.Url} alt={event.title} />
                </div>
                <div className="card-content">
                    <h2>{event.title}</h2>
                    <div className="details">
                        <p><i className="fa fa-calendar"></i> {event.date}</p>
                        <p><i className="fa fa-map-marker"></i> {event.location}</p>
                    </div>
                    <div className="description">
                        <p>{event.description}</p>
                    </div>
                    <div className="tickets">
                        <p>4168 Tickets available from <strong>€71.07</strong></p>
                    </div>
                </div>
            </div>

            <div className="pricing-plans">
                <div className="pricing-cards">
                    <div className="pricing-card">
                        <h3>VIP</h3>
                        <p className="price">{event.tickets.vip.VPrice}</p> {/* Display VIP price */}
                        <ul>
                            <li>50 Image generations</li>
                            <li>500 Credits</li>
                            <li>Monthly 100 Credits Free</li>
                            <li>Customer Support</li>
                            <li>Dedicated Server</li>
                            <li>Priority Generations</li>
                            <li>50GB Cloud Storage</li>
                        </ul>
                        <button className="Vip" onClick={() => handleBuyTicket('vip', event.tickets.vip.VPrice)}>Get Started</button>
                    </div>
                    <div className="pricing-card">
                        <h3>General</h3>
                        <p className="price">{event.tickets.general.GPrice}</p> {/* Display General price */}
                        <ul>
                            <li>50 Image generations</li>
                            <li>500 Credits</li>
                            <li>Monthly 100 Credits Free</li>
                            <li>Customer Support</li>
                            <li>Dedicated Server</li>
                            <li>Priority Generations</li>
                            <li>50GB Cloud Storage</li>
                        </ul>
                        <button className="general" onClick={() => handleBuyTicket('general', event.tickets.general.GPrice)}>Get Started</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default EventDetails;
