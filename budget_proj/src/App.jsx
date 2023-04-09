import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Layout, appLoader} from './pages/Layout.jsx';

import HomePage from './pages/HomePage.jsx';
import { ExpensesPage, expensesPageLoader } from './pages/ExpensesPage.jsx';
import ExpenseList from './components/ExpenseList';
import {ExpenseDetail} from './components/ExpenseDetail';
import ExpenseForm from './components/ExpenseForm';
import LoginPage from './pages/LoginPage.jsx';
import { HistoryPage, historyLoader } from './pages/HistoryPage';
import {UserContextProvider} from './context/UserContext';



function App() {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      loader: appLoader,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/expenses",
          element: <ExpensesPage />,
          loader: expensesPageLoader,
          id: "expenses",
          children: [
            {
              path: "",
              element: <ExpenseList />,
            },
            {
              path: ":id",
              element: <ExpenseDetail />,
            }
          ]
        },
        {
          path: "/expenses/create",
          element: <ExpenseForm />,
        },
        {
          path: "/history",
          element: <HistoryPage />,
          loader: historyLoader
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "*",
          element: <HomePage />,
        },
      ],
    },
  ]);


  return (
    <div className="App">
      <Helmet>
        <title>Budget App</title>
      </Helmet>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
      
    </div>
  )
}

export default App


