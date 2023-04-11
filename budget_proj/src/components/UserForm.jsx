import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { updateUserBudget } from "../api/authCalls"

export default function UserForm({user}) {
  const [amount, setAmount] = useState(user ? user.budget : "")
  
  useEffect(() => {
    setAmount(user ? user.budget : "")
  },[user])

  const handleUpdate = async () => {
    let resp = await updateUserBudget(amount);
    console.log(resp)
  }

  return (
    <Form className="d-flex justify-content-center">
      <Form.Label>Total Budget: $</Form.Label>
      <Form.Control type="float" value={amount} onChange={(e)=>setAmount(e.target.value)} />
      <Button onClick={handleUpdate}>Update</Button>
    </Form>
  )
}