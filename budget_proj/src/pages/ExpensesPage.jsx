import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import {Helmet} from 'react-helmet'
import axios from 'axios';
import ExpenseList from "../components/ExpenseList";
import ExpenseDetail from '../components/ExpenseDetail.jsx';
import ExpenseFilter from "../components/ExpenseFilter";

export default function ExpensesPage(props) {
  const navigate = useNavigate();
  // const {user, setUser} = useContext
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login')
  //   }
  // }, [user])


  const[expenses, setExpenses] = useState("")
  const [currentList, setCurrentList] = useState(null)
  const [selected, setSelected] = useState(null)
  const [filterObj, setFilterObj] = useState(null) 


  const getExpenses = async () => {
    if (expenses.length===0) {
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
        })
        //console.log(data)
        setExpenses(data)
        setCurrentList(data)
      } catch {
        console.log('Error - unable to fetch expenses')
      }
    } 
  };

  useEffect(() => {
    getExpenses()
  
  }, [])

  useEffect(() => {
    console.log('useEffect')
    console.log(filterObj)
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
      {!selected && <ExpenseFilter changeFilter={setFilterObj} cats={props.cats}/>}
      {selected ?
        <ExpenseDetail expense={selected} handleSelect={setSelected} />
        : <ExpenseList all={currentList} handleSelect={setSelected} />
      }
      
    </>
  )
}