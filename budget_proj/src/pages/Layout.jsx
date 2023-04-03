import {Outlet} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import AppNav from "../components/AppNav"

export default function Layout() {
  return (
    <>
      <AppNav />
      <Container style={{marginTop: '9vh'}}>
        <Outlet />
      </Container>
    </>
  )
};