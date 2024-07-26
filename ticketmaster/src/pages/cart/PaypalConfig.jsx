import React, { useState, useEffect, createContext } from "react";
import PayPalButton from "./PayPalButton";
import { useNavigate } from "react-router-dom";
import { saveOrderToFirebase } from "./firebaseUtils";

export const PriceContext = createContext();

const PaypalConfig = ({ event, totalPrice, userId, ticketType, quantity, downloadPDF }) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    sessionStorage.setItem('finalPrice', totalPrice);
    const handleSuccess = (details) => {
        const orderId = details.id;
        const orderData = {
            createdAt: new Date().toISOString(),
            eventTitle: event.title,
            status: "confirmed",
            tickets: {
                ticketType: ticketType,
                quantity: quantity,
                totalPrice: totalPrice
            },
            userId: userId
        };

        saveOrderToFirebase(orderId, orderData, userId)
            .then(() => {
                setSuccess(true);
            })
            .catch((err) => setError(err));
    };

    const handleError = (err) => {
        console.error("PayPal Checkout Error:", err);
        setError(err);
    };

    const handlePayPalButtonClick = () => {


        if (!sessionStorage.getItem("userId")) {
            sessionStorage.setItem("redirectPath", window.location.pathname + window.location.search);
            navigate("/login", { state: { eventTo: event, ticketTypeTo: ticketType, priceTo: totalPrice } });

        }
    };


    return (
        <div>
            {success ? (
                <div>
                    <p>Payment successful! Your order is confirmed.</p>
                    <button onClick={downloadPDF} className="mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-600">
                        Download PDF
                    </button>
                </div>
            ) : (
                <PayPalButton eventTo={event} ticketTypeTo={ticketType} priceTo={totalPrice} onClick={handlePayPalButtonClick} onSuccess={handleSuccess} onError={handleError} />
            )}
            {error && <div className="error">Payment error: {error.message}</div>}
        </div>
    );
};

export default PaypalConfig;
