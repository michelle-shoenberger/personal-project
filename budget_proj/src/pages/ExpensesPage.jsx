import { useState, useEffect, useContext } from "react"
import { Outlet, useLoaderData } from "react-router-dom";
import {Helmet} from 'react-helmet'
import axios from 'axios';


export async function expensesPageLoader() {
  try{
    const resp = await axios.get('http://127.0.0.1:8000/expenses/')
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
    return {'expenses': data}
  } catch {
    console.log('Error - unable to fetch expenses')
  }
};


export function ExpensesPage(props) {
  // props - cats
  const expenses = useLoaderData()['expenses'];

  const [currentList, setCurrentList] = useState(expenses)
  const [filterObj, setFilterObj] = useState({'value': "", 'by': 'name'}) 

  useEffect(() => {
    console.log('filterObj', filterObj)
    if (filterObj) {
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
      <Outlet context={{'all': currentList, 'filter': [filterObj, setFilterObj], 'cats': props.cats}} />
      
    </>
  )
}

// {!selected && <ExpenseFilter initial={filterObj} changeFilter={setFilterObj} cats={props.cats}/>}
// {selected ?
//   <ExpenseDetail expense={selected} handleSelect={setSelected} />
//   : <ExpenseList all={currentList} handleSelect={setSelected} />