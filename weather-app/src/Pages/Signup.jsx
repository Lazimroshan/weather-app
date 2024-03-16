import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [Signup, setSignup] = useState({
    Username: "",
    Email: "",
    Password: "",
  });

  const handlesignup = (event) => {
    setSignup({ ...Signup, [event.target.name]: event.target.value });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    const signup = await axios.post("http://localhost:5050/Createuser", {
      Username: Signup.Username,
      Email: Signup.Email,
      Password: Signup.Password,
    });
    const userid = signup.data.id;
    navigate(`/Home${userid}`);
    console.log(signup.data);
  };

  return (
    <div>
      <div className="Signup">
        <div className="Homediv1">
        <div className="Hometext">
              <h1 className="text1">
                Your Citys best <br />
                weather Podcasts
              </h1>
            </div>
          <div className="Sform">
            <Form onSubmit={handlesubmit}>
              <h2 className="text2">SIGN UP</h2>
              <Form.Group className="mb-3" controlId="formBasictext">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="Username"
                  onChange={handlesignup}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="Email"
                  onChange={handlesignup}
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
                  onChange={handlesignup}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                LOGIN
              </Button>
              <Link to="/" className="px-4">
                Already have an account
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
