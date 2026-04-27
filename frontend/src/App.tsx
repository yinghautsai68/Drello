import { Navigate, Route, Routes } from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>


    </Routes>
  )
}

export default App