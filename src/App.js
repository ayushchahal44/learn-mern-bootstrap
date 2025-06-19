import { Navigate, Route,Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

function App() {
  const [userDetails,setUserDetails] = useState(null);

  const updateUserDetails = (updatedData) =>{
    setUserDetails(updatedData);
  }

  return (
    // <AppLayout>
      <Routes>
        <Route path="/" element={userDetails ? <Navigate to ='/dashboard' />:<AppLayout><Home/></AppLayout>} />
        <Route path="/login" element={userDetails ? <Navigate to='/dashboard'/> : <AppLayout><Login updateUserDetails={updateUserDetails} /></AppLayout>} />
        <Route path="/dashboard" element={userDetails ? <Dashboard/> : <Navigate to='/login'/> }/>
      </Routes>
    // </AppLayout>
  );
}

export default App;
