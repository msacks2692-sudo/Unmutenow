import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Hand, Eye, Volume2, Users, Heart } from 'lucide-react';
import ASLTranslator from '@/components/ASLTranslator';
import { UnmuteLogo } from '@/components/UnmuteLogo';
import { AccessibilityPopup } from '@/components/AccessibilityPopup';

const ASLPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <AccessibilityPopup />
      {/* Navigation */}
      <nav className="border-b glass sticky top-0 z-50" role="navigation" aria-label="ASL Translator navigation">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UnmuteLogo />
            <span className="text-sm font-medium text-muted-foreground">ASL Translator</span>
          </div>
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16" aria-labelledby="asl-hero-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Hand className="w-12 h-12 text-primary" />
              <h1 id="asl-hero-heading" className="text-4xl md:text-6xl font-extrabold">
                AI ASL Translator
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Break down communication barriers with our AI-powered American Sign Language translator. 
              Real-time hand detection converts ASL signs to text instantly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge variant="secondary" className="gap-2">
                <Eye className="w-4 h-4" />
                Real-time Detection
              </Badge>
              <Badge variant="secondary" className="gap-2">
                <Volume2 className="w-4 h-4" />
                Accessibility Focused
              </Badge>
              <Badge variant="secondary" className="gap-2">
                <Users className="w-4 h-4" />
                Community Driven
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Translator Section */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ASLTranslator />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features & Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="glass-card">
              <CardHeader>
                <Eye className="w-8 h-8 text-primary mb-4" />
                <CardTitle>Real-time Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced AI models detect and interpret ASL signs instantly, providing immediate 
                  text translation for seamless communication.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <Heart className="w-8 h-8 text-accent mb-4" />
                <CardTitle>Accessibility First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Designed with accessibility principles, featuring high contrast modes, 
                  keyboard navigation, and screen reader support for inclusive design.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mb-4" />
                <CardTitle>Community Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Empowering the deaf and hard-of-hearing community by breaking down 
                  communication barriers and fostering inclusive conversations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Camera Access</h3>
                <p className="text-muted-foreground">
                  The system accesses your device's camera to capture hand movements and gestures in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI Hand Detection</h3>
                <p className="text-muted-foreground">
                  Advanced machine learning models analyze hand landmarks, finger positions, and gesture patterns.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">ASL Recognition</h3>
                <p className="text-muted-foreground">
                  The AI matches detected gestures against ASL alphabet patterns and translates them to text.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-primary">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Text Output</h3>
                <p className="text-muted-foreground">
                  Recognized letters are displayed in real-time, building words and sentences for communication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Sign-Up Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Beta Launch • November 2025
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join the ASL Translator Beta
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Be among the first to experience our revolutionary AI-powered ASL translator. 
              Sign up today for early access and help shape the future of accessible communication.
            </p>
            
            <Card className="glass-card bg-white/10 border-white/20 backdrop-blur-lg">
              <CardContent className="pt-8">
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const email = formData.get('email');
                  // Handle beta signup
                  console.log('Beta signup:', email);
                  alert('Thank you for signing up! We\'ll contact you soon.');
                }}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-6 py-4 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      variant="secondary"
                      className="px-8 py-4 text-lg font-semibold whitespace-nowrap"
                    >
                      Sign Up for Beta
                    </Button>
                  </div>
                  <p className="text-sm opacity-75">
                    Join over 1,000+ people already signed up for early access
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8" role="contentinfo">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built with accessibility in mind. Empowering communication for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Badge component (since it might not be imported)
const Badge = ({ children, variant = "default", className = "" }: any) => {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-input bg-background",
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default ASLPage;