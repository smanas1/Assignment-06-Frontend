// src/pages/Features.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const Features = () => {
  const features = [
    {
      title: "Instant Money Transfer",
      description: "Send money to anyone instantly using their phone number",
      icon: "💸",
      badge: "Popular",
    },
    {
      title: "Agent Network",
      description: "Cash-in and cash-out at thousands of agent locations",
      icon: "🏪",
      badge: "Essential",
    },
    {
      title: "Bill Payments",
      description: "Pay utility bills, mobile recharges, and more",
      icon: "📱",
      badge: "Coming Soon",
    },
    {
      title: "Merchant Payments",
      description: "Pay at shops, restaurants, and online stores",
      icon: "🛒",
      badge: "Coming Soon",
    },
    {
      title: "Savings Accounts",
      description: "Earn interest on your savings with flexible options",
      icon: "📈",
      badge: "Coming Soon",
    },
    {
      title: "International Transfers",
      description: "Send money to family abroad with competitive rates",
      icon: "🌐",
      badge: "Coming Soon",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Powerful Features</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to manage your money digitally
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
          >
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <CardTitle className="flex items-center">
                    {feature.title}
                    {feature.badge && (
                      <Badge variant="secondary" className="ml-2">
                        {feature.badge}
                      </Badge>
                    )}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20 bg-muted/30 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why BanglaPay Stands Out
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Bank-Level Security</h3>
            <p className="text-muted-foreground">
              End-to-end encryption and multi-factor authentication for all
              transactions
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Transactions complete in seconds, even with limited connectivity
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌐</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Nationwide Coverage</h3>
            <p className="text-muted-foreground">
              5,000+ agents and growing across all districts of Bangladesh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
