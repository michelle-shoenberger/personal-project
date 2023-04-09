import { Outlet, useLoaderData, useNavigate} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import { useEffect, useContext } from 'react';
import AppNav from "../components/AppNav"
import { persistUser } from '../api/authCalls';
import { getAllCategories } from '../api/categoriesCalls';
import {UserContext} from '../context/UserContext';


export async function appLoader () {
  const resp = await persistUser();
  return resp
};

export function Layout() {
  const navigate = useNavigate();
  const currentUser = useLoaderData();
  // const [user, setUser] = useState(currentUser);
  const {user, setUser, setCats} = useContext(UserContext);
 
  const getCategories = async () => {
    const resp = await getAllCategories();
    //console.log(resp)
    setCats(resp)
  }

  useEffect(() => {
    console.log('user', user, currentUser)
    if (!currentUser && !user) {
      navigate('/login')
    } else if (!user) {
      console.log('setting user')
      setUser(currentUser)
    }

    getCategories()
  }, [user])


  return (
    <div style={{minWidth: '400px'}}>
      <AppNav />
      <Container style={{marginTop: '9vh'}}>
        <Outlet />
      </Container>
    </div>
  )
};