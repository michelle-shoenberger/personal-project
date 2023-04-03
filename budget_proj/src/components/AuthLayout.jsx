import { Navigate, Outlet } from "react-router-dom"

export default function AuthLayout(props) {

  if (!props.user) {
    return <Navigate to={"/login"} replace />;
  } else {
    return (
      <>
        <Outlet />
      </>
    )
  }
};