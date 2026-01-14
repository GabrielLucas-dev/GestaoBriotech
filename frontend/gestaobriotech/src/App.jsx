import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard'
import Login from "./components/login/Login";
import AddTask from "./pages/addTask/AddTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/add_task" element={<AddTask />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
