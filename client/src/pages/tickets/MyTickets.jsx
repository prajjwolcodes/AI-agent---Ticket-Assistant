"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Ticket,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  User,
} from "lucide-react";
import { toast } from "sonner";

// Mock data for tickets
const mockTickets = [
  {
    id: 1,
    title: "Login page not loading properly",
    description:
      "When I try to access the login page, it shows a blank screen. I've tried refreshing multiple times but the issue persists. This started happening after the latest update.",
    status: "open",
    priority: "high",
    createdAt: "2024-01-15T10:30:00Z",
    user: "john.doe@example.com",
    aiLabels: ["authentication", "frontend", "bug"],
    requiredSkills: ["React", "JavaScript", "CSS"],
    aiNotes:
      "Likely related to recent frontend deployment. Check for JavaScript errors and CSS loading issues.",
  },
  {
    id: 2,
    title: "Database connection timeout",
    description:
      "Our application is experiencing frequent database connection timeouts, especially during peak hours. This is affecting user experience significantly.",
    status: "IN_PROGRESS",
    priority: "critical",
    createdAt: "2024-01-15T09:15:00Z",
    user: "sarah.smith@example.com",
    aiLabels: ["database", "performance", "infrastructure"],
    requiredSkills: ["Database Administration", "Performance Tuning", "DevOps"],
    aiNotes:
      "High priority issue affecting multiple users. Consider connection pooling optimization and server scaling.",
  },
  {
    id: 3,
    title: "Feature request: Dark mode",
    description:
      "It would be great to have a dark mode option for the application. Many users have requested this feature for better usability during night hours.",
    status: "open",
    priority: "low",
    createdAt: "2024-01-15T08:45:00Z",
    user: "mike.johnson@example.com",
    aiLabels: ["feature-request", "ui/ux", "enhancement"],
    requiredSkills: ["CSS", "React", "Design"],
    aiNotes:
      "Popular feature request. Consider implementing with CSS variables and context API for theme switching.",
  },
];

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const ref = useRef(null);


  const filteredTickets = tickets?.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-orange-100 text-orange-800";
      case "SOLVED":
        return "bg-green-100 text-green-800";
      case "AI_PROCESSED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    // Simulate fetching tickets from an API
    const fetchTickets = async () => {
      // In a real application, you would replace this with an API call
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        toast.error("Failed to fetch tickets");
        return;
      }
      const data = await res.json();
     setTickets(data.tickets);
     console.log(data.tickets);
    };

    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ticket Management
          </h1>
          <p className="text-gray-600">
            Review and solve tickets with AI-powered insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    AI Processed
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tickets?.filter((t) => t.status === "AI_PROCESSED").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tickets.filter((t) => t.status === "IN_PROGRESS").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Solved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tickets?.filter((t) => t.status === "SOLVED").length}
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
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tickets.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "OPEN" ? "default" : "outline"}
                  onClick={() => setFilterStatus("OPEN")}
                  size="sm"
                >
                  Open
                </Button>
                <Button
                  variant={
                    filterStatus === "IN_PROGRESS" ? "default" : "outline"
                  }
                  onClick={() => setFilterStatus("IN_PROGRESS")}
                  size="sm"
                >
                  In Progress
                </Button>
                <Button
                  variant={filterStatus === "SOLVED" ? "default" : "outline"}
                  onClick={() => setFilterStatus("SOLVED")}
                  size="sm"
                >
                  Solved
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tickets List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Tickets ({filteredTickets.length})
            </h2>
            {filteredTickets.map((ticket) => (
              <Card
                key={ticket._id}
                className={`cursor-pointer transition-colors ${ticket.status === "SOLVED" ? "ring-2 ring-green-500" : ""} ${
                  selectedTicket?._id === ticket._id
                    ? "ring-2 ring-blue-500"
                    : "hover:bg-gray-50" 
                }`}
                onClick={() => {
                  setSelectedTicket(ticket) 
                   ref.current.scrollIntoView({ behavior: 'smooth' , block: 'start'})
                  }}
              >
                <CardHeader className="">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{ticket.title}</CardTitle>
                      <CardDescription className="">
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="h-3 w-3" />
                          <span>{ticket?.createdBy}</span>
                          <span>•</span>
                          <span>
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {ticket.assignedTo
                      ? `Assigned to: ${ticket.assignedTo.email}`
                      : "Unassigned"}
                  </p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {ticket.description}
                  </p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        Required Skills:
                      </p>
                      <div className="flex -ml-1 mt-2 flex-wrap gap-1">
                        {ticket.relatedSkills && ticket.relatedSkills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ticket Details */}
         <div className="lg:sticky lg:top-8" ref={ref}>
            {selectedTicket ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Ticket className="h-5 w-5" />
                    <span>Ticket #{selectedTicket._id}</span>
                    <Badge className={getStatusColor(selectedTicket.status)}>
                      {selectedTicket.status.replace("-", " ")}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Created on {selectedTicket.createdAt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{selectedTicket.title}</h3>
                    <p className="text-gray-600 text-sm">{selectedTicket.description}</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">AI Analysis</h4>

                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-medium text-blue-800 mb-1">Skills Required:</p>
                            <div className="flex flex-wrap gap-1">
                              {selectedTicket.relatedSkills && selectedTicket?.relatedSkills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedTicket.status === "SOLVED" && selectedTicket.solution && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-900 mb-1">Solution</h4>
                          <p className="text-sm text-green-700 mb-2">{selectedTicket.solution}</p>
                          <p className="text-xs text-green-600">
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTicket.status === "IN_PROGRESS" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">In Progress</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">
                        Our team is actively working on your ticket. You'll be notified once a solution is available.
                      </p>
                    </div>
                  )}

                  {selectedTicket.status === "AI_PROCESSED" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-900">Awaiting Review</span>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">
                        Your ticket is in the queue and will be reviewed by our team soon.
                      </p>
                    </div>
                  )}

                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Ticket</h3>
                  <p className="text-gray-600">Choose a ticket from the list to view details and track its progress.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
