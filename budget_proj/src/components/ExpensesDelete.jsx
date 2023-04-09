import { useNavigate } from 'react-router-dom';
import { deleteExpense } from "../api/expenseCalls";

export default function ExpensesDelete ({current, expenses, changeExpenses}) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    const resp = await deleteExpense(current.id);
    console.log('delete', resp)
    if (resp){
      changeExpenses(expenses.filter((expense) => {
        return expense.id !== current.id
      }))
      navigate('/expenses')
    } else {
      console.log('fail')
      alert("Please enter a valid expense.")
    }
  };

  return (
    <>
      <button className="btn btn-danger mt-3" onClick={handleDelete}>Delete</button>
    </>
  )
}