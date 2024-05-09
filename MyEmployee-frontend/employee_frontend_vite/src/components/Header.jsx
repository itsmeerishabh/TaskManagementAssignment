import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import swal from "sweetalert";
import { useState, useEffect } from 'react';

export default function Header() {

    const Name=localStorage.getItem("name");
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      }, [location]);

    function handleLogin() {
    
        if (isLoggedIn) {
          localStorage.clear();
          setIsLoggedIn(false);
          swal("successfully Logged Out, Redirecting to Login page")
          navigate('/')
        } else {
            
          navigate('/login');
          
        }
      }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top">
                <div className="container-fluid">
                
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            alt="Logo"
                            className="me-3"
                            style={{ height: '48px' }}
                        />
                    </Link>
                    
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'text-primary' : ''}`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/employeeList"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'text-primary' : ''}`
                                    }
                                >
                                    Employee List
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/createEmployee"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'text-primary' : ''}`
                                    }
                                >
                                    Create Employee
                                </NavLink>
                            </li>
                        </ul>
                        {/* <div className='name' >Welcome {Name}</div> */}
                        <div className="d-flex">
                        <div style={{ marginRight: '20px' }} className='name' >Welcome {Name}</div>

                            <Link
                                to="/login"
                                className="btn btn-outline-danger me-2"
                                onClick={handleLogin}
                            >
                                Log out
                                
                            </Link>
                            {/* <Link
                                to="#"
                                className="btn btn-primary"
                            >
                                Get started
                            </Link> */}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
