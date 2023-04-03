import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useRouteLoaderData, NavLink, useParams } from "react-router-dom";

// can I pass the expense via the expense page outlet?
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
  const expenses = useRouteLoaderData('expenses')['expenses'];
  const [expense, setExpense] = useState(() => {
    console.log(id)
    console.log(expenses.find((expense) => expense.id == id))
    return expenses.find((expense) => expense.id == id)
  });


  return (
    <>
      <NavLink to="/expenses">
        <button className="btn btn-secondary mb-2" >Go back...</button>
      </NavLink>
      <h1>Expense details</h1>
      <h2> {expense.item_name} </h2>
      <p> Cost: ${expense.cost} </p>
      <p> Date: {expense.date} </p>
      <p> Category: {expense.category_name} </p>
      <p> Description: {expense.description} </p>
    </>
  )
};