import { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../redux/axiosInstance";
import swal from "sweetalert";
import Header from "./Header";
import photo from "../photos/a.avif"
function CreateEmployee() {

    const{instance}=useAxiosInstance();
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const form = useRef();
    const[duedate,setDuedate]=useState("");
    const [priority, setPriority] = useState("");
    const navigate = useNavigate();

    const onChangeTitle=(e)=>{
        setTitle(e.target.value);
    }

    const onChangePriority = (e) => {
        setPriority(e.target.value);
    };


    const onChangeDescription=(e)=>{
        setDescription(e.target.value);
    }

    const onChangeDuedate=(e)=>{
        setDuedate(e.target.value);
    }

    const handleEmployee= async(e)=>{
        e.preventDefault();

        const userId=localStorage.getItem("userId");
        const formData=new FormData();
        
        formData.append("title",title);
        formData.append("description",description);
        formData.append("due_date",duedate);
        formData.append("priority",priority);
        formData.append("userId",userId);

        const result = await instance
                        .post("/api/task/createTaskForUser", formData, {
                          headers: { "Content-Type": "application/json" },
                        })
                        .then((response) => {
                          console.log(response.data);

                          // Display SweetAlert and navigate after OK button is clicked
                          swal({
                            title: "Success",
                            text: response.data.message,
                            icon: "success",
                            buttons: true,
                          }).then((willNavigate) => {
                            if (willNavigate) {
                              navigate("/employeeList");
                              setTitle("");
                              setDescription("");
                              setDuedate("");
                              setPriority("");
                            }
                          });
                        })
                        .catch((err) => {
                          console.error(err);
                        });

        
    }
    return ( <>
            <div>
                <div><Header/></div>
        
  <img src={photo} className="card-img-top rounded-3 " alt="..." style={{width:"1700px",height:"980px",background:"inherit"}}/>
        <form className="employeeEnter" onSubmit={handleEmployee} ref={form}>
          <h3 style={{textAlign:"center"}}>
            <b>Save Task details</b>
          </h3>

          
  
          <div className="form-outline mb-2">
            <label className="form-label">
              Title
            </label>
            <input
              type="text"
              id="form2"
              className="form-control"
              name="title"
              placeholder="Enter your Task Title"
              value={title}
              required
              onChange={onChangeTitle}
            />
          </div>
          
          <div className="form-outline mb-2">
            <label className="form-label">
              Description
            </label>
            <input
              type="text"
              id="form4"
              className="form-control"
              name="description"
              placeholder="Enter Task Description"
              required
              value={description}
              onChange={onChangeDescription}
            />
          </div>
          
          <div className="form-outline mb-2">
            <label className="form-label">
              Due Date
            </label>
            <input
              type="text"
              id="form5"
              className="form-control"
              name="duedate"
              placeholder="Enter Task Due Date"
              required
              value={duedate}
              onChange={onChangeDuedate}
            />
          </div>

          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="designation">
                    Priority
            </label>
            <select
                    id="priority"
                    className="form-control"
                    name="priority"
                    value={priority}
                    onChange={onChangePriority}
                    required
            >
                    <option value="" disabled>
                        Select Task Priority
                    </option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
            </select>
        </div>
        
          <div className="text-center pt-1 mb-2 pb-1">
            <button className="btn btn-success btn-block fa-lg mb-3" >
              
              <span>Create Task</span>
            </button>
            
          </div>
        </form>
      </div>
    </> );
}

export default CreateEmployee;