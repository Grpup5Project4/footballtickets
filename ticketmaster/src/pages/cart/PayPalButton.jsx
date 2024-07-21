import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useContext } from "react";
import { PriceContext } from "./PaypalConfig"; 

const PayPalButton = ({ onSuccess, onError }) => {
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
};

export default PayPalButton;
