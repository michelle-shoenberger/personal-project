import { useState, useEffect, useContext } from "react"
import { Outlet, useLoaderData } from "react-router-dom";
import {Helmet} from 'react-helmet'
import {UserContext} from "../context/UserContext";
import { getExpenses } from "../api/expenseCalls";


export async function expensesPageLoader() {
  let resp = await getExpenses();
  return resp
};

export function ExpensesPage(props) {
  const {cats} = useContext(UserContext);
  const initialexpenses = useLoaderData();
  const [expenses, setExpenses] = useState(initialexpenses)
  const [currentList, setCurrentList] = useState(expenses ? expenses : [])
  const [filterObj, setFilterObj] = useState({'value': "", 'by': 'name'}) 

  useEffect(() => {
    console.log('filterObj', filterObj)
    if (filterObj['value']) {
      const filteredLst = expenses.filter((expense) => {
        if (filterObj.by === 'name') {
          return expense.item_name.toLowerCase().includes(filterObj.value.toLowerCase())
        } else {
          if (filterObj.value === "") {
            return true
          }
          return expense.category === parseInt(filterObj.value)
        }
      });
      console.log(filteredLst)
      setCurrentList(filteredLst)
    } else {
      setCurrentList(expenses)
    }
  }, [filterObj, expenses])

  return (
    <>
      <Helmet>
        <title>Expenses</title>
      </Helmet>
      <Outlet context={{'all': currentList, 'filter': [filterObj, setFilterObj], 'cats': cats, 'expenses': expenses, 'changeExpenses': setExpenses}} />
      
    </>
  )
}

