import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminBoardLayout from "./components/admin/AdminBoardLayout";
import { AuthProvider } from "./components/common/AuthContext";
import CustomerBoardLayout from "./components/customer/CustomerBoardLayout";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ReservationProvider } from "./components/common/BookingContext";
import MainBoard from "./components/admin/MainBoard";
import PersonelBoard from "./components/admin/PersonelBoard";
import RoomBoard from "./components/admin/RoomBoard";
import ReservationBoard from "./components/admin/ReservationBoard";
import TaxBoard from "./components/admin/TaxBoard";
import InvoiceBoard from "./components/admin/InvoiceBoard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route
              path="/clientboard"
              element={
                <ReservationProvider>
                  <CustomerBoardLayout />
                </ReservationProvider>
              }
            />
            <Route path="/adminboard" element={<AdminBoardLayout />}>
              <Route path="mainboard" element={<MainBoard />} />
              <Route path="personel" element={<PersonelBoard />} />
              <Route path="room" element={<RoomBoard />} />
              <Route path="reservation" element={<ReservationBoard />} />
              <Route path="tax" element={<TaxBoard />} />
              <Route path="invoice" element={<InvoiceBoard />} />
            </Route>
            {/* Otras rutas protegidas */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
