import {ListGroup} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ExpenseFilter from './ExpenseFilter';
import ExpenseListItem from "../components/ExpenseListItem";



export default function ExpenseList(props) {
  // props - all, 
  // props for filter - initial, handleFilter
  // handleSelect
  const [all, initial, handleFilter, handleSelect, expense] = useOutletContext();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (all) {
      setTotal(() => {
        console.log(all)
        let total = 0;
        for (let i=0; i<all.length; i++) {
          total += parseFloat(all[i].cost);
        }
        return Math.round(total*100)/100
      });
    } else {
      setTotal(0)
    }
    
  }, [all])

  return (
    <>
      <ExpenseFilter initial={initial} handleFilter={handleFilter} />
      <h1>Expenses List</h1>
      <p> Total expense: ${total}</p>
      <ListGroup>
        {all && all.map((expense, index) => <ExpenseListItem key={index} expense={expense} handleSelect={handleSelect} />)}
      </ListGroup>
    </>
  )
};