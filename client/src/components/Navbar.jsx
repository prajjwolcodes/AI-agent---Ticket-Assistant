import {
  ArrowLeft,
  CreativeCommons,
  LogOut,
  Newspaper,
  Ticket,
  TicketIcon,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/middleware/AuthContext";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const { logout } = useAuth();

  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      console.log(role);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      logout();
    }
  }

  return token ? (
    <nav className="border-b bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Ticket className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TicketAI</span>
          </Link>
          <div>
            {role === "admin" && (
              <Link to="/users">
                <Button variant="ghost" className="cursor-pointer">
                  Users
                </Button>
              </Link>
            )}
            {role === "user" && (
              <Link to="/create">
                <Button variant="ghost" className="cursor-pointer">
                  Create
                </Button>
              </Link>
            )}
            {role === "user" && (
              <Link to="/mytickets">
                <Button variant="ghost" className="cursor-pointer">
                  My Tickets
                </Button>
              </Link>
            )}
            {role === "moderator" && (
              <Link to="/tickets">
                <Button variant="ghost" className="cursor-pointer">
                  Assigned Tickets
                </Button>
              </Link>
            )}
            {role === "admin" && (
              <Link to="/tickets">
                <Button variant="ghost" className="cursor-pointer">
                  All Tickets
                </Button>
              </Link>
            )}

            <Link
              to="/auth/login"
              onClick={() => {
                localStorage.removeItem("token");
                logout();
                toast.success("Logged out successfully! ");
              }}
            >
              <Button variant="ghost" className="cursor-pointer">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <nav className="border-b bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Ticket className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TicketAI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/auth/login">
              <Button variant="ghost" className="cursor-pointer">
                Login
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button className="cursor-pointer">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
