import React, { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import AuthService from '../service/auth.service'
//import UserService from '../../service/user-service'
import './login.css';
import photo from "../photos/backgroundPhoto.jpeg"


export default function UserLogin(props) {
  const navigate=useNavigate();
  //const dispatch= useDispatch();
  const form = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  //const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);


  const onChangeUsername = (e) => {
    let username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    let password = e.target.value;
    setPassword(password);
  };

  
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    //form.current.validateAll();
    
      AuthService.login(username, password).then(
        (response) => {
        //  toast.success("Login Successfull",{
        //   position: "top-right"});

         localStorage.setItem("isLoggedIn",true)
            navigate("/dashboard");
         
      },
        (error) => {
          //toast.error("Error")
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
  };

  return (
    <div>
      
      <img src={photo} className="card-img-top rounded-3 " alt="..." style={{width:"1700px",height:"780px"}}/>

      {/* <ToastContainer/> */}
      <form className="login" onSubmit={handleLogin} ref={form}>
        <h3>
          <b>Login to your account</b>
        </h3>

        <div className="form-outline mb-2">
          <label className="form-label">
            Email ID
          </label>
          <input
            type="email"
            id="form2"
            className="form-control"
            name="Email"
            placeholder="Enter your Email"
            value={username}
            required
            onChange={onChangeUsername}
          />
        </div>

        <div className="form-outline mb-2">
          <label className="form-label">
            Password
          </label>
          <input type="password" id="form23" className="form-control" name="password" value={password} required placeholder="Enter your Password" onChange={onChangePassword} />
        </div>

        <div className="text-center pt-1 mb-2 pb-1" >
          <button className="btn btn-success btn-block fa-lg mb-3" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          {/* <button class="btn btn-success btn-block fa-lg mb-3" type="button">
            Log in
          </button> */}
          {/* <a className="text-muted" onClick={()=>navigate('/forget')}>
            Forgot password?
          </a> */}

        </div>

        <div className="d-flex align-items-center justify-content-center pb-2">
          <p className="mb-2 me-2" style={{color:"blue" }}>Don't have an account?</p>
          <button type="button" className="btn btn-outline-danger" style={{backgroundColor:"white"}}>
            <Link to="/Register" style={{color:"blue", }}>Create new</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
