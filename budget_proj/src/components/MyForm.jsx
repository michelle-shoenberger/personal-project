import { Form } from "react-bootstrap"
import { useState } from "react";

export default function MyForm(props) {
  // model - pass in an object to create form, with instance to prefill
  // fields - object with type and placeholder
  // followon - function
  // works for input and textarea, select
  const [choice, setChoice] = useState(null)
  
  const createForm = () => {
    let formFields = [];
    for (let field in props.model){
      if (props.model[field] === 'textarea') {
        formFields.push(<textarea name={field} placeholder={field}></textarea>)
      } else if (props.model[field] === 'select' && props.choices) {
        formFields.push(
          <select onChange={(e)=> setChoice(e.target.value)}>
            {props.choices.map((choice) => <option value={choice.id}>{choice.name}</option>)}
          </select>
        )
      } else {
        formFields.push(<input type={props.model[field]} name={field} placeholder={field} />)
      }
    }
    formFields.push( <button type="submit" className="btn btn-primary">Submit</button>)
    return formFields
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target)
    console.log(e.target)
    if (choice) {
      console.log('select');
      formData.append('category', choice)
    }
    props.followOn(formData, props.endpoint)
  };

  return (
    <Form className="myform d-flex flex-column align-items-center" onSubmit={handleSubmit}>
        {createForm()}
    </Form>
  )
}


