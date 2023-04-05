import { useState } from "react"


export default function ExpenseForm(props) {
  // props.choices for select (cats)
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [type, setType] = useState("");
  const [cat, setCat] = useState(5);

  const handleSubmit = (e) => {
    console.log('submit')
    e.preventDefault()
    let formData = new FormData(e.target)
    formData.append('category', cat)
    console.log('form', formData)
    props.handleSubmit(formData)
  }

  return (
    <form className="myform d-flex flex-column align-items-center" onSubmit={(e) => handleSubmit(e)}>
      <input type='text' name='item_name' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type='float' name='cost' placeholder='Cost' value={cost} onChange={(e)=>setCost(e.target.value)}/>
      <input type='text' name='type' placeholder='Currency type' value={type} onChange={(e)=>setType(e.target.value)}/>
      <select value={cat} onChange={(e)=> setCat(e.target.value)}>
        {props.choices.map((choice) => <option value={choice.id}>{choice.name}</option>)}
      </select>
      <textarea name='description' placeholder='Description'></textarea>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}