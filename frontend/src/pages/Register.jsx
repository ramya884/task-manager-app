import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "https://task-manager-backend-pxtd.onrender.com/api/users/register",
      { name,email,password }
    );

    localStorage.setItem(
      "userInfo",
      JSON.stringify(data)
    );

    navigate("/dashboard");
  };

  return (
  <div className="auth-container">

    <div className="auth-card">

      <h1>Register</h1>

      <form onSubmit={submitHandler}>

        <input
          type="text"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">
          Register
        </button>

      </form>

      <p>
        Already User?
        <Link to="/">
          Login
        </Link>
      </p>

    </div>

  </div>
);
}

export default Register;