import React from "react";
import Headers from "../components/header";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/users/userslice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/users/userslice";

const LogIn = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [logSubmit, setLogSubmit] = useState(false);

  const loginSubmit = (e) => {
    e.preventDefault();
    let signInBody = {
      name,
      email,
      password,
    };
    dispatch(logIn(signInBody))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error("failed to login:", error));
      });
  };

  return (
    <>
      <Headers />

      <div className="loginpage">
        <br></br>
        <br></br>
        <form className="form" onSubmit={loginSubmit}>
          <h3>Login</h3>
          <label>email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>name</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <button onClick={() => dispatch(logOut(user))}>logout</button>

      <button>
        <Link to="/products">products</Link>
      </button>
      <Footer />
    </>
  );
};

export default LogIn;