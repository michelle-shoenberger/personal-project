import { useState, useEffect, useContext } from "react"
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { createExpense } from "../api/expenseCalls";


export default function ExpenseForm() {
  // const getTodaysDate = () => {
  //   let d = new Date();
  //   console.log(d)
  //   return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
  // }

  const types = ['USD', 'EUR', 'CAD']
  const {cats} = useContext(UserContext);
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [type, setType] = useState(types[0]);
  const [cat, setCat] = useState(cats ? cats[0].id : "");
  const [date, setDate] = useState("");
  const [des, setDes] = useState("");
  

  useEffect(() => {
    setCat(cats ? cats[0].id : "")
  }, [cats])

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(date)
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
    <form className="myform d-flex flex-column align-items-center" onSubmit={(e) => handleSubmit(e)}>
      <input type='text' name='item_name' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type='float' name='cost' placeholder='Cost' value={cost} onChange={(e)=>[console.log(date),setCost(e.target.value)]}/>
      <input type="date" name='date' value={date} onChange={(e)=>setDate(e.target.value)} />
      <select value={type} name='type' onChange={(e)=> setType(e.target.value)}>
        {types && types.map((t) => <option value={t}>{t}</option>)}
      </select>
      <select value={cat} name='category' onChange={(e)=> setCat(e.target.value)}>
        {cats && cats.map((choice) => <option value={choice.id}>{choice.name}</option>)}
      </select>
      <textarea name='description' placeholder='Description' value={des} onChange={(e)=>setDes(e.target.value)}></textarea>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}