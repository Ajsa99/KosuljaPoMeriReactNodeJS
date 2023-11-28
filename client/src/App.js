import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Page/Home';
import Registration from './Page/Registration/Registration';
import Login from './Page/Registration/Login';
import { ResetPassword } from './Page/Registration/ResetPassword';
import { AuthContext } from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from "./Page/Registration/image/KosuljaPoMeriLogo1.png"
import { SlBasket } from 'react-icons/sl';
import { SlSocialInstagram, SlSocialFacebook } from 'react-icons/sl';
import { RiUser3Line } from 'react-icons/ri';
import footerlogo from "./Page/Registration/image/KosuljaPoMeriLogo2.png"
import { ProfileUser } from './Page/ProfileUser/ProfileUser';
import CreateShirt from './Page/CreateShirt/CreateShirt';
import { Basket } from './Page/Basket/Basket';
import { ShirtMeasurements } from './Page/CreateShirt/ShirtMeasurements';
import { Meter } from './Page/CreateShirt/Meter';
import { Standard } from './Page/CreateShirt/Standard';
import { AboutUs } from './Page/AboutUs/AboutUs';
import { Contact } from './Page/Contact/Contact';
import { EditUser } from './Page/ProfileUser/User/EditUser';
import { ViewUser } from './Page/ProfileUser/Admin/ViewUser';
import { ViewUser1 } from './Page/ProfileUser/Employee/ViewUser1';
import { NewPassword } from './Page/Registration/NewPassword';
import { NewProduct } from './Page/CreateShirt/NewProduct';
import { BasketHistory } from './Page/Basket/BasketHistory';
import { OrderPending } from './Page/ProfileUser/Employee/OrderPending';
import { OrderProcess } from './Page/ProfileUser/Employee/OrderProcess';
import { OrderCompleted } from './Page/ProfileUser/Employee/OrderCompleted';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, NavDropdown, Navbar, Nav } from "react-bootstrap";
import { Verify } from './Page/Registration/Verify';
import { GraphQL } from './GraphQL/GraphQL';


function App() {

  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    status: false,
  });
  useEffect(() => {
    axios.get("http://localhost:5000/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          status: true,
        });
        console.log(response);
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", id: 0, status: false });
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Navbar collapseOnSelect expand="lg" bg="white" variant="black" style={{ fontSize: '15px' }}>
            <Container>
              <Navbar.Brand><img src={logo} alt="Logo" width='150' /></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Početna</Nav.Link>
                  {authState.status && <Nav.Link as={Link} to={`/createshirt/${authState.id}`}>Kreiraj košulju</Nav.Link>}
                  {authState.status && <Nav.Link as={Link} to={`/contact/${authState.id}`}>Kontakt</Nav.Link>}
                  <Nav.Link as={Link} to="/aboutus">O nama</Nav.Link>
                </Nav>
                <Nav>
                  {!authState.status && <Nav.Link as={Link} to="/login">Prijavi se</Nav.Link>}
                  {!authState.status && <Nav.Link as={Link} to="/registration">Registruj se</Nav.Link>}
                  {authState.status && <Nav.Link as={Link} to={`/basket/${authState.id}`}><SlBasket /></Nav.Link>}
                  {authState.status &&
                    <NavDropdown title={<RiUser3Line />} id="collasible-nav-dropdown">
                      <NavDropdown.Item><Nav.Link as={Link} to={`/profileUser/${authState.id}`}>Profil</Nav.Link></NavDropdown.Item>
                      <NavDropdown.Item><Nav.Link onClick={logout} as={Link} to="/login">Odjavi se</Nav.Link></NavDropdown.Item>
                    </NavDropdown>
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify/:accessToken" element={<Verify />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/newPassword/:accessToken" element={<NewPassword />} />
            <Route path='/profileUser/:id' element={<ProfileUser />} />
            <Route path='/orderPending/:id' element={<OrderPending />} />
            <Route path='/orderProcess/:id' element={<OrderProcess />} />
            <Route path='/orderCompleted/:id' element={<OrderCompleted />} />
            <Route path='/createshirt/:id' element={<CreateShirt />} />
            <Route path='/newProduct/:id' element={<NewProduct />} />
            <Route path='/basket/:id' element={<Basket />} />
            <Route path='/basketHistory/:id' element={<BasketHistory />} />
            <Route path='/shirtmeasurements/:id' element={<ShirtMeasurements />} />
            <Route path='/meter/:id' element={<Meter />} />
            <Route path="/standard/:id" element={<Standard />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact/:id" element={<Contact />} />
            <Route path="/editUser/:id" element={<EditUser />} />
            <Route path="/viewUser/:id/:idUser" element={<ViewUser />} />
            <Route path="/viewUser1/:id/:idUser" element={<ViewUser1 />} />
            <Route path="/graphql" element={<GraphQL />} />
          </Routes>
          <div className='footer'>
            <img src={footerlogo} alt="Logoo" width='200' />
            <p>Telefon: 0631641854</p>
            <p>softversko.i23m@gmail.com</p>
            <div>
              <SlSocialInstagram />
              <SlSocialFacebook />
            </div>
          </div>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
