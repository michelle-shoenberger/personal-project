import {Navbar, Nav, Container, Form, Button} from 'react-bootstrap';
import {NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import {UserContext} from '../context/UserContext';

export default function AppNav() {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const logOff = () => {
        console.log('log-off')
        Cookies.remove('token')
        delete axios.defaults.headers.common["Authorization"]
        setUser(null)
        navigate("/login")
    }
  
    const makeButtons = () => {
        if (user) {
            return ([
                <Button as={NavLink} to="/profile" variant="primary" className="ms-5 order-lg-3">My Profile</Button>, 
                <Button as={NavLink} to="/" variant="danger" className="ms-5 order-lg-3" onClick={logOff}>Log out</Button>
            ])
        } else {
            return (<Button as={NavLink} to="/login" variant="primary" className="ms-5 order-lg-3">Sign in!</Button>)
        }
    };

    return (
        <Navbar variant="light" bg="light" expand="lg" fixed="top" collapseOnSelect>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                {makeButtons()}
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Navbar.Brand eventKey="1"  className="text-start " as={NavLink} to="/">Beyond Budget</Navbar.Brand>
                        <Nav.Link eventKey="2"  className="text-start" as={NavLink} to="/expenses" >Expenses</Nav.Link>
                        <Nav.Link eventKey="3"  className="text-start" as={NavLink} to="/history" >History</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}