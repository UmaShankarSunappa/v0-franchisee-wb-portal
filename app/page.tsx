"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle2,
  Download,
  Mail,
  Phone,
  Clock,
  FileText,
  Video,
  ImageIcon,
  Search,
  Building2,
  TrendingUp,
  Users,
  Headset,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

type Section = "home" | "about" | "news" | "faqs" | "resources" | "contact"

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState<Section>("home")
  const [searchQuery, setSearchQuery] = useState("")

  const newsUpdates = [
    {
      date: "2025-10-01",
      title: "Launch of Winter Marketing Campaign",
      summary: 'We are rolling out "FluCare 2025" campaign — posters, social media kits available to you.',
    },
    {
      date: "2025-09-25",
      title: "Portal Maintenance Scheduled",
      summary: "The franchise portal will be down Oct 10, 10pm–2am IST. Plan accordingly.",
    },
    {
      date: "2025-08-15",
      title: "Updated Expired Product Return Policy",
      summary: "Revised guidelines on how to submit expired product returns for credit.",
    },
    {
      date: "2025-07-01",
      title: "New Product Listing: XYZ Supplements",
      summary: "Now available for order via the franchise portal — see catalog.",
    },
  ]

  const faqs = [
    {
      category: "Technical (POS / EDP / IT)",
      questions: [
        {
          q: "What should I do if my barcode scanner stops working?",
          a: "First, check the USB connection. If the issue persists, restart your POS system. Contact IT support at it@medplusindia.com if the problem continues.",
        },
        {
          q: "How to reset POS password?",
          a: "Navigate to Settings > User Management > Reset Password. Enter your registered email to receive a password reset link.",
        },
        {
          q: "How to report a software bug?",
          a: "Use the Complaints section in the portal and select 'IT Department' as the category. Provide detailed steps to reproduce the issue.",
        },
      ],
    },
    {
      category: "Accounts / Finance",
      questions: [
        {
          q: "Who do I contact regarding a billing discrepancy on an invoice?",
          a: "Contact the Accounts Department at accounts@medplusindia.com with your invoice number and details of the discrepancy.",
        },
        {
          q: "When will I receive monthly settlement reports?",
          a: "Monthly settlement reports are generated on the 5th of each month and available in the 'Monthly Reports' section.",
        },
        {
          q: "What is the commission / margin structure?",
          a: "Commission structure varies by product category. Please refer to your franchise agreement or contact franchise@medplusindia.com for details.",
        },
      ],
    },
    {
      category: "Warehouse & Supply Chain",
      questions: [
        {
          q: "What is the cut-off time for same-day order processing?",
          a: "Orders placed before 2:00 PM IST are processed the same day. Orders after 2:00 PM are processed the next business day.",
        },
        {
          q: "How to raise a stock replenishment request if my store stock is below threshold?",
          a: "Use the Provisional Indent system in the portal to request stock replenishment. The system will automatically suggest items below threshold.",
        },
        {
          q: "What is the lead time for backorders?",
          a: "Backorder lead time varies by product. Typically 3-7 business days. Check the product details in the catalog for specific lead times.",
        },
      ],
    },
    {
      category: "Operations",
      questions: [
        {
          q: "Where can I find the latest brand marketing guidelines?",
          a: "All marketing guidelines are available in the 'Resources & Training' section under 'Marketing Materials'.",
        },
        {
          q: "What are the procedures for new product launches in store?",
          a: "New product launch procedures are detailed in the 'Operational SOPs' section. You'll receive email notifications for upcoming launches.",
        },
        {
          q: "How to run offers / discounts at store level?",
          a: "Store-level offers must be approved by regional management. Submit your proposal through the portal's communication system.",
        },
      ],
    },
  ]

  const resources = [
    {
      category: "Marketing Materials",
      items: [
        { name: "MedPlus Logo Pack", type: "image", updated: "2025-09-15", isNew: false },
        { name: "Poster Templates", type: "image", updated: "2025-10-01", isNew: true },
        { name: "Social Media Graphics", type: "image", updated: "2025-09-20", isNew: false },
        { name: "FluCare 2025 Campaign Assets", type: "image", updated: "2025-10-01", isNew: true },
      ],
    },
    {
      category: "Operational SOPs",
      items: [
        { name: "Store Opening/Closing Checklist", type: "document", updated: "2025-08-10", isNew: false },
        { name: "Product Returns & Expiry Management", type: "document", updated: "2025-08-15", isNew: true },
        { name: "Inventory Management SOPs", type: "document", updated: "2025-07-20", isNew: false },
        { name: "Promotional Setup Guidelines", type: "document", updated: "2025-09-05", isNew: false },
      ],
    },
    {
      category: "Training Videos",
      items: [
        { name: "POS System Usage", type: "video", updated: "2025-06-15", isNew: false },
        { name: "Inventory/Ordering Tutorials", type: "video", updated: "2025-07-01", isNew: false },
        { name: "New Product Training", type: "video", updated: "2025-09-10", isNew: true },
        { name: "Compliance & Regulatory Training", type: "video", updated: "2025-08-01", isNew: false },
      ],
    },
  ]

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (faq) =>
          searchQuery === "" ||
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      {/* Header with Auth Buttons */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-cyan-800 flex items-center justify-center">
              <span className="text-xl font-bold text-white">M+</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-cyan-900">Medplus</h1>
              <p className="text-xs text-gray-600">Franchisee Portal</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild className="border-cyan-800 text-cyan-800 hover:bg-cyan-50 bg-transparent">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-cyan-800 hover:bg-cyan-900">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="bg-white border-b sticky top-[73px] z-40">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={activeSection === "home" ? "default" : "ghost"}
              onClick={() => setActiveSection("home")}
              className={
                activeSection === "home"
                  ? "bg-cyan-800 hover:bg-cyan-900"
                  : "text-cyan-800 hover:text-cyan-900 hover:bg-cyan-50"
              }
            >
              Home
            </Button>
            <Button
              variant={activeSection === "about" ? "default" : "ghost"}
              onClick={() => setActiveSection("about")}
              className={
                activeSection === "about"
                  ? "bg-cyan-800 hover:bg-cyan-900"
                  : "text-cyan-800 hover:text-cyan-900 hover:bg-cyan-50"
              }
            >
              About Us
            </Button>
            <Button
              variant={activeSection === "news" ? "default" : "ghost"}
              onClick={() => setActiveSection("news")}
              className={
                activeSection === "news"
                  ? "bg-cyan-800 hover:bg-cyan-900"
                  : "text-cyan-800 hover:text-cyan-900 hover:bg-cyan-50"
              }
            >
              News & Updates
            </Button>
            <Button
              variant={activeSection === "faqs" ? "default" : "ghost"}
              onClick={() => setActiveSection("faqs")}
              className={
                activeSection === "faqs"
                  ? "bg-cyan-800 hover:bg-cyan-900"
                  : "text-cyan-800 hover:text-cyan-900 hover:bg-cyan-50"
              }
            >
              FAQs
            </Button>
            <Button
              variant={activeSection === "resources" ? "default" : "ghost"}
              onClick={() => setActiveSection("resources")}
              className={
                activeSection === "resources"
                  ? "bg-cyan-800 hover:bg-cyan-900"
                  : "text-cyan-800 hover:text-cyan-900 hover:bg-cyan-50"
              }
            >
              Resources & Training
            </Button>
            <Button
              variant={activeSection === "contact" ? "default" : "ghost"}
              onClick={() => setActiveSection("contact")}
              className={
                activeSection === "contact"
                  ? "bg-cyan-800 hover:bg-cyan-900"
                  : "text-cyan-800 hover:text-cyan-900 hover:bg-cyan-50"
              }
            >
              Contact Us
            </Button>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {activeSection === "home" && (
          <>
            {/* Welcome Banner */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-800 to-cyan-600 text-white p-12 md:p-16">
              <div className="relative z-10 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                  Welcome to Medplus Franchisee Portal
                </h2>
                <p className="text-xl text-cyan-50 mb-8 text-pretty leading-relaxed">
                  Join India's leading pharmacy retail chain and be part of a trusted healthcare network serving
                  millions of customers across the nation.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" variant="secondary" asChild className="bg-white text-cyan-800 hover:bg-gray-100">
                    <Link href="/signup">Become a Partner</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    <Link href="/login">Existing Partner Login</Link>
                  </Button>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
                <div className="h-full w-full bg-[url('/abstract-medical-pattern.png')] bg-cover bg-center" />
              </div>
            </section>

            {/* Why Partner with Us */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-cyan-900">Why Partner with Medplus?</CardTitle>
                  <CardDescription>Key benefits of becoming a franchisee</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center mb-4">
                        <Building2 className="h-8 w-8 text-cyan-800" />
                      </div>
                      <h3 className="font-semibold text-cyan-900 mb-2">Brand Recognition</h3>
                      <p className="text-sm text-gray-600 text-pretty">
                        Leverage the trust of India's leading pharmacy chain with 4,230+ stores
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center mb-4">
                        <TrendingUp className="h-8 w-8 text-cyan-800" />
                      </div>
                      <h3 className="font-semibold text-cyan-900 mb-2">Supply Chain Efficiency</h3>
                      <p className="text-sm text-gray-600 text-pretty">
                        Access to centralized procurement and efficient distribution network
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-cyan-800" />
                      </div>
                      <h3 className="font-semibold text-cyan-900 mb-2">Technology Support</h3>
                      <p className="text-sm text-gray-600 text-pretty">
                        Modern POS systems, inventory management, and digital tools
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center mb-4">
                        <Headset className="h-8 w-8 text-cyan-800" />
                      </div>
                      <h3 className="font-semibold text-cyan-900 mb-2">Ongoing Support</h3>
                      <p className="text-sm text-gray-600 text-pretty">
                        Comprehensive training, marketing support, and dedicated assistance
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Franchisee Requirements */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-cyan-900">Franchisee Requirements</CardTitle>
                  <CardDescription>Prerequisites for partnership</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-cyan-800 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Qualified Pharmacist</h4>
                        <p className="text-sm text-gray-600">Licensed pharmacist on premises during operating hours</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-cyan-800 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Minimum Space</h4>
                        <p className="text-sm text-gray-600">300-500 sq ft retail space in prime location</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-cyan-800 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Investment Capacity</h4>
                        <p className="text-sm text-gray-600">Initial investment of ₹15-25 lakhs including setup</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-cyan-800 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Business Commitment</h4>
                        <p className="text-sm text-gray-600">Full-time dedication to store operations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-cyan-800 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Drug License</h4>
                        <p className="text-sm text-gray-600">Valid drug license for retail pharmacy operations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-cyan-800 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Local Market Knowledge</h4>
                        <p className="text-sm text-gray-600">Understanding of local healthcare needs and community</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* How It Works */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-cyan-900">How It Works</CardTitle>
                  <CardDescription>Your journey to becoming a Medplus franchisee</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-800 text-white flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Submit Application</h4>
                        <p className="text-sm text-gray-600">
                          Fill out the franchise application form with your details and location preferences
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-800 text-white flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Initial Screening</h4>
                        <p className="text-sm text-gray-600">
                          Our team reviews your application and conducts preliminary assessment
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-800 text-white flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Site Evaluation</h4>
                        <p className="text-sm text-gray-600">
                          Location assessment and feasibility study by our business development team
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-800 text-white flex items-center justify-center font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Agreement & Training</h4>
                        <p className="text-sm text-gray-600">
                          Sign franchise agreement and complete comprehensive training program
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-800 text-white flex items-center justify-center font-bold">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Store Setup</h4>
                        <p className="text-sm text-gray-600">
                          Store design, inventory setup, and technology installation with our support
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-800 text-white flex items-center justify-center font-bold">
                        6
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Grand Opening</h4>
                        <p className="text-sm text-gray-600">
                          Launch your Medplus store with marketing support and ongoing assistance
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}

        {/* About Us Section */}
        {activeSection === "about" && (
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-900">About Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-800 mb-2">Mission & Vision</h3>
                  <p className="text-gray-700 text-pretty leading-relaxed">
                    At MedPlus, we believe in delivering trusted healthcare and wellness to every consumer. Through our
                    expansive pharmacy network, we strive for accessibility, product integrity, and continuous
                    innovation. Our franchise partners are vital to this mission — together, we commit to mutual growth,
                    operational excellence, and service leadership.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cyan-800 mb-2">Brief History & Shared Success</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-800 mt-0.5 flex-shrink-0" />
                      <span>MedPlus was founded in 2006 in Hyderabad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-800 mt-0.5 flex-shrink-0" />
                      <span>Today, MedPlus operates over 4,230+ stores across 600+ cities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-800 mt-0.5 flex-shrink-0" />
                      <span>
                        We have built a trusted brand in pharmacy retail, e-pharmacy, and associated health services
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-100">
                  <h3 className="text-lg font-semibold text-cyan-900 mb-3">Message from Leadership</h3>
                  <p className="text-gray-700 italic text-pretty leading-relaxed">
                    "To our valued franchise partners: you are not just store owners — you are the face of the MedPlus
                    promise in your community. We commit to providing you the operational support, training, and
                    innovations you need to succeed. Let us grow together."
                  </p>
                  <p className="text-sm text-cyan-800 mt-3 font-medium">— MedPlus Leadership Team</p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* News & Updates Section */}
        {activeSection === "news" && (
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-900">News & Updates</CardTitle>
                <CardDescription>Latest announcements and company news</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsUpdates.map((news, index) => (
                    <div key={index} className="border-l-4 border-cyan-800 pl-4 py-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{news.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{news.summary}</p>
                        </div>
                        <span className="text-sm text-gray-500 whitespace-nowrap">{news.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* FAQs Section */}
        {activeSection === "faqs" && (
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-900">Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {filteredFaqs.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No FAQs found matching your search.</p>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((category, catIndex) => (
                      <div key={catIndex} className="mb-6">
                        <h3 className="text-lg font-semibold text-cyan-800 mb-3">{category.category}</h3>
                        {category.questions.map((faq, faqIndex) => (
                          <AccordionItem key={`${catIndex}-${faqIndex}`} value={`${catIndex}-${faqIndex}`}>
                            <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-gray-700">{faq.a}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </div>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </section>
        )}

        {/* Resources & Training Section */}
        {activeSection === "resources" && (
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-900">Resources & Training</CardTitle>
                <CardDescription>Access marketing materials, SOPs, and training videos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {resources.map((resourceCategory, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-cyan-800 mb-3">{resourceCategory.category}</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      {resourceCategory.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {item.type === "image" && <ImageIcon className="h-5 w-5 text-cyan-800" />}
                            {item.type === "document" && <FileText className="h-5 w-5 text-cyan-800" />}
                            {item.type === "video" && <Video className="h-5 w-5 text-cyan-800" />}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{item.name}</span>
                                {item.isNew && (
                                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                                    New
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-gray-500">Updated: {item.updated}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-cyan-800 hover:text-cyan-900 hover:bg-cyan-50"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        )}

        {/* Contact Us Section */}
        {activeSection === "contact" && (
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-900">Contact Us</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-800 mb-4">
                      Franchisee Relations / Business Development
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-cyan-800 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Email</p>
                          <a href="mailto:franchise@medplusindia.com" className="text-cyan-800 hover:underline">
                            franchise@medplusindia.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-cyan-800 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Phone</p>
                          <a href="tel:+918688581100" className="text-cyan-800 hover:underline">
                            +91 86885 81100
                          </a>
                          <p className="text-sm text-gray-600">(Andhra Pradesh & Telangana)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-cyan-800 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Hours of Operation</p>
                          <p className="text-gray-700">Monday – Friday, 9:30 AM – 5:30 PM IST</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Medplus. All rights reserved.</p>
          <p className="text-xs mt-2">Building healthier communities, one pharmacy at a time.</p>
        </div>
      </footer>
    </div>
  )
}
