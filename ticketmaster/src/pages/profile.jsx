
// export default Profile;
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css";

import person from "../assets/person.png";
import Navbar from "../components/navBar";

function Profile() {
  const [userData, setUserData] = useState({});
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    console.log("User ID from sessionStorage:", userId); // قمنا بإضافة هذا السطر

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
      <div className="profile">
        <div className="edit-profile">
          <div className="edit-profile-image">
            <h1>Edit Profile</h1>
            <img src={person} alt="Profile" />
          </div>
          <form onSubmit={handleEdit}>
            <label>
              UserName
              <input
                type="text"
                name="fullName"
                value={userData.fullName || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={userData.email || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Number
              <input
                type="text"
                name="phone"
                value={userData.phone || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={userData.password || ""}
                onChange={handleChange}
              />
            </label>
            <div className="buttons">
              <button type="submit">Save</button>
              <button type="button">Cancel</button>
            </div>
          </form>
        </div>
        <hr />
        <h2>Favorite</h2>
        <div className="cards">
          <div className="card">
            <img src={" "} alt="Chelsea vs Manchester" />
            <div className="date">14 Jul</div>
            <div className="title">Chelsea vs Manchester</div>
            <div className="description">
              We’ll get you officially excited and booked for every big match.
            </div>
          </div>
          <div className="card">
            <img src={" "} alt="Chelsea vs Manchester" />
            <div className="date">14 Jul</div>
            <div className="title">Chelsea vs Manchester</div>
            <div className="description">
              We’ll get you officially excited and booked for every big match.
            </div>
          </div>
          <div className="card">
            <img src={" "} alt="Chelsea vs Manchester" />
            <div className="date">14 Jul</div>
            <div className="title">Chelsea vs Manchester</div>
            <div className="description">
              We’ll get you officially excited and booked for every big match.
            </div>
          </div>
        </div>
        <hr />
        <h2>I bought</h2>
        <div className="cards">
          {userData.orders &&
            Object.entries(userData.orders).map(([orderId, order]) => (
              <div className="card" key={orderId}>
                
                <div className="date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <div className="title">{order.eventTitle}</div>
                <div className="description">
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

