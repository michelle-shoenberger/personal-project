import {ListGroup} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ExpenseListItem from "../components/ExpenseListItem";


export default function ExpenseList(props) {
  // props - all, handleSelect
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (props.all) {
      setTotal(() => {
        console.log(props.all)
        let total = 0;
        for (let i=0; i<props.all.length; i++) {
          total += parseFloat(props.all[i].cost);
        }
        return Math.round(total*100)/100
      });
    } else {
      setTotal(0)
    }
    
  }, [props.all])

  return (
    <>
      <h1>Expenses List</h1>
      <p> Total expense: ${total}</p>
      <ListGroup>
        {props.all && props.all.map((expense, index) => <ExpenseListItem key={index} expense={expense} handleSelect={props.handleSelect} />)}
      </ListGroup>
    </>
  )
};