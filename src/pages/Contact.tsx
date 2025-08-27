// src/pages/Contact.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Building,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success("Message Sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Mail className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">
                  Get in Touch
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Contact BanglaPay
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Have questions? We're here to help. Reach out to our support
                team.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className=" pb-6">
              <CardTitle className="flex items-center">
                <Send className="mr-2 h-5 w-5" />
                Send us a message
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Fill out the form and we'll get back to you as soon as possible
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="rounded-xl py-5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="rounded-xl py-5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="rounded-xl py-5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="rounded-xl py-5"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl py-6 text-base font-medium bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className=" pb-6">
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Contact Information
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Reach out to us through any of these channels
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Customer Support
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      24/7 support for all your queries
                    </p>
                    <p className="font-medium mt-1">16299 (Toll-free)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Email Support
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Send us an email anytime
                    </p>
                    <p className="font-medium mt-1">support@banglapay.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Office Address
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Level 12, Dhaka Square
                      <br />
                      1205 Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className=" pb-6">
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Office Hours
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Our team is available during these hours
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-muted-foreground">
                      9:00 AM - 6:00 PM
                    </span>
                  </li>
                  <li className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="font-medium">Saturday</span>
                    <span className="text-muted-foreground">
                      10:00 AM - 4:00 PM
                    </span>
                  </li>
                  <li className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="font-medium">Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className=" pb-6">
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Find answers to common questions
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                  <h3 className="font-semibold text-lg mb-2">
                    How long does it take to resolve issues?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Most issues are resolved within 24-48 hours. Urgent matters
                    are prioritized.
                  </p>
                </div>

                <div className="p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                  <h3 className="font-semibold text-lg mb-2">
                    What information should I provide when contacting support?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Please include your phone number, transaction ID (if
                    applicable), and a detailed description.
                  </p>
                </div>

                <div className="p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                  <h3 className="font-semibold text-lg mb-2">
                    Can I contact support via WhatsApp?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Currently, we only support phone calls and emails for
                    customer service.
                  </p>
                </div>

                <div className="p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                  <h3 className="font-semibold text-lg mb-2">
                    Do you have a physical office I can visit?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, our headquarters is located at Level 12, Dhaka Square.
                    Schedule an appointment first.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="mb-16">
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className=" pb-6">
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Our Location
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Visit our office at Dhaka Square
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-muted rounded-2xl h-80 md:h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    BanglaPay Headquarters
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Level 12, Dhaka Square
                    <br />
                    1205 Dhaka, Bangladesh
                  </p>
                  <Button variant="outline" asChild>
                    <a
                      href="https://maps.google.com/?q=Dhaka+Square,+Dhaka,+Bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
