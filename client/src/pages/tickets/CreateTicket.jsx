
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Ticket, ArrowLeft, Send, Bot, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { Link } from "react-router-dom"

export default function CreateTicketPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in both the title and description fields.")
      return
    }

    const dataToSubmit = {
      title,
      description,
    };

    console.log(dataToSubmit);

    try {
      setIsSubmitting(true);

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataToSubmit),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create ticket");
      }
      toast.success(
        "Ticket created successfully! Our AI is now processing it."
      );
    } catch (error) {
      console.log("Error creating ticket:", error);
      toast.error(error.message || "Failed to create ticket");
      setIsSubmitting(false);
      return;
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTitle("");
      setDescription("");
    }

  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Ticket Created Successfully!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your ticket has been submitted and our AI is now processing it to add relevant labels and identify
              required skills.
            </p>

            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <span>AI Processing Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Ticket received and validated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Content analyzed by Gemini AI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Labels and skills identified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Assigned to moderator queue</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create" onClick={() => setIsSubmitted(false)}>
                <Button variant="outline">Create Another Ticket</Button>
              </Link>
              <Link to="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
 

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Create a New Ticket</h1>
            <p className="text-lg text-gray-600">
              Describe your issue and our AI will automatically categorize it and identify the skills needed for
              resolution.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
              <CardDescription>
                Provide a clear title and detailed description of your issue or request.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Ticket Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief summary of your issue..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue, including steps to reproduce, expected behavior, and any error messages..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isSubmitting}
                    rows={6}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">AI Enhancement</h4>
                      <p className="text-sm text-blue-700">
                        Once submitted, our Gemini AI will automatically analyze your ticket to:
                      </p>
                      <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>• Add relevant category labels</li>
                        <li>• Identify required skills for resolution</li>
                        <li>• Attach helpful notes and context</li>
                        <li>• Prioritize based on urgency and complexity</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !title.trim() || !description.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Ticket
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Need help? Check out our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                support documentation
              </a>{" "}
              or{" "}
              <a href="#" className="text-blue-600 hover:underline">
                contact us directly
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
