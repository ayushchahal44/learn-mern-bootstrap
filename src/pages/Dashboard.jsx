import axios from 'axios';
function Dashboard({updateUserDetails}) {
    const handleLogout =()=> {
    const response = axios.post('http://localhost:5000/auth/logout',{},{withCredentials: true});
    console.log("Logout response:", response);
    updateUserDetails(null);
}
  return (
    <div className='container text-center'>
      <button className='btn btn-primary mt-5 mb-5' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
