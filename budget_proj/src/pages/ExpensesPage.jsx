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

  const [currentList, setCurrentList] = useState(null)
  const [selected, setSelected] = useState(null)
  const [filterObj, setFilterObj] = useState(null) 


  // const getExpenses = async () => {
  //   if (expenses.length===0) {
  //     try{
  //       const resp = await axios.get('http://127.0.0.1:8000/expenses/')
  //       .catch((e) => {
  //         console.log("getExpense error: " + e)
  //       });
  //       let data = resp.data
  //       data.sort((a,b) => {
  //         a = a.date.split('-').join('')
  //         b = b.date.split('-').join('')
  //         return a > b ? -1 : a<b ? 1 : 0
  //       })
  //       //console.log(data)
  //       setExpenses(data)
  //       setCurrentList(data)
  //     } catch {
  //       console.log('Error - unable to fetch expenses')
  //     }
  //   } 
  // };

  useEffect(() => {
    console.log('value', expenses)
    setCurrentList(expenses)
  
  }, [])

  useEffect(() => {
    console.log('useEffect')
    console.log('filterObj', filterObj)
    if (expenses.length != 0 && filterObj) {
      const filteredLst = expenses.filter((expense) => {
        if (filterObj.by === 'name') {
          return expense.item_name.toLowerCase().includes(filterObj.word.toLowerCase())
        } else {
          if (filterObj.word === "-1") {
            return true
          }
          return expense.category === parseInt(filterObj.word)
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
      <Outlet context={[currentList, filterObj, setFilterObj, setSelected, selected]} />
      
    </>
  )
}

// {!selected && <ExpenseFilter initial={filterObj} changeFilter={setFilterObj} cats={props.cats}/>}
// {selected ?
//   <ExpenseDetail expense={selected} handleSelect={setSelected} />
//   : <ExpenseList all={currentList} handleSelect={setSelected} />