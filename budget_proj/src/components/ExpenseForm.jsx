import { useState, useEffect, useContext } from "react"
import {useNavigate} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { createExpense } from "../api/expenseCalls";


export default function ExpenseForm() {

  const types = ['USD', 'EUR', 'CAD']
  const {cats} = useContext(UserContext);
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [type, setType] = useState(types[0]);
  const [cat, setCat] = useState(cats ? cats[0].id : "");
  const [date, setDate] = useState("");
  const [des, setDes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCat(cats ? cats[0].id : "")
  }, [cats])

  const handleSubmit = async (e) => {
    console.log('submit')
    e.preventDefault()
    let formData = new FormData(e.target)
    console.log('form', formData)
    let resp = await createExpense(formData);
    if (resp){
      console.log(resp)
      navigate('/expenses')
    } else {
      console.log('fail')
      alert("Please enter a valid expense.")
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlID="item_name">
        <Form.Label>Name:</Form.Label>
        <Form.Control type='text' name='item_name' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
      </Form.Group>
      <Form.Group controlID="cost">
        <Form.Label>Cost: </Form.Label>
        <Form.Control type='float' name='cost' placeholder='Cost' value={cost} onChange={(e)=>setCost(e.target.value)} />
      </Form.Group>
      <Form.Group controlID="currency">
        <Form.Label>Currency type:</Form.Label>
        <Form.Select value={type} name="type" onChange={(e)=> setType(e.target.value)}>
          {types && types.map((t, i) => <option value={t} key={i}>{t}</option>)}
        </Form.Select>
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
      <Button type="submit" className="mt-2" variant="success">Submit</Button>
    </Form>
  )
}