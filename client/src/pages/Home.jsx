import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ticket, Bot, Users, Zap, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <Badge variant="secondary" className="px-3 py-1">
              <Zap className="h-4 w-4 mr-1" />
              Powered by Inngest
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Bot className="h-4 w-4 mr-1" />
              Enhanced by Gemini AI
            </Badge>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Ticket Management
            <span className="block text-blue-600">Powered by AI</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create tickets, let AI automatically label them with required skills and notes, and have moderators
            efficiently solve them. Streamline your support workflow with intelligent automation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup" >
              <Button size="lg" className="px-8 py-3 cursor-pointer ">
                Start Creating Tickets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/create-ticket" >
              <Button size="lg" variant="outline" className="cursor-pointer px-8 py-3">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered system streamlines the entire ticket lifecycle from creation to resolution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Ticket className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Create Tickets</CardTitle>
                <CardDescription>Users submit tickets with title and description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Simple form interface for users to describe their issues or requests clearly.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>AI Processing</CardTitle>
                <CardDescription>Gemini AI automatically labels and categorizes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  AI analyzes content, adds relevant tags, notes, and identifies required skills for resolution.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Moderator Resolution</CardTitle>
                <CardDescription>Moderators review and provide solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Moderators see organized tickets with AI insights and provide targeted solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Faster Ticket Processing</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">AI-Powered Analysis</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Automated Categorization</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Support Workflow?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teams already using TicketAI to streamline their support process.
          </p>
          <Link to="/auth/signup" >
            <Button size="lg" variant="secondary" className="cursor-pointer px-8 py-3">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Ticket className="h-6 w-6" />
            <span className="text-lg font-semibold">TicketAI</span>
          </div>
          <p className="text-gray-400 mb-4">Intelligent ticket management powered by Inngest and Gemini AI</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>© 2024 TicketAI. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
