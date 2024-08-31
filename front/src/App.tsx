import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Room from './pages/Room'
import Register from './pages/Register'
import { useUserContext } from './contexts/user';




function App() {
  const { user } = useUserContext();

  return (
    <Routes>
      <Route path="/" element={user ? <Room /> : <Navigate to="/login" />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
    </Routes>
  )
}

export default App
