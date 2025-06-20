import { Navigate, Route,Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import { useState,useEffect } from "react";
import axios from 'axios';

function App() {
  const [userDetails,setUserDetails] = useState(null);

  const updateUserDetails = (updatedData) =>{
    setUserDetails(updatedData);
  }

  const isUserLoggedIn = async () =>{
    try{
      const response = await axios.post('http://localhost:5000/auth/is-user-logged-in',{},{ withCredentials: true});
      updateUserDetails(response.data.userDetails);
    }catch(error){
      console.log("Error checking user login status:", error);
    }
  }
  useEffect(() => {
    isUserLoggedIn();
  },[]);

  return (
    // <AppLayout>
      <Routes>
        <Route path="/" element={userDetails ? <Navigate to ='/dashboard' />:<AppLayout><Home/></AppLayout>} />
        <Route path="/login" element={userDetails ? <Navigate to='/dashboard'/> : <AppLayout><Login updateUserDetails={updateUserDetails} /></AppLayout>} />
        <Route path="/dashboard" element={userDetails ? <AppLayout><Dashboard updateUserDetails={updateUserDetails}/></AppLayout> : <Navigate to='/login'/> }/>
      </Routes>
    // // </AppLayout>
  );
}

export default App;
