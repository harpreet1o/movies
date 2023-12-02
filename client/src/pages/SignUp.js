import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [isvisible, setisvisible] = useState(false); // for the password click show

  async function submit(e) {
    e.preventDefault();

    console.log(password + "  " + Name + " " + email);
    try {
      const response = await axios.post(
        "https://moviesbackendd.onrender.com/signUp",
        {
          email: email,
          password: password,
          name: Name,
        }
      );

      console.log(response);
      if (response.data.status === "ok") {
        navigate(`/`);
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log(error);
    }
  }

  return (
    <div className="Signup">
      <h1>Signup</h1>
      <form action="POST" onSubmit={submit}>
        <input
          type="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
        />
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

        <input type="submit" className="submit" />
      </form>
      <br />
      <p>or</p>
      <br />
      <Link className="link" to="/">
        Login
      </Link>
    </div>
  );
}
