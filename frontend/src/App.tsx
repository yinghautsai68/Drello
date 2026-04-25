import { Navigate, Route, Routes } from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App