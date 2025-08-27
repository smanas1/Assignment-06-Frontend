// src/pages/About.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Shield,
  Smartphone,
  Users,
  TrendingUp,
  MapPin,
  Award,
  Zap,
  Heart,
  Target,
} from "lucide-react";

const About = () => {
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
                  Revolutionizing Digital Payments
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                About BanglaPay
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Revolutionizing digital payments in Bangladesh since 2024
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Creating a seamless, secure, and accessible digital payment
                ecosystem for every citizen
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl font-bold mb-6">
                  Financial Inclusion for All
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  To create a seamless, secure, and accessible digital payment
                  ecosystem for every citizen of Bangladesh, regardless of their
                  location or financial background.
                </p>
                <p className="text-lg text-muted-foreground">
                  We believe in financial inclusion and empowering local
                  communities through technology that works for everyone.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">Nationwide Coverage</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">Community Focus</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">Security First</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">Innovation Driven</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 bg-muted rounded-2xl h-80 md:h-96 flex items-center justify-center overflow-hidden">
                <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 h-full w-full flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8614.248089889752!2d88.60879336771407!3d24.386886486705503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbef003d4cf6d1%3A0xa1d9f4ef690e3e46!2zQmltYW4gQ2hhdHRvciDgpqzgpr_gpq7gpr7gpqgg4Kaa4Kak4KeN4Kak4KeN4Kas4Kaw!5e1!3m2!1sen!2sbd!4v1756217880556!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30 rounded-3xl">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground">
                Principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-background to-muted">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl flex items-center">
                    <span className="mr-2">🔒</span> Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We prioritize the security of your funds and personal
                    information above all else with bank-level encryption.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-background to-muted">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                    <Smartphone className="h-8 w-8 text-blue-500" />
                  </div>
                  <CardTitle className="text-2xl flex items-center">
                    <span className="mr-2">⚡</span> Speed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Instant transactions that work even in low connectivity
                    areas with our optimized network.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-background to-muted">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl flex items-center">
                    <span className="mr-2">🤝</span> Trust
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Building long-term relationships through transparent and
                    honest practices with our community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Journey Section - Fixed for light/dark mode */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From a simple idea to a nationwide payment solution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Updated cards with proper light/dark mode support */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-primary/5 py-4">
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    <span className="font-semibold">2024 Launch</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Started with a vision to make digital payments accessible to
                    everyone in Bangladesh.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-primary/5 py-4">
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    <span className="font-semibold">100K+ Users</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Serving over 100,000 satisfied users across the country with
                    reliable service.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-primary/5 py-4">
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    <span className="font-semibold">5K+ Agents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Partnered with 5,000+ agents providing cash-in and cash-out
                    services nationwide.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-primary/5 rounded-3xl p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Building the Future</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Our team of passionate engineers, designers, and financial
                  experts work tirelessly to improve our platform and expand our
                  services to new regions.
                </p>
                <p className="text-lg text-muted-foreground">
                  We're committed to continuous innovation and bringing
                  cutting-edge financial technology to every corner of
                  Bangladesh.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6 rounded-2xl bg-background shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  100K+
                </div>
                <div className="text-muted-foreground">Active Users</div>
              </div>

              <div className="text-center p-6 rounded-2xl bg-background shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-500" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                  5K+
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
      </div>
    </div>
  );
};

export default About;
