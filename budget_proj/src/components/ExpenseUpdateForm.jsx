import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { updateExpense } from "../api/expenseCalls";


export default function ExpenseUpdateForm({current, expenses, changeExpenses}) {
  const {cats} = useContext(UserContext);

  const [name, setName] = useState(current ? current.item_name : "");
  const [cost, setCost] = useState(current ? current.cost :0);
  const [cat, setCat] = useState(current ? current.category : (cats ? cats[0].id : ""));
  const [date, setDate] = useState(current ? current.date :"");
  const [des, setDes] = useState(current ? current.description :"");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log('submit')
    e.preventDefault()
    let formData = new FormData(e.target)
    formData.append('id', current.id)
    console.log('form', formData)
    let resp = await updateExpense(formData);
    if (resp){
      console.log('ans', resp.data)
      changeExpenses(expenses.map((expense) => {
        if (expense.id === resp.data.id) {
          return resp.data
        } else {
          return expense
        }
      }))
      navigate('/expenses')
    } else {
      console.log('fail')
      alert("Please enter a valid expense.")
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlID="item_name">
        <Form.Label>Name:</Form.Label>
        <Form.Control type='text' name='item_name' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
      </Form.Group>
      <Form.Group controlID="cost">
        <Form.Label>Cost: (USD)</Form.Label>
        <Form.Control type='float' name='cost' placeholder='Cost' value={cost} onChange={(e)=>setCost(e.target.value)} />
      </Form.Group>
      <Form.Group controlID="date">
        <Form.Label>Date:</Form.Label>
        <Form.Control type='date' name='date' value={date} onChange={(e)=>setDate(e.target.value)} />
      </Form.Group>
      <Form.Group controlID="cat">
        <Form.Label>Category:</Form.Label>
        <Form.Select value={cat} name="category" onChange={(e)=> setCat(e.target.value)}>
          {cats && cats.map((choice) => <option value={choice.id}>{choice.name}</option>)}
        </Form.Select>
      </Form.Group>
      <Form.Group controlID="description">
        <Form.Label>Description:</Form.Label>
        <Form.Control as="textarea" rows={3}name='description' placeholder='Description' value={des} onChange={(e)=>setDes(e.target.value)} />
      </Form.Group>
      <Button type="submit">Update</Button>
    </Form>
  )
}

