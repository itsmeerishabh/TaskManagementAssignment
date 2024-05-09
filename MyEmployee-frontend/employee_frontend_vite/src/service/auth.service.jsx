import axios from "axios";
import useAxiosInstance from "../redux/axiosInstance";

const API_URL = "http://localhost:5001";

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}


const login = async (username, password) => {
 
    const { instance }=useAxiosInstance();

  const payload={
    "email":username,
    "password":password
  }

  const response = await instance
    .post("/api/user/login", payload, config);
  if (response.status===200) {
    
    localStorage.setItem("name", response.data.name);
    localStorage.setItem("token", response.data.accessToken);
   
    //const token = response.data.jwt;
    //localStorage.setItem("state",)
    //settingtocken(token);
    
    // if(response.data.userdto.role=="USER")
    //   navigate("/user")
    // if(response.data.userdto.role=="ADMIN")
    //   navigate("/admin")
    // if(response.data.userdto.role=="VENDOR")
    //   navigate("/vendor")
  }
  return response.data;
};

// const logout = () => {
//   localStorage.removeItem("user");
//};

// const getCurrentUser = () => {
//   return (localStorage.getItem("user"));
// };

/*const verifyAccessToken = () => {
  return axios.get(API_URL + "/verify/accessToken?token=" + getCurrentUser().accessToken)
}

const getRefreshAccessToken = () => {
  const refreshToken = getCurrentUser().refreshToken
  return axios({
    method: 'post',
    url: API_URL + "/token/refresh",
    headers: { Authorization: 'Bearer ' + refreshToken },
    data: {
    }
  });
}*/

export default {
  login,
  //logout,
  //getCurrentUser,
  //verifyAccessToken, 
  //getRefreshAccessToken
};