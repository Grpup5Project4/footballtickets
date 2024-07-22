import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { StartFirebase } from "../../public/fireBaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import "../styles/Signup.css";

// Initialize Firebase services
const { auth, database, provider } = StartFirebase();

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [pass, setPass] = useState("");

  const signingoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate("/home");

      if (user) {
        const userData = {
          fullName: user.displayName,
          email: user.email,
          phone: number,
          password: pass,
        };

        await set(ref(database, `users/${user.uid}`), userData);
        alert("Account Created successfully with Google");
        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user1 = await createUserWithEmailAndPassword(auth, email, pass);
      const user = user1.user;
      if (user) {
        const userData = {
          fullName: name,
          email: email,
          phone: number,
          password: pass,
        };

        await set(ref(database, `users/${user.uid}`), userData);
        alert("Account Created successfully");
        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="main-container">
      <div className="signup-container">
        <h1 className="title">Create an account</h1>

        <form className="signup-form" onSubmit={submit}>
          <input
            type="text"
            value={name}
            placeholder="Enter Your Username"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            value={email}
            placeholder="Enter Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            value={number}
            placeholder="Enter Your Phone Number"
            required
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="password"
            value={pass}
            placeholder="Enter Your Password"
            required
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          
        <div className="or-with">
          <hr />
          <span>Or With</span>
          <hr />
        </div>

        <div className="auth-buttons">
          
          <button className="google-button" onClick={signingoogle}>
            Signup with Google
          </button>
        </div>
        </form>
        
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
