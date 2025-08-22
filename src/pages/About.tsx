// src/pages/About.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About BanglaPay</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Revolutionizing digital payments in Bangladesh since 2024
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-4">
            To create a seamless, secure, and accessible digital payment
            ecosystem for every citizen of Bangladesh, regardless of their
            location or financial background.
          </p>
          <p className="text-lg">
            We believe in financial inclusion and empowering local communities
            through technology that works for everyone.
          </p>
        </div>
        <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
          <img
            src="https://placehold.co/600x400/3b82f6/ffffff?text=Mission+Image"
            alt="Our Mission"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
              <CardTitle className="flex items-center">
                <span className="mr-2 text-2xl">🔒</span> Security
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              We prioritize the security of your funds and personal information
              above all else.
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
              <CardTitle className="flex items-center">
                <span className="mr-2 text-2xl">⚡</span> Speed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              Instant transactions that work even in low connectivity areas.
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
              <CardTitle className="flex items-center">
                <span className="mr-2 text-2xl">🤝</span> Trust
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              Building long-term relationships through transparent and honest
              practices.
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-primary/5 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Our Journey</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg mb-4">
            Founded in 2024, BanglaPay started with a simple idea: make digital
            payments accessible to everyone in Bangladesh. Today, we serve over
            100,000 users and have partnered with 5,000+ agents across the
            country.
          </p>
          <p className="text-lg">
            Our team of passionate engineers, designers, and financial experts
            work tirelessly to improve our platform and expand our services to
            new regions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
