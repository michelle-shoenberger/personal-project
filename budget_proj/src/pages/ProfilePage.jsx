import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useLoaderData } from "react-router-dom"
import { Helmet } from "react-helmet"
import { getProfile } from "../api/budgetCalls"
import CategoryForm from "../components/CategoryForm"
import UserForm from "../components/UserForm"

export const profileLoader = async () => {
  let resp = await getProfile();
  console.log(resp)
  return resp
}

export function ProfilePage() {
  const {user, setUser, cats} = useContext(UserContext);
  const {budgets} = useLoaderData();
  

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <UserForm user={user}/>
      {budgets && cats && budgets.map((rel) => <CategoryForm category={cats.find(cat => cat.id==rel.category)} limit={rel.limit} id={rel.id}/>)}
      <h2 className="mt-3">Add a category:</h2>
      <CategoryForm />
    </>
  )
}