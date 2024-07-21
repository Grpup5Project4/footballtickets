import React, { useState, createContext } from "react";
import PayPalButton from "./PayPalButton";
import { saveOrderToFirebase } from "./firebaseUtils";

export const PriceContext = createContext();  // Correct context creation

const PaypalConfig = ({ event, totalPrice, userId, ticketType, quantity }) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

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
            .then(() => setSuccess(true))
            .catch((err) => setError(err));
    };

    const handleError = (err) => {
        console.error("PayPal Checkout Error:", err);
        setError(err);
    };

    return (
        <div>
            <PriceContext.Provider value={totalPrice}>
                {success ? (
                    <div>Payment successful! Your order is confirmed.</div>
                ) : (
                    <PayPalButton onSuccess={handleSuccess} onError={handleError} />
                )
                }
                {error && <div className="error">Payment error: {error.message}</div>}
            </PriceContext.Provider>
        </div>
    );
};

export default PaypalConfig;
