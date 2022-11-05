import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import "./header.css"
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [menuClicked,setMenuClicked] = useState(false)
  
  const toggleMenuClick=() => {
setMenuClicked(!menuClicked)
  }


  const onLogout = () => {
      navigate("/login")
      dispatch(logout());
      dispatch(reset());
    
  };

  return (
    <header className="header">

      <div >
        <Link className="text-link" to="/">
          <div className="logo"></div>
        </Link>
      </div>

      {user ? (
        <div className="text-link">
          
            <FaUser /> Your friendly neighborhood chat app!
          
        </div>
      ) : (
        <><Link className="text-link" to="/login">
        <FaUser /> login to continue
      </Link></>)}

      <div>
        {user ? (

          <div>
            <div className="text-link" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </div>
          </div>

            ) : (

          <>
            <div>
              <Link className="text-link" to="/login">
                <FaSignInAlt /> Login
              </Link>
            </div>
            <div>
              <Link className="text-link" to="/register">
                <FaUser /> Register
              </Link>
            </div>
          </>)}

      </div>
    </header>
  );
};

export default Header;
// import React from "react";
// import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
// import { useSelector,useDispatch } from "react-redux";
// import { LinkContainer } from "react-router-bootstrap";
// import { useNavigate } from "react-router-dom";
// import logo from "../../app/assets/spider-logo-transperent.png"
// import { logout, reset } from "../../features/auth/authSlice";
// import "./header.css"
// function Header() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
   

//     const onLogout = () => {
//       navigate("/login")
//       dispatch(logout());
//       dispatch(reset());
    
//   };

//     return (
//         <Navbar className="header" variant="light" bg="dark" sticky="top" expand="sm">
//             <Container>
//                 <LinkContainer to="/">
//                     <Navbar.Brand>
//                         <img src={logo} style={{ width: 100, height: 100 }} />
//                     </Navbar.Brand>
//                 </LinkContainer>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="ms-auto">
//                         {!user && (
//                             <LinkContainer to="/login">
//                                 <Nav.Link>Login</Nav.Link>
//                             </LinkContainer>
//                         )}
//                                     <Button variant="danger" onClick={onLogout}>
//                                         Logout
//                                     </Button>
//                         <LinkContainer to="/dashboard">
//                             <Nav.Link>More</Nav.Link>
//                         </LinkContainer>
//                         {user && (
//                             <NavDropdown
//                                 // title={
//                                 //     <>
//                                 //         <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
//                                 //         {user.name}
//                                 //     </>
//                                 // }
//                                 // id="basic-nav-dropdown"
//                             >

//                                 <NavDropdown.Item>
//                                 <Button variant="danger" >
//                                         Profile
//                                     </Button>
//                                 </NavDropdown.Item>
//                                 <NavDropdown.Item>
//                                 <Button variant="danger" >
//                                         Contact
//                                     </Button>
//                                 </NavDropdown.Item>
//                                 <NavDropdown.Item>
//                                 <Button variant="danger" >
//                                         About Us
//                                     </Button>
//                                 </NavDropdown.Item>
//                             </NavDropdown>
//                         )}
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }

// export default Header;




