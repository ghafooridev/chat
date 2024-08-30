import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Cookie from "js-cookie"
import Login from './pages/Login'
import Room from './pages/Room'
import Register from './pages/Register'


const getAccessToken = () => {
  return Cookie.get('accessToken');
}

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!getAccessToken();
}

const ProtectedRoute = (props: { isAuthenticated: boolean }) => {
  const { isAuthenticated } = props
  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />;
  }

  return <Outlet />;
};

function App() {

  return (
    <Routes>
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated()} />}>
        <Route path="/" element={<Room />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
