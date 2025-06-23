import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Ticket,
  Search,
  Calendar,
  Award,
  MoreHorizontal,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Mock data for users
const mockUsers = [
  {
    id: 1,
    email: "john.doe@example.com",
    joinedAt: "2024-01-10T10:30:00Z",
    skills: ["JavaScript", "React", "Node.js"],
    ticketsCreated: 5,
    lastActive: "2024-01-15T14:20:00Z",
    role: "user",
  },
  {
    id: 2,
    email: "sarah.smith@example.com",
    joinedAt: "2024-01-08T09:15:00Z",
    skills: ["Python", "Django", "PostgreSQL", "AWS"],
    ticketsCreated: 3,
    lastActive: "2024-01-15T11:45:00Z",
    role: "moderator",
  },
 
];

export default function AdminUsersPage() {
  const [allUsers, setAllusers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
 
  const filteredUsers = allUsers.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

 

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleUpdateUser = async (role,email) => {  
    const dataToSubmit = {role,email}
    console.log(dataToSubmit);
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/updateuser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(dataToSubmit),
    });
    const data = await res.json()
    if(!res.ok){
       throw new Error(data.message || "Failed to fetch users");
    }
     setAllusers(prev =>
      prev.map(user =>
        user.email === email ? { ...user, role: role } : user
      )
    );
    toast.success(`User role updated to ${role}`);
    console.log(data);
  };

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/getusers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }
      setAllusers(data.users);
    }
    fetchUsers();
  }, []);

   const users = allUsers.filter((user) => user.role === "user");
  const moderators = allUsers.filter((user) => user.role === "moderator");
  const admins = allUsers.filter((user) => user.role === "admin");

  const totalUsers = allUsers.length;

  const avgUsersPerMonth =
    totalUsers > 0 ? (totalUsers / 30).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-gray-50">
  
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">View and manage all registered users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Moderators
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {moderators.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Ticket className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Admins
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {admins.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MoreHorizontal className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Avg users per month
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {avgUsersPerMonth}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by email or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="space-y-4">
          <div className="grid gap-4">
            <Tabs defaultValue="users" className="w-full rounded-lg shadow-sm">
              <TabsList className="w-full bg-gray-200">
                <TabsTrigger className="p-4" value="users">
                  Users ({users.length})
                </TabsTrigger>
                <TabsTrigger className="p-4" value="moderator">
                  Moderators ({moderators.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent className="p-3" value="users">
                {users.map((user) => (
                  <Card
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">
                                {user.email.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {user.email}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    Joined {formatDate(user?.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Skills:
                              </p>
                              {user.skills.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {user.skills.map((skill, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="p-2 -ml-1 text-xs"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500 italic">
                                  No skills specified
                                </p>
                              )}
                            </div>
                              </div>
                              <div className="flex items-center gap-1 space-x-2">
                                     
                                        <div className="grid gap-4">
                                          <div className="grid gap-3">
                                            <DropdownMenu>
                                              <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm" className="ring-1 ring-gray-400 cursor-pointer">
                                                  Change Role
                                                </Button>
                                              </DropdownMenuTrigger>
                                              <DropdownMenuContent className="w-56">
                                                <DropdownMenuLabel>
                                                  Panel Position
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuRadioGroup
                                                  value={user.role}
                                                  onValueChange={(value) => handleUpdateUser(value,user.email)}
                                                >
                                                  <DropdownMenuRadioItem value="admin">
                                                    Admin
                                                  </DropdownMenuRadioItem>
                                                  <DropdownMenuRadioItem value="moderator">
                                                    Moderator
                                                  </DropdownMenuRadioItem>
                                                  <DropdownMenuRadioItem value="user">
                                                    User
                                                  </DropdownMenuRadioItem>
                                                </DropdownMenuRadioGroup>
                                              </DropdownMenuContent>
                                            </DropdownMenu>
                                          </div>
                                        </div>
                                  
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent className="p-3" value="moderator">
                {moderators.map((user) => (
                  <Card
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">
                                {user.email.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {user.email}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    Joined {formatDate(user?.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                        

                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex w-full justify-between space-x-2">
                                <div className="flex items-center space-x-1">
                                     <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Skills:
                              </p>
                              {user.skills.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {user.skills.map((skill, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="p-2 -ml-1 text-xs"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500 italic">
                                  No skills specified
                                </p>
                              )}
                            </div>
                                </div>
                                <div className="flex items-center gap-1 space-x-2">
                                <div className="grid gap-4">
                                          <div className="grid gap-3">
                                            <DropdownMenu>
                                              <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm" className="ring-1 ring-gray-400 cursor-pointer">
                                                  Change Role
                                                </Button>
                                              </DropdownMenuTrigger>
                                              <DropdownMenuContent className="w-56">
                                                <DropdownMenuLabel>
                                                  Panel Position
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuRadioGroup
                                                  value={user.role}
                                                  onValueChange={(value) => handleUpdateUser(value,user.email) }
                                                >
                                                  <DropdownMenuRadioItem value="admin">
                                                    Admin
                                                  </DropdownMenuRadioItem>
                                                  <DropdownMenuRadioItem value="moderator">
                                                    Moderator
                                                  </DropdownMenuRadioItem>
                                                  <DropdownMenuRadioItem value="user">
                                                    User
                                                  </DropdownMenuRadioItem>
                                                </DropdownMenuRadioGroup>
                                              </DropdownMenuContent>
                                            </DropdownMenu>
                                          </div>
                                        </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {filteredUsers.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Users Found
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? "No users match your search criteria. Try adjusting your search terms."
                    : "No users have signed up yet."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
