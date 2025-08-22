// src/pages/FAQ.tsx
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I create a BanglaPay account?",
      answer:
        "Download the BanglaPay app from Google Play Store or App Store, then follow the registration process. You'll need your phone number and a valid ID for verification.",
    },
    {
      question: "Is BanglaPay safe to use?",
      answer:
        "Yes, BanglaPay uses bank-level encryption and multi-factor authentication to keep your money and data secure. We're also regulated by Bangladesh Bank.",
    },
    {
      question: "How much does it cost to use BanglaPay?",
      answer:
        "Sending money to other BanglaPay users is free. Cash-in and cash-out fees vary by agent but are clearly displayed before transactions.",
    },
    {
      question: "How do I add money to my account?",
      answer:
        "Visit any BanglaPay agent location with cash and provide your phone number. The agent will add money to your account instantly.",
    },
    {
      question: "What should I do if I forget my PIN?",
      answer:
        "Use the 'Forgot PIN' option in the app and follow the verification process. You'll need to verify your identity through SMS or email.",
    },
    {
      question: "Can I use BanglaPay internationally?",
      answer:
        "Currently, BanglaPay services are only available within Bangladesh. We're working on expanding to other countries soon.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about BanglaPay
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-xl"
            onClick={() => toggleFAQ(index)}
          >
            <CardHeader className="flex flex-row items-center justify-between py-4 bg-primary/5">
              <CardTitle className="text-lg font-medium">
                {faq.question}
              </CardTitle>
              {openIndex === index ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
            </CardHeader>
            {openIndex === index && (
              <CardContent className="pt-0">
                <p className="text-muted-foreground pt-4">{faq.answer}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          Our support team is ready to help you 24/7
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:16299"
            className="inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 py-3"
          >
            Call Support: 16299
          </a>
          <a
            href="mailto:support@banglapay.com"
            className="inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-6 py-3"
          >
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
