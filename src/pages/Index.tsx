import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Mic, Eye, Ear, Hand } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-accessibility.jpg";
import { UnmuteLogo } from "@/components/UnmuteLogo";
const Index = () => {
  return <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b glass sticky top-0 z-50" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <UnmuteLogo />
          <div className="flex gap-6">
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors underglow">About</a>
            <a href="#focus" className="text-sm font-medium hover:text-primary transition-colors underglow">Our Focus</a>
            <a href="#impact" className="text-sm font-medium hover:text-primary transition-colors underglow">Impact</a>
            <Link to="/asl-translator" className="text-sm font-medium hover:text-primary transition-colors underglow">ASL Translator</Link>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors underglow">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background py-20 md:py-32" aria-labelledby="hero-heading">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 id="hero-heading" className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Empowering <span className="text-primary">Accessibility</span> for All
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Breaking down barriers and amplifying voices. Unmute is dedicated to creating a world where accessibility is not an afterthought, but a fundamental right.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button size="lg" className="gap-2 underglow" aria-label="Learn more about Unmute">
                  Learn More <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button size="lg" variant="outline" className="glass underglow" aria-label="Get involved with Unmute">
                  Get Involved
                </Button>
              </div>
            </div>
            <div className="fade-in rounded-2xl overflow-hidden shadow-2xl">
              <img src={heroImage} alt="Diverse group of people using accessibility technology together in a modern, inclusive workspace" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30" aria-labelledby="about-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <h2 id="about-heading" className="text-3xl md:text-5xl font-bold mb-6">About Unmute</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Unmute is a nonprofit organization committed to amplifying accessibility across all aspects of life. 
              We believe that everyone deserves equal access to information, technology, and opportunities. 
              Through advocacy, education, and innovative solutions, we're building a more inclusive world.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our name reflects our mission: to unmute the voices that have been silenced by inaccessible systems, 
              to remove the barriers that prevent full participation, and to ensure that accessibility is heard loud and clear.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section id="focus" className="py-20" aria-labelledby="focus-heading">
        <div className="container mx-auto px-4">
          <h2 id="focus-heading" className="text-3xl md:text-5xl font-bold text-center mb-16">Our Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="fade-in hover:shadow-xl transition-shadow glass-card underglow">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Visual Accessibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ensuring digital content is accessible to people with visual impairments through screen readers, 
                  proper contrast ratios, and alternative text.
                </p>
              </CardContent>
            </Card>

            <Card className="fade-in hover:shadow-xl transition-shadow glass-card underglow" style={{
            animationDelay: '0.1s'
          }}>
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <Ear className="w-7 h-7 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Auditory Accessibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Providing captions, transcripts, and visual alternatives for audio content to support 
                  the deaf and hard of hearing community.
                </p>
              </CardContent>
            </Card>

            <Card className="fade-in hover:shadow-xl transition-shadow glass-card underglow" style={{
            animationDelay: '0.2s'
          }}>
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Mic className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Cognitive Accessibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Creating clear, consistent interfaces and content that accommodate various cognitive abilities 
                  and learning styles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-gradient-to-br from-primary via-accent to-primary" aria-labelledby="impact-heading">
        <div className="container mx-auto px-4">
          <h2 id="impact-heading" className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center text-white fade-in">
              <div className="text-5xl md:text-6xl font-extrabold mb-4">15K+</div>
              <p className="text-xl text-white/90">People Reached</p>
            </div>
            <div className="text-center text-white fade-in" style={{
            animationDelay: '0.1s'
          }}>
              <div className="text-5xl md:text-6xl font-extrabold mb-4">250+</div>
              <p className="text-xl text-white/90">Organizations Helped</p>
            </div>
            <div className="text-center text-white fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <div className="text-5xl md:text-6xl font-extrabold mb-4">500+</div>
              <p className="text-xl text-white/90">Accessibility Audits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="py-20" aria-labelledby="contact-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6" aria-hidden="true" />
            <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold mb-6">Join the Movement</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Together, we can create a world where everyone has equal access. Whether you want to volunteer, 
              partner with us, or learn more about accessibility, we'd love to hear from you.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="gap-2 underglow" aria-label="Contact Unmute">
                <Users className="w-4 h-4" aria-hidden="true" />
                Contact Us
              </Button>
              <Button size="lg" variant="outline" className="glass underglow" aria-label="Donate to Unmute">
                <Heart className="w-4 h-4" aria-hidden="true" />
                Donate
              </Button>
            </div>
            
            {/* ASL Translator Demo */}
            <div className="mt-12 p-6 glass-card rounded-xl max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4">Try Our AI ASL Translator</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Experience real-time American Sign Language translation powered by AI
              </p>
              <Link to="/asl-translator" className="w-full">
                <Button className="w-full gap-2 underglow" aria-label="Open ASL Translator">
                  <Hand className="w-4 h-4" />
                  Open ASL Translator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <UnmuteLogo showText={true} />
              <p className="text-sm text-muted-foreground mt-4">
                Empowering accessibility for all.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#focus" className="text-muted-foreground hover:text-primary transition-colors">Our Focus</a></li>
                <li><a href="#impact" className="text-muted-foreground hover:text-primary transition-colors">Impact</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Email: info@unmuteaccess.org<br />
                Website: unmuteaccess.org
              </p>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Unmute. All rights reserved. Built with accessibility in mind.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;