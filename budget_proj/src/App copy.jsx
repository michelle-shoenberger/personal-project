import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import Layout from './pages/Layout.jsx';

import HomePage from './pages/HomePage.jsx';
import ExpensesPage from './pages/ExpensesPage.jsx';
import LoginPage from './pages/LoginPage.jsx';


export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  // user  obj
  const [categories, setCategories] = useState(null);

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
      setCategories(data)
    };
    if (user) {
      try {
        getCategories()
      } catch {
        console.log('Categories will be retrieved after log on')
      }     
    }
    
  }, [user]);

  useEffect(() => {
    const getCurrentUser = async (token) => {
      const resp = await axios.post('http://127.0.0.1:8000/whoami/')
        .catch((e) => {
          console.log("Usercheck error: " + e)
        });
      console.log(resp.data)
      Cookies.set('token', resp.data.token, {expires: 1/48})
      setUser(resp.data)
    };
    const token = Cookies.get('token')
    console.log(token)
    if (token) {
      console.log('token')
      axios.defaults.headers.common['Authorization'] = "Token " + token;
      getCurrentUser(token)
    }

  }, [])



  // const detailLoader = ({params}) => {
  //   return expenses.find(elem => elem.id === params.id)
  // }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <HomePage cats={categories}/>,
        },
        {
          path: "/expenses",
          element: <ExpensesPage cats={categories}/>,
        },
        {
          path: "/login",
          element: <LoginPage handleLogin={setUser} user={user}/>,
        },
      ],
    },
  ]);


  return (
    <div className="App">
      <Helmet>
        <title>Budget App</title>
      </Helmet>
      <Router>
        <UserContext.Provider value={{user, setUser}}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/login" element={<LoginPage handleLogin={setUser} user={user}/>} />
              <Route path="/" element={<HomePage cats={categories}/>} />
              <Route path="/expenses" element={<ExpensesPage cats={categories} />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  )
}

export default App


//  <Route path="/expenses/:id" element={<ExpenseDetailPage />} loader={detailLoader}/>