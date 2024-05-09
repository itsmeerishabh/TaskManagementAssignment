import Header from "./Header";
import useAxiosInstance from "../redux/axiosInstance";
import { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';



function EmployeeList() {

    const { instance } = useAxiosInstance();
    const[employees,setEmployees]=useState([]);
    

    useEffect(() => {
        instance.get(`/api/employee`)
            .then(response => {
               setEmployees(response.data);
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        }, []);
        //

        const deleteItem= async (itemId)=>{
            try {
                 const response = await instance.delete(`/api/employee/${itemId}`, {
                   data: {"id": itemId },
                   headers: {
                     'Content-Type': 'application/json'
                   }
                 });
             
                 if (response.status === 200) {
                   // Category deleted successfully
                   console.log(`Item with ID ${itemId} has been deleted`);
                 } 
                 else {
                   // Category deletion failed
                   console.error(`Failed to delete item with ID ${itemId}`);
                 }
                 window.location.reload();
               } 
               catch (error) {
                 console.error(`An error occurred while deleting item with ID ${itemId}: ${error}`);
               }
           }

    return ( <>
    <div><Header/></div>
    
    <div className="container-fluid " style={{ width: '1500px', border:'1px solid black' }} >
            {/* Header row */}
            <div className="row fw-bold col-md-12" style={{ border:'1px solid black' }}>
                <div className="col-md-1">ID</div>
                <div className="col-md-1">Image</div>
                <div className="col-md-2">Name</div>
                <div className="col-md-2">Email</div>
                <div className="col-md-1">Mobile Number</div>
                <div className="col-md-1">Course</div>
                <div className="col-md-1">Designation</div>
                <div className="col-md-1">Gender</div>
                <div className="col-md-1">Action</div>
            </div>
            
            {/* Data rows */}
            {employees.map((item) => (
                <div className="row py-2" key={item._id}>
                    <div className="col-md-1">{item.id}</div>
                    <div className="col-md-1">
                        
                        <img
                            src={`../../public/images/${item.image}`}
                            alt={`${item.name}`}
                            className="img-thumbnail"
                            style={{ height: '100px', width: '100px' }}
                        />
                    </div>
                    <div className="col-md-2">{item.name}</div>
                    <div className="col-md-2">{item.email}</div>
                    <div className="col-md-1">{item.mobileNo}</div>
                    <div className="col-md-1">{item.course}</div>
                    <div className="col-md-1">{item.designation}</div>
                    <div className="col-md-1">{item.gender}</div>
                    <div className="col-md-2">
                    {/* itemId={item} */}
                        <Link to={`/updateEmployee/${item._id}`}  ><Button color="warning">Update</Button></Link>
                        <Button color="danger" onClick={()=>deleteItem(item._id)}>Delete</Button>

                    </div>
                </div>
            ))}
        </div>
    </> );
}

export default EmployeeList;