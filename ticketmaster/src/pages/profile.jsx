import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navBar";

function Profile() {
  const [userData, setUserData] = useState({});
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("No user ID found in session storage");
        return;
      }

      try {
        const response = await axios.get(
          `https://sportstest-cce07-default-rtdb.firebaseio.com/users/${userId}.json`
        );
        if (response.data) {
          setUserData(response.data);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://sportstest-cce07-default-rtdb.firebaseio.com/users/${userId}.json`,
        userData
      );
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
          <form onSubmit={handleEdit} className="w-full">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">UserName</label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Number</label>
              <input
                type="text"
                name="phone"
                value={userData.phone || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={userData.password || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <hr className="my-6" />
        <h2 className="text-xl font-semibold mb-4">Purchase</h2>
        <div className="space-y-6">
          {userData.orders &&
            Object.entries(userData.orders).map(([orderId, order]) => (
              <div key={orderId} className="bg-white shadow-md rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <div className="text-lg font-semibold mb-2">{order.eventTitle}</div>
                <div className="text-gray-700">
                  Status: {order.status}
                  <br />
                  Quantity: {order.tickets.quantity}
                  <br />
                  Ticket Type: {order.tickets.ticketType}
                  <br />
                  Total Price: ${order.tickets.totalPrice}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
