import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
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
      <h1 className="text-center">Log in</h1>
      <div className="d-flex flex-column align-items-center">
        <input type="text" placeholder="Username..." onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text" placeholder="Password..." onChange={(e)=>setPwd(e.target.value)} />
        <button type="submit" className="btn btn-primary" onClick={logIn}>Login</button>
      </div>
      <p className="mt-5 text-center">Don't have an account?</p>
      <h1 className="text-center">Sign up!</h1>
      <div className="d-flex flex-column align-items-center">
        <input type="text" placeholder="Username..." onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text" placeholder="Password..." onChange={(e)=>setPwd(e.target.value)} />
        <input type="email" placeholder="Email..." onChange={(e)=>setEmail(e.target.value)} />
        <button type="submit" className="btn btn-primary" onClick={signUp}>Sign up</button>
      </div>
    </>
  )
};