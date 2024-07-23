import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useContext } from "react";
import { PriceContext } from "./PaypalConfig";
import { useNavigate } from "react-router-dom";

const PayPalButton = ({ onSuccess, onError }) => {
  const navigate = useNavigate();



  if (sessionStorage.getItem("userId")) {
    const finalPrice = useContext(PriceContext);
    console.log(finalPrice);
    return (
      <PayPalScriptProvider options={{ "client-id": "AUNgExnFQR4e4n2q9bxk_VVk7slOAQFAcjgv3N8Utn8NGDHm8xC8jxMiK5Id0IkHBvq12Jrvb0q91pM6" }}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: sessionStorage.getItem("finalPrice"),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              console.log("Transaction completed by:", details.payer.name.given_name);
              onSuccess(details);
            });
          }}
          onError={(err) => {
            console.error("Error during payment:", err);
            onError(err);
          }}
        />
      </PayPalScriptProvider>
    );
  }

  else {
    navigate("/login");
    return (
      <div className="flex items-center justify-center mt-20 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">LOGIN TO PURCHASE </h1>
          <p className="text-gray-700">You need to log in to purchase this ticket.</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

};

export default PayPalButton;