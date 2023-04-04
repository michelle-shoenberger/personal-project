import {ListGroup} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ExpenseFilter from './ExpenseFilter';
import ExpenseListItem from "../components/ExpenseListItem";



export default function ExpenseList(props) {
  
  const {all, filter, cats} = useOutletContext();
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
      <ExpenseFilter initial={filter[0]} handleFilter={filter[1]} cats={cats} />
      <h1>Expenses List</h1>
      <p> Total expense: ${total}</p>
      <ListGroup>
        {all.map((expense, index) => <ExpenseListItem key={index} expense={expense} />)}
      </ListGroup>
    </>
  )
};