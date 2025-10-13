// src/pages/Home.tsx
import {
  DollarSign,
  Shield,
  Smartphone,
  Store,
  TrendingUp,
  Users,
  Zap,
  CreditCard,
  Eye,
  Star as StarIcon,
  CheckCircle,
  Play,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
  // Stats data
  const statsData = [
    { value: "1.2M+", label: "Active Users", icon: Users, color: "primary" },
    { value: "50K+", label: "Agent Points", icon: Store, color: "blue" },
    { value: "৳250B+", label: "Processed", icon: TrendingUp, color: "green" },
    { value: "99.9%", label: "Uptime", icon: Shield, color: "purple" },
  ];

  // Features data
  const featuresData = [
    {
      icon: DollarSign,
      title: "Instant Transfers",
      description:
        "Send money to anyone instantly with just their phone number. No more waiting for bank transfers.",
      color: "primary",
    },
    {
      icon: Shield,
      title: "Military-Grade Security",
      description:
        "Bank-level encryption and multi-factor authentication to keep your money and data completely secure.",
      color: "blue",
    },
    {
      icon: Smartphone,
      title: "Agent Network",
      description:
        "Thousands of agents across Bangladesh for easy cash-in and cash-out anytime, anywhere.",
      color: "green",
    },
    {
      icon: CreditCard,
      title: "Bill Payments",
      description:
        "Pay utility bills, mobile recharge, and more without leaving the comfort of your home.",
      color: "purple",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Nabila Islam",
      location: "Rajshahi",
      avatar: "NI",
      text: "BanglaPay has made sending money to my family in rural areas so much easier. The agent network is extensive!",
      rating: 5,
    },
    {
      name: "Wahida Shimu",
      location: "Chittagong",
      avatar: "WS",
      text: "As a small business owner, BanglaPay helps me accept payments quickly and securely. Highly recommended!",
      rating: 5,
    },
    {
      name: "Fabiha Shila",
      location: "Sylhet",
      avatar: "FS",
      text: "The app is incredibly user-friendly. I've never had any issues with transactions. Customer support is excellent too!",
      rating: 5,
    },
    {
      name: "Rakib Hasan",
      location: "Dhaka",
      avatar: "RH",
      text: "I've been using BanglaPay for over 2 years now. The instant transfers and low fees make it my preferred digital wallet.",
      rating: 5,
    },
  ];

  // FAQ data
  const faqData = [
    {
      question: "Is BanglaPay safe to use?",
      answer:
        "Yes, we use bank-level security and encryption to protect your financial information. Our platform is regulated and compliant with all Bangladeshi financial laws.",
    },
    {
      question: "How do I create an account?",
      answer:
        "Simply download our app, provide your phone number, verify with OTP, and complete your KYC verification to get started.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No, we are completely transparent about all fees. You'll see all charges before confirming any transaction.",
    },
    {
      question: "How quickly do transfers happen?",
      answer:
        "Most transfers are instant and happen within seconds of confirmation. In rare cases, it may take up to a few minutes.",
    },
  ];

  // Steps for How It Works
  const stepsData = [
    {
      number: 1,
      title: "Create Account",
      description:
        "Download our app and register with your phone number in minutes.",
    },
    {
      number: 2,
      title: "Add Money",
      description:
        "Visit any nearby agent to add money to your digital wallet.",
    },
    {
      number: 3,
      title: "Start Transacting",
      description:
        "Send money, pay bills, or shop online with just a few taps.",
    },
  ];

  // Security features
  const securityFeatures = [
    {
      icon: Shield,
      title: "Bank-Level Encryption",
      description: "All your data is protected with AES-256 encryption",
    },
    {
      icon: Eye,
      title: "2-Factor Authentication",
      description: "Additional security layer for all transactions",
    },
    {
      icon: CheckCircle,
      title: "Regulated Platform",
      description: "Compliant with Bangladesh Bank regulations",
    },
  ];

  return (
    <div className="tour-navbar">
      {/* Hero Section with Enhanced Animations */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-muted">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-48 h-48 bg-green-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge with animation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <Zap className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">
                Revolutionizing Digital Payments
              </span>
            </motion.div>

            {/* Main headline with animation */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Future of Digital Payments in Bangladesh
            </motion.h1>

            {/* Subtitle with animation */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Send, receive, and manage money instantly with our secure and
              user-friendly digital wallet platform.
            </motion.p>

            {/* Action buttons with animation */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
              >
                <Link to="/register">
                  Get Started Free <Zap className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 rounded-full border-2 hover:shadow-md transition-all bg-background/50 backdrop-blur-sm"
              >
                <Link to="/features">
                  Explore Features <Play className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Animated Credit Cards Section */}
            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                className="relative"
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ y: -10, rotate: -1 }}
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-sm opacity-80">Card Number</div>
                      <div className="text-lg font-mono tracking-wider">
                        **** **** **** 1234
                      </div>
                    </div>
                    <div className="text-2xl font-bold">BANK</div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm opacity-80">Card Holder</div>
                      <div className="font-medium">JOHN DOE</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80">Expires</div>
                      <div className="font-medium">12/28</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -10, rotate: 1 }}
              >
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-sm opacity-80">Card Number</div>
                      <div className="text-lg font-mono tracking-wider">
                        **** **** **** 5678
                      </div>
                    </div>
                    <div className="text-2xl font-bold">BANK</div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm opacity-80">Card Holder</div>
                      <div className="font-medium">JOHN DOE</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80">Expires</div>
                      <div className="font-medium">05/27</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ y: -10, rotate: -1 }}
              >
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-sm opacity-80">Card Number</div>
                      <div className="text-lg font-mono tracking-wider">
                        **** **** **** 9012
                      </div>
                    </div>
                    <div className="text-2xl font-bold">BANK</div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm opacity-80">Card Holder</div>
                      <div className="font-medium">JOHN DOE</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80">Expires</div>
                      <div className="font-medium">11/29</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <motion.section
        className="py-16 bg-muted/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-background shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className={`h-8 w-8 text-${stat.color}`} />
                </div>
                <motion.div
                  className={`text-3xl md:text-4xl font-bold text-${stat.color} mb-2`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Showcase with Carousel */}
      <motion.section
        className="py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
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

          {/* Swiper Carousel for Features */}
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="max-w-5xl mx-auto mb-12"
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {featuresData.map((feature, index) => (
              <SwiperSlide key={index}>
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-background to-muted h-full">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-${feature.color}/10 flex items-center justify-center mb-6`}
                    >
                      <feature.icon
                        className={`h-8 w-8 text-${feature.color}`}
                      />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {feature.description}
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>

      {/* How It Works Section with Animations */}
      <motion.section
        className="py-20 bg-muted/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
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
            {stepsData.map((step, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-3xl bg-background shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div
                  className={`w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-${
                    index === 0
                      ? "primary"
                      : index === 1
                      ? "blue-500"
                      : "green-500"
                  }`}
                >
                  <span className="text-3xl font-bold">{step.number}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Security & Trust Section */}
      <motion.section
        className="py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Security & Trust
            </h2>
            <p className="text-lg text-muted-foreground">
              Your financial data is protected with the highest security
              standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-background border border-primary/10 hover:border-primary/20 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section with Carousel */}
      <motion.section
        className="py-20 bg-muted/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear what our users have to say about BanglaPay
            </p>
          </div>

          {/* Testimonials Carousel */}
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="max-w-5xl mx-auto"
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Card className="border-0 shadow-lg rounded-3xl overflow-hidden h-full">
                  <CardContent className="pt-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <span className="font-bold text-primary">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic mb-4">
                      "{testimonial.text}"
                    </p>
                    <div className="flex text-yellow-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>

      {/* FAQ Section with Accordion */}
      <motion.section
        className="py-20 bg-muted/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about BanglaPay
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition-all">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-semibold flex justify-between items-center cursor-pointer">
                      <span>{faq.question}</span>
                      <ChevronDownIcon className="h-5 w-5 text-primary" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 text-muted-foreground">
                    {faq.answer}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

// ChevronDownIcon component for FAQ
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export default Home;
