import { useState } from 'react';
import { ListGroup, Form } from 'react-bootstrap'
import { createCategory, updateCategory, deleteCategory } from '../api/categoriesCalls';
import { createBudget, updateBudget } from '../api/budgetCalls';

export default function CategoryForm({category, limit, id}) {
  const [cat, setCat] = useState(category ? category.name : "");
  const [amount, setAmount] = useState(limit ? limit : "");

  const handleCreate = async (e) => {
    e.preventDefault()
    let resp = await createCategory({'name': cat});
    console.log(resp)
    if (resp.data) {
      let resp2 = await createBudget({
        'limit': amount,
        'category': resp.data.id
      });
      console.log(resp2)
      location.reload()
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    let resp = await updateCategory({'name': cat}, category.id);
    console.log(resp)
    if (resp.data) {
      let resp2 = await updateBudget({
        'limit': amount,
        'category': resp.data.id
      }, id);
      console.log(resp2)
      location.reload()
    }
  }
  const handleDelete = async (e) => {
    e.preventDefault()
    let resp = await deleteCategory(category.id);
    console.log(resp)
    location.reload()
  };

  return (
    <ListGroup.Item>
      <Form className="d-flex justify-content-between" >
        <Form.Label>Category:</Form.Label>
        <input type='text' name='category' value={cat} onChange={(e)=> setCat(e.target.value)}/>
        <Form.Label>$</Form.Label>
        <input type='float' name='limit' value={amount} onChange={(e)=> setAmount(e.target.value)} />
        {category 
          ? <div><button type='submit' className='btn btn-primary' onClick={handleUpdate}>Update</button><button type='submit' className='btn btn-primary' onClick={handleDelete}>Delete</button></div>
          : <button type='submit' className='btn btn-primary' onClick={handleCreate} >Create</button>
        }
      </Form>
    </ListGroup.Item>
  )
}