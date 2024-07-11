import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            {/* Otras rutas protegidas */}
          </Route>
        </Routes>
    </Router>
    </>
  )
}

export default App
