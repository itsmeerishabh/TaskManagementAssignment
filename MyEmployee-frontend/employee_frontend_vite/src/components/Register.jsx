import { useRef ,useState} from "react";
import { useNavigate } from "react-router-dom";
//import image from "../images/landing.jpg";
import useAxiosInstance from "../redux/axiosInstance";
import './login.css';
import swal from "sweetalert";
import photo from "../photos/backgroundPhoto.jpeg"

export default function Register(props) {
    const navigate=useNavigate();
    const { instance }=useAxiosInstance();
    const form = useRef();
    const [name, setName] = useState("");
    
    const [email , setEmail] = useState("");
    
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const onChangeName = (e) => {
      let name = e.target.value;
      setName(name);
    };
    
      const onChangeEmail = (e) => {
        let email = e.target.value;
        setEmail(email);
      };
      
      const onChangePassword = (e) => {
        let password = e.target.value;
       setPassword(password);
    };
    const onChangeConfirmPassword = (e) => {
        let confirmpassword = e.target.value;
        setConfirmpassword(confirmpassword);
      };
    



      const handleRegister = (e) => {
      e.preventDefault();
      setMessage("");
      setLoading(true);

      if (password !== confirmpassword) {
        setLoading(false);
        setMessage("Passwords do not match");
        return;
      }
  
      

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        setMessage("Invalid email address");
        setLoading(false);
        return;
      }
        const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})/;
        if (!passwordRegex.test(password)) {
        setMessage("Password must contain at least one digit, one lowercase letter, one of the following special characters (#@$*), and be between 5 and 20 characters in length.");
        setLoading(false);
        return;
        }

        const payload={
          'name': name,
          
          'email': email,
          'password': password,
          
        };

        
          instance.post('/api/user/register', payload)
                .then((response) => {
                    console.log(response.data);
                    swal(email + ' added successfully \n Redirecting to Login ');
                    navigate('/login');
                })
                .catch((error) =>  {
                  //toast.error("Error")
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                  setLoading(false);
                  if(resMessage=="could not execute statement")
                  setMessage("email Already Available plz login");
                });
        
       

      
    };
  //card-img-top rounded-3
  
    return (
      <div>
        {/* <img src={photo} className="card-img-top rounded-3 fullscreen-image" alt="..." /> */}
        <img src={photo} className="card-img-top rounded-3 " alt="..." style={{width:"1700px",height:"780px"}}/>
        <form className="register" onSubmit={handleRegister} ref={form}>
          <h3>
            <b>Let's Be Part Of Our Family</b>
          </h3>
  
          <div className="form-outline mb-2">
            <label className="form-label">
              Name
            </label>
            <input
              type="text"
              id="form2"
              className="form-control"
              name="Name"
              placeholder="Enter your Name"
              value={name}
              required
              onChange={onChangeName}
            />
          </div>
          
          <div className="form-outline mb-2">
            <label className="form-label">
              Email
            </label>
            <input
              type="email"
              id="form4"
              className="form-control"
              name="email"
              placeholder="Enter your Email"
              required
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label">
              Password
            </label>
            <input type="password" id="form23" className="form-control" name="password" value={password} required placeholder="Enter your Password" onChange={onChangePassword} />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="form24"
              className="form-control"
              name="confirmPassword"
              placeholder="Re-Enter Password"
              required
              value={confirmpassword}
              onChange={onChangeConfirmPassword}
            />
          </div>
          
        
          <div className="text-center pt-1 mb-2 pb-1">
            <button className="btn btn-success btn-block fa-lg mb-3" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Register</span>
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
          </div>
        </form>
      </div>
    );
  }