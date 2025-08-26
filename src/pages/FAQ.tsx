// src/pages/FAQ.tsx
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Mail,
  Phone,
  MessageSquare,
  Search,
  User,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      category: "Account",
      question: "How do I create a BanglaPay account?",
      answer:
        "Download the BanglaPay app from Google Play Store or App Store, then follow the registration process. You'll need your phone number and a valid ID for verification.",
    },
    {
      category: "Security",
      question: "Is BanglaPay safe to use?",
      answer:
        "Yes, BanglaPay uses bank-level encryption and multi-factor authentication to keep your money and data secure. We're also regulated by Bangladesh Bank.",
    },
    {
      question: "How much does it cost to use BanglaPay?",
      answer:
        "Sending money to other BanglaPay users is free. Cash-in and cash-out fees vary by agent but are clearly displayed before transactions.",
      category: "Pricing",
    },
    {
      question: "How do I add money to my account?",
      answer:
        "Visit any BanglaPay agent location with cash and provide your phone number. The agent will add money to your account instantly.",
      category: "Transactions",
    },
    {
      question: "What should I do if I forget my PIN?",
      answer:
        "Use the 'Forgot PIN' option in the app and follow the verification process. You'll need to verify your identity through SMS or email.",
      category: "Account",
    },
    {
      question: "Can I use BanglaPay internationally?",
      answer:
        "Currently, BanglaPay services are only available within Bangladesh. We're working on expanding to other countries soon.",
      category: "General",
    },
    {
      question: "How do I withdraw money from my account?",
      answer:
        "You can withdraw money by visiting any BanglaPay agent location. Simply provide your phone number and the amount you wish to withdraw.",
      category: "Transactions",
    },
    {
      question: "What is the daily transaction limit?",
      answer:
        "Daily limits vary based on your account verification level. Basic accounts have lower limits, while fully verified accounts can transact higher amounts.",
      category: "Account",
    },
    {
      question: "How long does it take for transactions to process?",
      answer:
        "Most transactions are processed instantly. In rare cases, it may take up to 24 hours for certain transactions to complete.",
      category: "Transactions",
    },
    {
      question: "Can I link my bank account to BanglaPay?",
      answer:
        "Yes, you can link your bank account through the app settings. This allows for easier transfers between your bank and BanglaPay wallet.",
      category: "Account",
    },
  ];

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Group FAQs by category
  const groupedFaqs = filteredFaqs.reduce(
    (acc: Record<string, typeof faqs>, faq) => {
      const category = faq.category || "General";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    },
    {}
  );

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
                <HelpCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">
                  Help Center
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Find answers to common questions about BanglaPay
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for answers..."
                  className="pl-12 pr-4 py-6 text-lg rounded-full shadow-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <div className="mb-16">
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5" />
                {searchTerm ? "Search Results" : "All Questions"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(groupedFaqs).map(([category, faqs]) => (
                    <div key={category} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                        {category}
                      </h3>
                      <div className="space-y-4">
                        {faqs.map((faq) => {
                          const globalIndex = filteredFaqs.findIndex(
                            (f) => f.question === faq.question
                          );
                          return (
                            <Card
                              key={globalIndex}
                              className="border-0 shadow-lg rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-xl"
                              onClick={() => toggleFAQ(globalIndex)}
                            >
                              <CardHeader className="flex flex-row items-center justify-between py-4 bg-primary/5">
                                <CardTitle className="text-lg font-medium">
                                  {faq.question}
                                </CardTitle>
                                {openIndex === globalIndex ? (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                )}
                              </CardHeader>
                              {openIndex === globalIndex && (
                                <CardContent className="pt-0">
                                  <p className="text-muted-foreground pt-4">
                                    {faq.answer}
                                  </p>
                                </CardContent>
                              )}
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No questions found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div className="mb-16">
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Still need help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Phone Support
                    </CardTitle>
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary mb-2">
                      16299
                    </div>
                    <p className="text-xs text-muted-foreground">
                      24/7 customer support
                    </p>
                    <Button className="w-full mt-4" asChild>
                      <a href="tel:16299">Call Now</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Email Support
                    </CardTitle>
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-blue-500 mb-2">
                      support@banglapay.com
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Response within 24 hours
                    </p>
                    <Button className="w-full mt-4" variant="outline" asChild>
                      <a href="mailto:support@banglapay.com">Send Email</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Live Chat
                    </CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-green-500 mb-2">
                      Available 24/7
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Instant support via app
                    </p>
                    <Button className="w-full mt-4" variant="secondary" asChild>
                      <a href="/chat">Start Chat</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Section - Updated to be responsive */}
        <div className="mb-16">
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Help Us Improve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Was this page helpful? Let us know how we can improve.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full flex items-center justify-center px-6 py-3"
                  >
                    <span className="mr-2">👍</span> Yes, Very Helpful
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full flex items-center justify-center px-6 py-3"
                  >
                    <span className="mr-2">👎</span> Needs Improvement
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

export default FAQ;
