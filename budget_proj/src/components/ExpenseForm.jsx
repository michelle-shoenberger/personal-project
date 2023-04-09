import { useState, useContext } from "react"
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { createExpense } from "../api/expenseCalls";


export default function ExpenseForm() {
  const types = ['USD', 'EUR', 'CAD']
  const {cats} = useContext(UserContext);
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [type, setType] = useState(types[0]);
  const [cat, setCat] = useState(cats ? cats[0].id : "");
  const [des, setDes] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log('submit')
    e.preventDefault()
    let formData = new FormData(e.target)
    formData.append('category', cat)
    formData.append('type', type)
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
    <form className="myform d-flex flex-column align-items-center" onSubmit={(e) => handleSubmit(e)}>
      <input type='text' name='item_name' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type='float' name='cost' placeholder='Cost' value={cost} onChange={(e)=>setCost(e.target.value)}/>
      <select value={type} onChange={(e)=> setType(e.target.value)}>
        {types && types.map((t) => <option value={t}>{t}</option>)}
      </select>
      <select value={cat} onChange={(e)=> setCat(e.target.value)}>
        {cats && cats.map((choice) => <option value={choice.id}>{choice.name}</option>)}
      </select>
      <textarea name='description' placeholder='Description' value={des} onChange={(e)=>setDes(e.target.value)}></textarea>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}