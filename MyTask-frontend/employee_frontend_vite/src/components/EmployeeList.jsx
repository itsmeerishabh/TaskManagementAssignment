import Header from "./Header";
import useAxiosInstance from "../redux/axiosInstance";
import { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Swal from "sweetalert2";
import './login.css';

function EmployeeList() {

    const { instance } = useAxiosInstance();
    const[task,setTask]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Assuming the API provides the total number of pages
        
    useEffect(() => {
      // Get the userId from local storage
      const userId = localStorage.getItem('userId');
      
      // Check if userId exists before making the request
      if (userId) {
        instance.get(`/api/task/getAllTask`, {
          params: {
            user_id: userId, // Pass userId as a query parameter
            page: currentPage
          },
        })
          .then(response => {
            setTask(response.data.tasks); // Update the state with the fetched task
            setTotalPages(response.data.totalPages || 1); // Use totalPages if provided by API
            
          })
          .catch(error => {
            console.error('Error fetching task:', error);
          });
      } else {
        console.error('User ID not found in local storage');
      }
    }, [currentPage]);
    
    const deleteItem = async (itemId) => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
  
        if (result.isConfirmed) {
          const response = await instance.delete(
            `/api/task/deleteTask?id=${itemId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          if (response.status === 200) {
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
            setTask((prevTasks) =>
              prevTasks.filter((task) => task._id !== itemId)
            );
          } else {
            Swal.fire("Error", "Failed to delete the task.", "error");
          }
        }
      } catch (error) {
        Swal.fire("Error", `An error occurred: ${error.message}`, "error");
      }
    };

    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };

    return ( <>
    <div><Header/></div>
    
    <div className="container-fluid " style={{ width: '1500px', border:'1px solid black' }} >
            {/* Header row */}
            <div className="row fw-bold bg-blue-500 border border-black flex items-center justify-center pt-2">
                <div className="col-md-1 text-center">Title</div>
                <div className="col-md-5 text-center">Description</div>
                <div className="col-md-1 text-center">Due Date</div>
                <div className="col-md-1 text-center">Status</div>
                <div className="col-md-1 text-center">Priority</div>
                <div className="col-md-3 text-center">Action</div>
            </div>
            
            {/* Data rows */}
            {task.map((item) => (
                <div className="row border d-flex align-self-center justify-content-center h-40" key={item._id}>
                    <div className="col-md-1 text-center d-flex align-self-center justify-content-center">{item.title}</div>
                    <div className="col-md-5 text-center d-flex align-self-center justify-content-center">{item.description}</div>
                    <div className="col-md-1 text-center d-flex align-self-center justify-content-center">{item.due_date}</div>
                    <div className="col-md-1 text-center d-flex align-self-center justify-content-center capitalize">{item.status}</div>
                    {/* <div className="col-md-1 text-center d-flex align-self-center justify-content-center capitalize">{item.priority}</div> */}
                    <div className="col-md-1 text-center d-flex align-self-center justify-content-center capitalize">
                      <span className={`priority-${item.priority.toLowerCase()}`}>
                        {item.priority}
                      </span>
                    </div>
                    <div className="col-md-3 text-center d-flex align-self-center justify-content-center gap-2 py-2">
                        {/* <Link to={`/`}><Button color="primary">View</Button></Link> */}
                        <Link to={`/taskDetails/${item._id}`} state={{ task: item }}>
                          <Button color="primary">View</Button>
                        </Link>

                        <Link to={`/updateEmployee/${item._id}` }  state={{ task: item }} ><Button color="warning">Update</Button></Link>
                        <Button color="danger" onClick={()=>deleteItem(item._id)}>Delete</Button>

                    </div>
                </div>
            ))}

            
        </div>
        {/* Pagination */}
        <div className="pagination-container">
          <div className="pagination">
              <Button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              <span className="mx-3">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
          </div>
        </div>
        
    </> );
}

export default EmployeeList;