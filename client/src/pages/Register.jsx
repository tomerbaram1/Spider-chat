
import { Col, Container, Form, Row, Button } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import "./login.css"

function Signup() {
  const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
    
      const { name, email, password, password2 } = formData;
    
      const navigate = useNavigate();
      const dispatch = useDispatch();
    
      const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      );
    
      useEffect(() => {
        if (isError) {
          toast.error("Email is already linked with another account.");
        }
    
        if (isSuccess || user) {
          toast.success("Register Successful")
          navigate("/");
        }
    
        dispatch(reset);
      }, [user, isError, isSuccess, message, navigate, dispatch]);
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      const onSubmit = (e) => {
        e.preventDefault();
    
        if (password !== password2) {
          toast.error("Passwords do not match");
        } else {
          
          const userData = {
            name,
            email,
            password,
          };
    
          dispatch(register(userData));
        }
      };

    



    return (
        <Container>
            <Row>
                <Col md={25}  className="d-flex align-items-center justify-content-center flex-direction-column  ">
                  
                    <Form className="register-form" style={{ width: "80%", maxWidth: 500 }} onSubmit={onSubmit}>
                        <h1 className="text-center">Create account</h1>
                        <div className="signup-profile-pic__container">
                            {/* <img src={imagePreview || botImg} className="signup-profile-pic" /> */}
                            <label htmlFor="image-upload" className="image-upload-label">
                                <i className="fas fa-plus-circle add-picture-icon"></i>
                            </label>
                            {/* <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} /> */}
                        </div>
                       
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your name" onChange={onChange}  id="name" name="name" value={name}  />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={onChange} id="email"  name="email" value={email} />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={onChange} name="password" id="password" value={password} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm password" onChange={onChange} name="password2" id="password2" value={password2} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                             Signup
                        </Button>
                        <div className="py-2">
                            <p className="text-center text-secondery">
                                Already have an account ? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={3} className="stripe">
                <div class="bg"></div>
                  <div class="bg bg2"></div>
                  <div class="bg bg3"></div>

                </Col>
            </Row>
        </Container>
    );
}

export default Signup;
























// import { useState, useEffect } from "react";
// import { FaUser } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import makeToast from "../Toaster";
// import { register, reset } from "../features/auth/authSlice";
// import "./login.css"


// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     password2: "",
//   });

//   const { name, email, password, password2 } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       toast.error("Email is already linked with another account.");
//     }

//     if (isSuccess || user) {
//       toast.success("Register Successful")
//       navigate("/");
//     }

//     dispatch(reset);
//   }, [user, isError, isSuccess, message, navigate, dispatch]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (password !== password2) {
//       toast.error("Passwords do not match");
//     } else {
      
//       const userData = {
//         name,
//         email,
//         password,
//       };

//       dispatch(register(userData));
//     }
//   };
 
//   return (
//     <>
//       <section className="heading">
//         <p>
//           <FaUser /> Please create an account
//         </p>
//       </section>
//       <section className="form">
//         <form onSubmit={onSubmit}>
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               value={name}
//               placeholder="Enter your name"
//               onChange={onChange}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               value={email}
//               placeholder="Enter your email"
//               onChange={onChange}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               value={password}
//               placeholder="Enter your password"
//               onChange={onChange}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               className="form-control"
//               id="password2"
//               name="password2"
//               value={password2}
//               placeholder="Confirm password"
//               onChange={onChange}
//             />
//           </div>
//           <div className="form-group">
//             <button type="submit" className="btn btn-block">
//               Submit
//             </button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// };

// export default Register;
