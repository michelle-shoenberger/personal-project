import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useLoaderData } from "react-router-dom"
import { Helmet } from "react-helmet"
import { getProfile } from "../api/budgetCalls"

export const profileLoader = async () => {
  let resp = await getProfile();
}

export function ProfilePage() {
  const {user, setUser, cats} = useContext(UserContext);
  const budgets = useLoaderData();

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
    </>
  )
}