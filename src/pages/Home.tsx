// src/pages/Home.tsx
import {
  DollarSign,
  Shield,
  Smartphone,
  Store,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="tour-navbar">
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
                Revolutionizing Digital Payments
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              The Future of Digital Payments in Bangladesh
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Send, receive, and manage money instantly with our secure and
              user-friendly digital wallet platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
              >
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 rounded-full border-2 hover:shadow-md transition-all bg-background/50 backdrop-blur-sm"
              >
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-background shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                1.2M+
              </div>
              <div className="text-muted-foreground">Active Users</div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-background shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                50K+
              </div>
              <div className="text-muted-foreground">Agent Points</div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-background shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">
                ৳250B+
              </div>
              <div className="text-muted-foreground">Processed</div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-background shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-500" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">
                99.9%
              </div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose BanglaPay?
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the next generation of digital payments with our
              innovative features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-background to-muted">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Instant Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Send money to anyone instantly with just their phone number.
                  No more waiting for bank transfers.
                </p>
                <div className="flex items-center text-primary font-medium">
                  <span>Learn more</span>
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
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-background to-muted">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="text-2xl">
                  Military-Grade Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Bank-level encryption and multi-factor authentication to keep
                  your money and data completely secure.
                </p>
                <div className="flex items-center text-blue-500 font-medium">
                  <span>Learn more</span>
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
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-background to-muted">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                  <Smartphone className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-2xl">Agent Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Thousands of agents across Bangladesh for easy cash-in and
                  cash-out anytime, anywhere.
                </p>
                <div className="flex items-center text-green-500 font-medium">
                  <span>Learn more</span>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How BanglaPay Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-3xl bg-background shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Create Account</h3>
              <p className="text-muted-foreground">
                Download our app and register with your phone number in minutes.
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-background shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-500">2</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Add Money</h3>
              <p className="text-muted-foreground">
                Visit any nearby agent to add money to your digital wallet.
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-background shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-green-500">3</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Start Transacting</h3>
              <p className="text-muted-foreground">
                Send money, pay bills, or shop online with just a few taps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear what our users have to say about BanglaPay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
              <CardContent className="pt-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="font-bold text-primary">NI</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Nabila Islam</h4>
                    <p className="text-sm text-muted-foreground">Rajshahi</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "BanglaPay has made sending money to my family in rural areas
                  so much easier. The agent network is extensive!"
                </p>
                <div className="flex mt-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
              <CardContent className="pt-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-500">WS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Wahida Shimu</h4>
                    <p className="text-sm text-muted-foreground">Chittagong</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "As a small business owner, BanglaPay helps me accept payments
                  quickly and securely. Highly recommended!"
                </p>
                <div className="flex mt-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
              <CardContent className="pt-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                    <span className="font-bold text-green-500">FS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Fabiha Shila</h4>
                    <p className="text-sm text-muted-foreground">Sylhet</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "The app is incredibly user-friendly. I've never had any
                  issues with transactions. Customer support is excellent too!"
                </p>
                <div className="flex mt-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

// Star icon component for testimonials
const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default Home;
