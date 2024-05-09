import { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../redux/axiosInstance";
import swal from "sweetalert";
import Header from "./Header";
import { useParams } from 'react-router-dom';
import photo from "../photos/a.avif"

function UpdateEmployee(props) {

    
    const{instance}=useAxiosInstance();
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const form = useRef();
    const[mobileNo,setMobileNo]=useState(0);
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("");
    const [image,setImage]=useState(null);
    const [id,setId]=useState("");

    const { itemId }=useParams();

    console.log(itemId)
    // console.log(itemId.name)
       // console.log(props.id);

    const onChangeId=(e)=>{
        setId(e.target.value);
    }
    const onChangeImage=(e)=>{
        setImage(e.target.files[0]);
    }

const onChangeCourse = (e) => {
    const value = e.target.value;

    // Update the state variable with the new value (checkbox selection)
    setCourse(value);
};


    const onChangeGender = (e) => {
        setGender(e.target.value);
    };


    const onChangeDesignation = (e) => {
        setDesignation(e.target.value);
    };

    const onChangeName=(e)=>{
        setName(e.target.value);
    }

    const onChangeEmail=(e)=>{
        setEmail(e.target.value);
    }

    const onChangeMobileNo=(e)=>{
        setMobileNo(e.target.value);
    }

    const handleEmployee= async(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("image",image);
        formData.append("name",name);
        formData.append("email",email);
        formData.append("mobileNo",mobileNo);
        formData.append("designation",designation);
        formData.append("gender",gender);
        formData.append("course",course);
        formData.append("id",id);

        

        const result= await instance.put(`/api/employee/${itemId}`,formData,
                            { 
                                headers:{"Content-Type":"multipart/form-data"}
                            }).then((response)=>{
                                console.log(response.data);
                                swal(response.data.message);
                                setId("");
                                setName("");
                                setEmail("");
                                setMobileNo(0);
                                setCourse("");
                                setDesignation("");
                                setImage(null);
                                setGender("");
                            }).catch((err)=>{
                                console.log(err);
                            })
        
    }
    return ( <>
            <div>
                <div><Header/></div>
        {/* <img src={image}  className="card-img-top rounded-3" alt="..." /> */}
        <img src={photo} className="card-img-top rounded-3 " alt="..." style={{width:"1700px",height:"980px",background:"inherit"}}/>
        <form className="employeeEnter" onSubmit={handleEmployee} ref={form}>
          <h3 style={{textAlign:"center"}}>
            <b>Update Employee details</b>
          </h3>

          <div className="form-outline mb-2">
            <label className="form-label">
              Id
            </label>
            <input
              type="text"
              id="form2"
              className="form-control"
              name="id"
              placeholder="Enter your Id"
              value={id}
              required
              onChange={onChangeId}
            />
          </div>
  
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
              Mobile Number
            </label>
            <input
              type="number"
              id="form5"
              className="form-control"
              name="mobileNo"
              placeholder="Enter your Mobile Number"
              required
              value={mobileNo}
              onChange={onChangeMobileNo}
            />
          </div>

          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="designation">
                    Designation
            </label>
            <select
                    id="designation"
                    className="form-control"
                    name="designation"
                    value={designation}
                    onChange={onChangeDesignation}
                    required
            >
                    <option value="" disabled>
                        Select your Designation
                    </option>
                    <option value="Hr">Hr</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
            </select>
        </div>

        <div className="form-outline mb-2">
    <label className="form-label" htmlFor="gender">
        Gender
    </label>
    <div>
        <div className="form-check">
            <input
                type="radio"
                id="genderMale"
                className="form-check-input"
                name="gender"
                value="Male"
                checked={gender === 'Male'}
                onChange={onChangeGender}
                required
            />
    <label className="form-check-label" htmlFor="genderMale">
        Male
    </label>
        </div>
        <div className="form-check">
            <input
                type="radio"
                id="genderFemale"
                className="form-check-input"
                name="gender"
                value="Female"
                checked={gender === 'Female'}
                onChange={onChangeGender}
            />
            <label className="form-check-label" htmlFor="genderFemale">
                Female
            </label>
        </div>
    </div>
</div>


<div className="form-outline mb-2">
    <label className="form-label">
        Course
    </label>
    <div>
        {/* MCA checkbox */}
        <div className="form-check">
            <input
                type="checkbox"
                id="courseMCA"
                className="form-check-input"
                name="course"
                value="MCA"
                checked={course === 'MCA'}
                onChange={onChangeCourse}
            />
            <label className="form-check-label" htmlFor="courseMCA">
                MCA
            </label>
        </div>
        
        {/* BCA checkbox */}
        <div className="form-check">
            <input
                type="checkbox"
                id="courseBCA"
                className="form-check-input"
                name="course"
                value="BCA"
                checked={course === 'BCA'}
                onChange={onChangeCourse}
            />
            <label className="form-check-label" htmlFor="courseBCA">
                BCA
            </label>
        </div>
        
        {/* BSc checkbox */}
        <div className="form-check">
            <input
                type="checkbox"
                id="courseBSc"
                className="form-check-input"
                name="course"
                value="BSc"
                checked={course === 'BSc'}
                onChange={onChangeCourse}
            />
            <label className="form-check-label" htmlFor="courseBSc">
                BSc
            </label>
        </div>
    </div>
</div>

<div className="form-outline mb-2">
    <label className="form-label" htmlFor="imageUpload">
        Image upload
    </label>
    <input
        type="file"
        id="imageUpload"
        className="form-control"
        name="image"
        accept="image/*"
        onChange={onChangeImage}
    />
</div>

{/* disabled={loading} */}
{/* {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )} */}

        
          <div className="text-center pt-1 mb-2 pb-1">
            <button className="btn btn-success btn-block fa-lg mb-3" >
              
              <span>Create Employee</span>
            </button>
            {/* {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )} */}
            {/* <button class="btn btn-success btn-block fa-lg mb-3" type="button">
              Log in
            </button> */}
          </div>
        </form>
      </div>
    </> );
}

export default UpdateEmployee;