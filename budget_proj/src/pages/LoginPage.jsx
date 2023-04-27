import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { Form, Button, FloatingLabel, Row, Col, Image } from "react-bootstrap";
import {UserContext} from '../context/UserContext'
import { createUser, loginUser } from "../api/authCalls";

export default function LoginPage(props) {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext)


  const [username, setUsername] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [email, setEmail] = useState(null);

  const logIn = async () => {
    const resp = await loginUser(username, pwd);
    console.log(resp)
    if (resp) {
      setUser(resp)
      navigate('/')
    } else {
      alert("Login failed. Please try again")
    }
  }

  const signUp = async () => {
    console.log('signup')
    const resp = await createUser(username, pwd, email);
    console.log(resp)
    if (resp) {
      setUser(resp)
      navigate('/profile')
    } else {
      alert("Sign up failed. Please try again")
    }
  };

  return (
    <>
      <h1 className="text-center mt-5 bg-dark text-light">Welcome back!</h1>
      <Form className="d-flex flex-column align-items-center " >
        <FloatingLabel controlId="username" label="Username">
          <Form.Control type="text" name="username" placeholder="Username..."  onChange={(e)=>setUsername(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel controlId="pwd" label="Password">
          <Form.Control  type="password" name="password" placeholder="Password..." onChange={(e)=>setPwd(e.target.value)} />
        </FloatingLabel>
        <Button className="mt-2" onClick={logIn} >Login</Button>
      </Form>
      <p className="mt-5 text-center bg-success text-light display-1">Don't have an account?</p>
      <h1 className="text-center">Sign up!</h1>
      <Row>
        <Col md={6}>
          <Image fluid md={6} src="https://images.unsplash.com/photo-1460467820054-c87ab43e9b59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=767&q=80" alt="welcome"/>
        </Col>
        <Form as={Col} lg={6} className="d-flex flex-column align-items-center justify-content-center" >
          <FloatingLabel controlId="username" label="Username">
            <Form.Control type="text" name="username" placeholder="Username..." onChange={(e)=>setUsername(e.target.value)} />
          </FloatingLabel>
          <FloatingLabel controlId="email" label="Email">
            <Form.Control type="email" name="email" placeholder="Email.." onChange={(e)=>setEmail(e.target.value)} />
          </FloatingLabel>
          <FloatingLabel controlId="pwd" label="Password">
            <Form.Control  type="password" name="password" placeholder="Password..." onChange={(e)=>setPwd(e.target.value)} />
          </FloatingLabel>
          <Button className="mt-2" onClick={signUp}>Signup</Button>
        </Form>
      </Row>
    </>
  )
};


{/* <div className="d-flex flex-column align-items-center">
<input type="text" placeholder="Username..." onChange={(e)=>setUsername(e.target.value)}/>
<input type="text" placeholder="Password..." onChange={(e)=>setPwd(e.target.value)} />
<button type="submit" className="btn btn-primary mt-2" onClick={logIn}>Login</button>
</div> */}