import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isvisible, setisvisible] = useState(false); // for the password to show or not

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    const response = await axios.post("https://moviesbackendd.onrender.com/", {
      email,
      password,
    });

    console.log(response);

    if (response.data.user === true) {
      const userId = response.data.id;
      navigate(`/home/${userId}`);
    } else alert("Please check the username and password");
  }

  return (
    <div className="Login">
      <h1>Login</h1>
      <form action="POST" onSubmit={submit}>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <div className="password">
          <input
            type={isvisible ? "text" : "password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          />
          <div className="icon" onClick={() => setisvisible(!isvisible)}>
            {isvisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <input type="submit" />
      </form>
      <br />
      <p>or</p>
      <br />
      <Link className="link" to="/Signup">
        Sign Up Page
      </Link>
    </div>
  );
}
