import {ListGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom';

export default function ExpenseListItem(props) {
  //expense object as prop - pull item_name, date, cost
  return (
    <ListGroup.Item as={Link} to={`${props.expense.id}`} className='d-flex justify-content-center'>
      <div className='col-4'>{props.expense.item_name}</div>
      <div className='col-4 text-center'>{props.expense.date}</div>
      <div className='col-4 text-end'>${props.expense.cost}</div>
    </ListGroup.Item>
  )
};

// onClick={() => handleSelect(expense)}