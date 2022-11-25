import { useState, useEffect } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css"
import { login, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
     const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success("Logged In")
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

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };




    return (
        <Container>
            <Row>
                <Col md={4} className="login__bg"></Col>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column text-white">
                    <Form className="form" style={{ width: "80%", maxWidth: 500 }} onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={onChange} id="email" name="email" value={email} required />
                            <Form.Text className="text-secondery">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={onChange} id="password" name="password" value={password} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                        <div className="py-4">
                            <p className="text-center">
                                Don't have an account ? <Link to="/register">Signup</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;







































// import { useState, useEffect } from "react";
// import { FaSignInAlt } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./login.css"

// import { login, reset } from "../features/auth/authSlice";
// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const { email, password } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }

//     if (isSuccess || user) {
//       toast.success("Logged In")
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

//     const userData = {
//       email,
//       password,
//     };
//     dispatch(login(userData));
//   };



//   return (
//     <>
//       <section className="heading">
//         <p>
//           Please Login to continue
//         </p>
//       </section>
//       <section className="form">
//         <form onSubmit={onSubmit}>
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
//             <button type="submit" className="btn btn-block">
//               Submit
//             </button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// };

// export default Login;
