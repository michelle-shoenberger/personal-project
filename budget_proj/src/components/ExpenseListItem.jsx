import {ListGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom';

export default function ExpenseListItem({expense, handleSelect}) {
  //expense object as prop - pull item_name, date, cost
  return (
    <ListGroup.Item as={Link} className='d-flex justify-content-center' onClick={() => handleSelect(expense)}>
      <div className='col-4'>{expense.item_name}</div>
      <div className='col-4 text-center'>{expense.date}</div>
      <div className='col-4 text-end'>${expense.cost}</div>
    </ListGroup.Item>
  )
};