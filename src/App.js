import { Route,Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import AppLayout from "./Layout/AppLayout";
function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
