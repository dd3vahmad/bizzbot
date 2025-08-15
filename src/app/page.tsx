import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Clock,
  Target,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
  Bot,
  FileText,
  Calculator,
  Building,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-gray-900">
              NaijaBizBot
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Reviews
            </a>
          </nav>
          <Button className="bg-amber-600 hover:bg-amber-500 text-white">
            <Link href="/chat">Try Now</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-6 bg-amber-100 text-amber-700 border-amber-200">
            🇳🇬 Built for Nigerian Entrepreneurs
          </Badge>
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-gray-900 mb-6 leading-tight">
            Unlock Your Business
            <span className="text-amber-600 block">Potential with AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get instant answers to your registration, tax, and trade questions.
            Navigate Nigerian business regulations with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 text-lg font-semibold group"
            >
              <Link href="/chat" className="flex items-center">
                Start Chatting Now
                <MessageCircle className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
            {/* <Button
              variant="outline"
              size="lg"
              className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg bg-transparent"
            >
              Watch Demo
            </Button> */}
          </div>

          {/* Hero Image/Mockup */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  NaijaBizBot  Assistant
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-end">
                  <div className="bg-amber-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-xs">
                    How do I register my business in Lagos State?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-tl-sm max-w-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-amber-600">
                        NaijaBizBot 
                      </span>
                    </div>
                    To register your business in Lagos State, you&apos;ll need
                    to follow these steps:
                    <br />• Reserve your business name with CAC
                    <br />• Complete Form CAC 1.1 for incorporation
                    <br />• Pay the required fees...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
              Why Choose NaijaBizBot ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed specifically for Nigerian entrepreneurs, with deep
              knowledge of local regulations and processes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-amber-200 transition-colors group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">
                  Instant Support
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get answers 24/7, no waiting for business hours. Our AI is
                  always ready to help you move forward.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-amber-200 transition-colors group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                  <Target className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">
                  Tailored Answers
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Solutions specific to Nigerian regulations, from CAC
                  registration to FIRS tax requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-amber-200 transition-colors group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                  <Users className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">
                  User-Friendly
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Simple chat interface designed with Nigerian entrepreneurs in
                  mind. No technical jargon, just clear guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simply ask your question, and let our AI guide you through the
              complexities of business in Nigeria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <div className="mb-4">
                <FileText className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-4">
                Ask Your Question
              </h3>
              <p className="text-gray-600">
                Type your business registration, tax, or trade question in plain
                English.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <div className="mb-4">
                <Bot className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-4">
                AI Processes
              </h3>
              <p className="text-gray-600">
                Our AI analyzes your question and searches through Nigerian
                business regulations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <div className="mb-4">
                <CheckCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-4">
                Get Clear Answers
              </h3>
              <p className="text-gray-600">
                Receive step-by-step guidance tailored to your specific
                situation and location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
              What Can You Ask?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From business registration to tax compliance, we&apos;ve got you
              covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-6 h-6 text-amber-600" />
                <h3 className="font-heading font-semibold text-lg">
                  Business Registration
                </h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• How to register with CAC</li>
                <li>• Business name reservation</li>
                <li>• Required documents</li>
                <li>• Registration fees</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-amber-600" />
                <h3 className="font-heading font-semibold text-lg">
                  Tax Compliance
                </h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• VAT registration process</li>
                <li>• Income tax obligations</li>
                <li>• PAYE for employees</li>
                <li>• Tax filing deadlines</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-amber-600" />
                <h3 className="font-heading font-semibold text-lg">
                  Trade & Licensing
                </h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Import/export permits</li>
                <li>• Professional licenses</li>
                <li>• Industry regulations</li>
                <li>• Compliance requirements</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
              Trusted by Nigerian Entrepreneurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from fellow business owners who&apos;ve streamlined their
              processes with NaijaBizBot .
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                &quot;NaijaBizBot  saved me weeks of research. I got my
                business registered in Lagos within days instead of
                months!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-amber-600">AO</span>
                </div>
                <div>
                  <p className="font-semibold">Adebayo Ogundimu</p>
                  <p className="text-sm text-gray-500">Tech Startup Founder</p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                &quot;The tax guidance was incredibly helpful. Finally
                understood my VAT obligations without hiring an expensive
                consultant.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-amber-600">FI</span>
                </div>
                <div>
                  <p className="font-semibold">Fatima Ibrahim</p>
                  <p className="text-sm text-gray-500">Fashion Designer</p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                &quot;As someone new to business in Nigeria, this AI assistant
                was like having a knowledgeable mentor available 24/7.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-amber-600">CE</span>
                </div>
                <div>
                  <p className="font-semibold">Chidi Eze</p>
                  <p className="text-sm text-gray-500">
                    Import/Export Business
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-amber-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-6">
            Ready to Simplify Your Business Journey?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerian entrepreneurs who trust NaijaBizBot  for
            their business guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold group"
            >
              Start Your Free Chat
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-amber-100 text-sm">
              No signup required • Instant access
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-xl">
                  NaijaBizBot 
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted AI assistant for navigating Nigerian business
                regulations and requirements.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Business Registration</li>
                <li>Tax Guidance</li>
                <li>Trade Licensing</li>
                <li>24/7 Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>How It Works</li>
                <li>FAQ</li>
                <li>Contact Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Data Protection</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 NaijaBizBot . Built with ❤️ for Nigerian entrepreneurs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
