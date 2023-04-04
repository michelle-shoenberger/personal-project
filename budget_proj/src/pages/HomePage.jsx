import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import MyForm from "../components/MyForm";
import Summary from '../components/Summary';
import { UserContext } from '../context/UserContext';

export default function HomePage(props) {
  const {cats} = useContext(UserContext);
  const navigate = useNavigate();

  const model = {
    'item_name': 'text',
    'cost': 'float',
    'category': 'select',
    'description': 'textarea'
  };
  const handleSubmit = async (data, endpoint) => {
    //console.log(data)
    let resp = await axios.post('http://127.0.0.1:8000/api'+endpoint, data)
      .catch((e) => {
        console.log("getExpense error: " + e)
      });
    if (resp){
      //console.log(resp)
      alert("Expense successfully added.  All expenses listed on Expense page.")
      navigate('/expenses')
    } else {
      //console.log('fail')
      alert("Please enter a valid expense.")
    }
  };

  

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h1 className="mb-5"> Home Page </h1>
      <Summary />
      <h2 className="mt-5"> Create new expense: </h2>
      <MyForm model={model} followOn={handleSubmit} endpoint="/expenses/" choices={cats} />
    </>
  )
}