import axios from 'axios';

const firebaseUrl = "https://sportstest-cce07-default-rtdb.firebaseio.com";

export function saveOrderToFirebase(orderId, orderData, userId) {
  const orderRef = `${firebaseUrl}/orders/${orderId}.json`;
  const userOrdersRef = `${firebaseUrl}/users/${userId}/orders/${orderId}.json`;

  const orderRequest = axios.put(orderRef, orderData);
  const userOrdersRequest = axios.put(userOrdersRef, orderData);

  return Promise.all([orderRequest, userOrdersRequest])
    .then(([orderResponse, userOrdersResponse]) => {
      console.log("Order saved successfully!", orderResponse, userOrdersResponse);
    })
    .catch(error => {
      console.error("Error saving order: ", error);
      throw error;
    });
}
