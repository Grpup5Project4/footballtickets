import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Signup.css";
import { StartFirebase } from "../../public/fireBaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

function Login() {
  const { auth } = StartFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const send = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, pass);
      if (user) {
        sessionStorage.setItem("userId" , user.user.uid)
        alert("Logged in successfully");
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(result);

      navigate("/");
 

      if (user) {
        
        alert("Logged in with Google successfully");
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="main-container">
      <div className="signup-container">
        <h1 className="title">
          Hi, Welcome Back! <span>👋</span>
        </h1>

        <form className="signup-form" onSubmit={send}>
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
      
        <button className="google-button" onClick={loginWithGoogle}>
          Login with Google
        </button>
        </form>
     
        <p className="login-link">
          Dont have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
