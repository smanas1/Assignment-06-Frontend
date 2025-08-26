// src/pages/Features.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Send,
  Store,
  Smartphone,
  ShoppingCart,
  TrendingUp,
  Globe,
  Zap,
  Shield,
  Users,
} from "lucide-react";

const Features = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const features = [
    {
      title: "Instant Money Transfer",
      description: "Send money to anyone instantly using their phone number",
      icon: <Send className="h-8 w-8 text-primary" />,
      badge: "Popular",
      category: "transfer",
    },
    {
      title: "Agent Network",
      description: "Cash-in and cash-out at thousands of agent locations",
      icon: <Store className="h-8 w-8 text-primary" />,
      badge: "Essential",
      category: "agent",
    },
    {
      title: "Bill Payments",
      description: "Pay utility bills, mobile recharges, and more",
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      badge: "Coming Soon",
      category: "payments",
    },
    {
      title: "Merchant Payments",
      description: "Pay at shops, restaurants, and online stores",
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      badge: "Coming Soon",
      category: "payments",
    },
    {
      title: "Savings Accounts",
      description: "Earn interest on your savings with flexible options",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      badge: "Coming Soon",
      category: "savings",
    },
    {
      title: "International Transfers",
      description: "Send money to family abroad with competitive rates",
      icon: <Globe className="h-8 w-8 text-primary" />,
      badge: "Coming Soon",
      category: "transfer",
    },
  ];

  const filteredFeatures =
    activeCategory === "all"
      ? features
      : features.filter((feature) => feature.category === activeCategory);

  const categories = [
    { id: "all", name: "All Features" },
    { id: "transfer", name: "Transfers" },
    { id: "agent", name: "Agent Services" },
    { id: "payments", name: "Payments" },
    { id: "savings", name: "Savings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
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
                <Zap className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">
                  Powerful Features
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Everything You Need for Digital Payments
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Experience the next generation of financial services with our
                comprehensive feature set
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to="/register">Get Started Free</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 rounded-full border-2 hover:shadow-md transition-all"
                >
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="rounded-full px-6"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredFeatures.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-background to-muted group"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  {feature.badge && (
                    <Badge
                      variant={
                        feature.badge === "Popular"
                          ? "default"
                          : feature.badge === "Essential"
                          ? "secondary"
                          : "outline"
                      }
                      className="rounded-full"
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {feature.description}
                </p>
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-medium group-hover:text-primary transition-colors"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose BanglaPay */}
        <section className="py-20 bg-muted/30 rounded-3xl">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose BanglaPay?
              </h2>
              <p className="text-xl text-muted-foreground">
                Experience the next generation of digital payments with our
                innovative features
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Bank-Level Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    End-to-end encryption and multi-factor authentication to
                    keep your money and data completely secure.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                  <CardTitle>Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Instant transactions that work even in low connectivity
                    areas with our optimized network.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-green-500" />
                  </div>
                  <CardTitle>Nationwide Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Thousands of agents across Bangladesh for easy cash-in and
                    cash-out anytime, anywhere.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Payments?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust BanglaPay for their daily
                transactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="text-base px-8 py-6 rounded-full"
                >
                  <Link to="/register">Create Free Account</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 rounded-full bg-white/10 border-white text-white hover:bg-white/20"
                >
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Features;
