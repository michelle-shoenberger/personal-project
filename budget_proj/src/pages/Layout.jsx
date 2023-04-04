import { Outlet, useLoaderData, useNavigate} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AppNav from "../components/AppNav"

import {UserContext} from '../context/UserContext';


export async function appLoader () {
  console.log('apploader')
  const token = Cookies.get('token')
  if (token) {
    console.log('api call for whoami', token)
    axios.defaults.headers.common['Authorization'] = "Token " + token;
    const resp = await axios.post('http://127.0.0.1:8000/whoami/')
      .catch((e) => {
        console.log("Usercheck error: " + e)
      });
    if (resp.data.token) {
      Cookies.set('token', resp.data.token, {expires: 1/48})
      console.log('currentuser', resp.data)
      return resp.data
    }
    
    
  } else {
    return null
  }
};

export function Layout() {
  const navigate = useNavigate();
  const currentUser = useLoaderData();
  // const [user, setUser] = useState(currentUser);
  const {user, setUser, setCats} = useContext(UserContext);
 

  useEffect(() => {
    console.log('user', user, currentUser)
    if (!currentUser && !user) {
      navigate('/login')
    } else if (!user) {
      setUser(currentUser)
    }
  }, [user])


  useEffect(() => {
    const getCategories = async () => {
      const resp = await axios.get('http://127.0.0.1:8000/category/')
        .catch((e) => {
          console.log("getCategories error: " + e)
      });
      let data = resp.data
      data.sort((a,b) => {
        return a.name > b.name ? 1 : a.name<b.name ? -1 : 0
      });
      console.log(data)
      setCats(data)
    };
    if (user) {
      try {
        getCategories()
      } catch {
        console.log('Categories will be retrieved after log on')
      }     
    }
    
  }, [user]);

  return (
    <>
      <AppNav />
      <Container style={{marginTop: '9vh'}}>
        <Outlet />
      </Container>
    </>
  )
};