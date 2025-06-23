import "./App.css"

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import LoginPage from "./pages/auth/Login";
import Home from "./pages/Home";
import SignupPage from "./pages/auth/Signup";
import { Toaster } from "@/components/ui/sonner"
import AdminTicketsPage from "./pages/tickets/Tickets";
import CreateTicketPage from "./pages/tickets/CreateTicket";
import AdminUsersPage from "./pages/users/Users";
import MyTickets from "./pages/tickets/MyTickets";
import {AuthProvider}  from "./middleware/AuthContext";
import PublicRoute from "./middleware/PublicRoute";
import PrivateRoute from "./middleware/PrivateRoute";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>  
    <AuthProvider>
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/auth/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
          <Route path="/tickets" element={<PrivateRoute> <AdminTicketsPage/> </PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute> <CreateTicketPage/> </PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><AdminUsersPage/> </PrivateRoute>} />
          <Route path="/mytickets" element={<PrivateRoute><MyTickets/></PrivateRoute>} />
        </Routes>
        <Toaster richColors  />
    </Router>
    </AuthProvider>
    </>
  )
}

export default App