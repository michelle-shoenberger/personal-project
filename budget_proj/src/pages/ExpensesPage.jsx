import { useState, useEffect, useContext } from "react"
import { Outlet, useLoaderData } from "react-router-dom";
import {Helmet} from 'react-helmet'
import axios from 'axios';
import {UserContext} from "../context/UserContext";


export async function expensesPageLoader() {
  try{
    const resp = await axios.get('http://127.0.0.1:8000/api/expenses/')
    .catch((e) => {
      console.log("getExpense error: " + e)
    });
    let data = resp.data
    data.sort((a,b) => {
      a = a.date.split('-').join('')
      b = b.date.split('-').join('')
      return a > b ? -1 : a<b ? 1 : 0
    });
    console.log('expenses', data)
    return data
  } catch {
    console.log('Error - unable to fetch expenses')
    return null
  }
};


export function ExpensesPage(props) {
  const {cats} = useContext(UserContext);
  const expenses = useLoaderData();

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
    }
  }, [filterObj])

  return (
    <>
      <Helmet>
        <title>Expenses</title>
      </Helmet>
      <Outlet context={{'all': currentList, 'filter': [filterObj, setFilterObj], 'cats': cats}} />
      
    </>
  )
}

