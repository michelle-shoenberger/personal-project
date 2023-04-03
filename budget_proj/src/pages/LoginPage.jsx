import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

export default function LoginPage(props) {
  const navigate = useNavigate();
  const {user, setUser} = useContext
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])

  const [username, setUsername] = useState(null);
  const [pwd, setPwd] = useState(null);

  const logIn = async () => {
    let resp = await axios.post('http://127.0.0.1:8000/login/', {
      username: username,
      password: pwd
    })
      .catch((e) => {
        console.log("Login error: " + e)
      });
    console.log(resp.data)
    Cookies.set('token', resp.data.token, {expires: 1/48})
    axios.defaults.headers.common['Authorization'] = "Token " + resp.data.token;
    props.handleLogin(resp.data)
    navigate('/')
  }

  return (
    <>
      <h1>Log in</h1>
      <div className="d-flex flex-column align-items-center">
        <input type="text" placeholder="Username..." onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text" placeholder="Password..." onChange={(e)=>setPwd(e.target.value)} />
        <button type="submit" className="btn btn-primary" onClick={logIn}>Login</button>
      </div>
    </>
  )
};