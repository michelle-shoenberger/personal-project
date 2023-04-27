import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import ExpenseForm from '../components/ExpenseForm';
import BudgetSummary from "../components/BudgetSummary";

import { UserContext } from '../context/UserContext';

export default function HomePage() {
  const {cats} = useContext(UserContext);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <BudgetSummary />
      <h2 className="mt-5 bg-dark text-light p-1"> Create new expense: </h2>
      {cats && <ExpenseForm />}
    </>
  )
}