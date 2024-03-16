import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Weather.css'; 

function Login() {
  const navigate = useNavigate();
  const [Login, setLogin] = useState({
    Email: "",
    Password: "",
  });

  const handlelogin = (event) => {
    setLogin({ ...Login, [event.target.name]: event.target.value });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    const login = await axios.post("http://localhost:5050/Login", {
      Email: Login.Email,
      Password: Login.Password,
    });
    console.log(login.data);

    if (login.data.message === "success") {
      const userid = login.data.userId;
      navigate(`/Home/${userid}`);
    } else {
      alert("Inavild Username or Password");
    }
  };

  return (
    <div className="Login">
      <div className="Homediv">
      <div className="Hometext" >
        <h1 className="text1">Your Citys best <br />weather Podcasts</h1>
      </div>
      <div className="Lform">
        {" "}
        <Form onSubmit={handlesubmit}>
          <h2 className="text2">LOGIN</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="Email"
              onChange={handlelogin}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="Password"
              onChange={handlelogin}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            LOGIN
          </Button>
          <Link to="/Signup" className="px-4 text-light" >
            Are You New Here ?
          </Link>
        </Form>
      </div>
      </div>
       
     
    </div>
  );
}

export default Login;
