
import { useState } from "react";
import { NavLink, useParams, useOutletContext } from "react-router-dom";
import ExpenseUpdateForm from "./ExpenseUpdateForm";
import ExpensesDelete from "./ExpensesDelete";

// export async function ExpenseDetailLoader({params}) {
//   const resp = await axios.get(`http://127.0.0.1:8000/expenses/${params.id}`)
//         .catch((e) => {
//           console.log("getExpense error: " + e)
//         });
//   //console.log(resp.data)
//   return {'expense': resp.data}
// };

export function ExpenseDetail(props) {
  const {id} = useParams();
  const {expenses, changeExpenses} = useOutletContext();
  const [expense, setExpense] = useState(() => {
    console.log('detail', expenses.find((expense) => expense.id == id))
    return expenses.find((expense) => expense.id == id)
  });

  return (
    <>
      <NavLink to="/expenses">
        <button className="btn btn-secondary mb-2" >Go back...</button>
      </NavLink>
      <ExpenseUpdateForm current={expense} expenses={expenses} changeExpenses={changeExpenses} />
      <ExpensesDelete current={expense} expenses={expenses} changeExpenses={changeExpenses} />
    </>
  )
};


