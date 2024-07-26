import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import "../styles/Signup.css";
import { StartFirebase } from "../../public/fireBaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import Swal from 'sweetalert2';

function Login() {
  const { auth } = StartFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const location = useLocation();

  const { eventTo, ticketTypeTo, priceTo } = location.state || {};

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      if (user) {
        sessionStorage.setItem("userId", user.uid);
        Swal.fire({
          title: "Success!",
          text: "Logged in successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          const redirectPath = sessionStorage.getItem("redirectPath") || "/";
          sessionStorage.removeItem("redirectPath");
          navigate(redirectPath, { state: { event: eventTo, ticketType: ticketTypeTo, price: priceTo } });
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        Swal.fire({
          title: "Success!",
          text: "Logged in with Google successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          const redirectPath = sessionStorage.getItem("redirectPath") || "/";
          sessionStorage.removeItem("redirectPath");
          navigate(redirectPath, { state: { event: eventTo, ticketType: ticketTypeTo, price: priceTo } });
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="main-container">
      <div className="signup-container">
        <h1 className="title">
          Hi, Welcome Back! <span role="img" aria-label="wave">👋</span>
        </h1>

        <form className="signup-form" onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            placeholder="Enter Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={pass}
            placeholder="Enter Your Password"
            required
            onChange={(e) => setPass(e.target.value)}
          />

          <button type="submit" className="signup-button">
            Log In
          </button>

          <div className="or-with">
            <hr />
            <span>Or With</span>
            <hr />
          </div>

          <button className="google-button" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </form>

        <p className="login-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <div className="admin-button-container">
          <Link to="/adminlogin">
            <button className="admin-button bg-green-600 text-white py-1 px-3 rounded">
              Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
