import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Hand, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { UnmuteLogo } from "@/components/UnmuteLogo";
import { HeroVisualization } from "@/components/HeroVisualization";
import { ContactForm } from "@/components/ContactForm";
import { DonationFundraiser } from "@/components/DonationFundraiser";
import { NewsletterForm } from "@/components/NewsletterForm";
import { AccessibilityPopup } from "@/components/AccessibilityPopup";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";

const Index = () => {
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen">
      <AccessibilityPopup />
      <AccessibilityToolbar />
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass z-50 border-b border-primary/10" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <UnmuteLogo />
          <ul className="hidden md:flex gap-8 list-none">
            <li><a href="#story" onClick={(e) => smoothScroll(e, '#story')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Our Story</a></li>
            <li><a href="#founder" onClick={(e) => smoothScroll(e, '#founder')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Founder</a></li>
            <li><a href="#products" onClick={(e) => smoothScroll(e, '#products')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Products</a></li>
            <li><a href="#vision" onClick={(e) => smoothScroll(e, '#vision')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Vision</a></li>
            <li><a href="#donate" onClick={(e) => smoothScroll(e, '#donate')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Donate</a></li>
            <li><a href="#contact" onClick={(e) => smoothScroll(e, '#contact')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Contact</a></li>
          </ul>
          <a href="#donate" onClick={(e) => smoothScroll(e, '#donate')}>
            <Button className="underglow shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)]">
              Donate
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ background: 'radial-gradient(ellipse at center, hsl(222 29% 9%) 0%, hsl(222 32% 6%) 100%)' }} aria-labelledby="hero-heading">
        <div className="absolute w-full h-full" style={{ background: 'radial-gradient(circle at 20% 50%, hsl(189 100% 50% / 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(180 100% 50% / 0.08) 0%, transparent 50%)', animation: 'floatGlow 8s ease-in-out infinite' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <HeroVisualization />
          
          <h1 id="hero-heading" className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight" style={{ animation: 'fade-in-up 0.8s ease' }}>
            Unmute Inc.
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-primary font-normal tracking-wide" style={{ animation: 'fade-in-up 0.8s ease 0.2s backwards' }}>
            Everyone deserves a voice.
          </p>
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-4xl mx-auto leading-relaxed" style={{ animation: 'fade-in-up 0.8s ease 0.4s backwards' }}>
            A movement toward a more human kind of technology—where expression is universal and accessibility is fundamental.
          </p>
          <div className="flex gap-6 justify-center flex-wrap" style={{ animation: 'fade-in-up 0.8s ease 0.6s backwards' }}>
            <a href="#story" onClick={(e) => smoothScroll(e, '#story')}>
              <Button size="lg" className="text-lg px-14 py-7 rounded-full underglow shadow-[0_0_40px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)] gap-2">
                Our Story <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a href="#products" onClick={(e) => smoothScroll(e, '#products')}>
              <Button size="lg" variant="outline" className="text-lg px-14 py-7 rounded-full underglow bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/60">
                Explore Products
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-40 relative" aria-labelledby="story-heading">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold uppercase tracking-[2px] mb-8">
              Our Beginning
            </span>
            <h2 id="story-heading" className="text-4xl md:text-6xl font-extrabold mb-12 tracking-tight">Where It All Started</h2>
            <div className="space-y-8 text-left">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Unmute began as a communication app for <span className="text-primary font-semibold">nonverbal individuals</span>—especially those on the autism spectrum—using adaptive AI to learn from each user's tone, rhythm, and intent to create a <span className="text-primary font-semibold">personalized digital voice</span> that truly represents them.
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                What started as a mission to make speech accessible has grown into something larger: a commitment to making <span className="text-primary font-semibold">all technology inclusive</span>. We're now developing tools like an AI-powered ASL translator and working to embed accessibility and empathy into every layer of artificial intelligence.
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Our vision is a world where technology doesn't just include people with disabilities—<span className="text-primary font-semibold">it's built with them in mind from the start</span>. Through research, innovation, and collaboration, we're building systems that make expression universal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-40 relative" style={{ background: 'radial-gradient(ellipse at center, hsl(189 100% 50% / 0.05) 0%, hsl(222 32% 6%) 70%)' }} aria-labelledby="founder-heading">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold uppercase tracking-[2px] mb-8">
              Meet the Founder
            </span>
            <h2 id="founder-heading" className="text-4xl md:text-6xl font-extrabold mb-12 tracking-tight">Matthew</h2>
            <div className="w-[200px] h-[200px] mx-auto mb-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary/40 flex items-center justify-center text-7xl shadow-[0_0_40px_hsl(var(--primary)/0.3)]">
              👤
            </div>
            <div className="space-y-8 text-left">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Matthew founded Unmute with a deeply personal mission: to ensure that everyone, regardless of ability, has the tools to communicate and be heard. Driven by a passion for accessibility and human-centered technology, Matthew saw firsthand how traditional communication tools often left nonverbal individuals behind.
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                With a background in AI and assistive technology, Matthew set out to create something different—adaptive tools that learn from each user, respect their unique way of expressing themselves, and evolve to meet their needs. What began as a single app for nonverbal communication has grown into a comprehensive mission to make all technology more inclusive.
              </p>
            </div>
            <p className="text-2xl md:text-3xl text-primary italic mt-12 font-semibold">
              "Technology should amplify every voice, not just some voices. That's what we're building at Unmute."
            </p>
            <p className="text-muted-foreground/60 mt-4">— Matthew, Founder & CEO</p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-40 relative" style={{ background: 'radial-gradient(ellipse at center, hsl(222 29% 9%) 0%, hsl(222 32% 6%) 100%)' }} aria-labelledby="journey-heading">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4">
          <h2 id="journey-heading" className="text-4xl md:text-6xl font-extrabold text-center mb-6 tracking-tight">Our Journey</h2>
          <p className="text-xl md:text-2xl text-muted-foreground text-center mb-20 max-w-4xl mx-auto">
            From a single app to a comprehensive accessibility platform
          </p>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 hidden md:block" />

            {[
              {
                title: 'The Foundation',
                description: 'Created our first communication app focused on helping nonverbal individuals on the autism spectrum express themselves through adaptive AI technology.',
              },
              {
                title: 'Personalized Voices',
                description: "Developed AI that learns from each user's unique patterns—tone, rhythm, and intent—to create truly personalized digital voices that authentically represent each individual.",
              },
              {
                title: 'Expanding Our Mission',
                description: 'Realized our technology could break down barriers beyond speech. Began developing comprehensive accessibility solutions for diverse communities.',
              },
              {
                title: 'ASL AI Innovation',
                description: 'Launched development of our AI-powered ASL translator, bringing real-time sign language communication to the digital world.',
              },
              {
                title: 'The Movement Grows',
                description: "Today, we're not just an app—we're a movement. Embedding accessibility and empathy into every layer of AI, building technology that's human by design.",
              },
            ].map((item, index) => (
              <div key={index} className="relative flex items-center mb-16 md:mb-32" style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
                <div className="w-full md:w-[45%] p-10 glass-card rounded-3xl transition-all duration-400 hover:border-primary/50 hover:shadow-[0_20px_60px_hsl(var(--primary)/0.2)] hover:-translate-y-2">
                  <h3 className="text-3xl font-bold text-primary mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_30px_hsl(var(--primary)/0.6)] z-10 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-40 relative" aria-labelledby="products-heading">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold uppercase tracking-[2px] mb-8">
              Our Solutions
            </span>
            <h2 id="products-heading" className="text-4xl md:text-6xl font-extrabold tracking-tight">Breaking Down Barriers</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: '💬',
                title: 'Adaptive Voice AI',
                description: "Our flagship communication app for nonverbal individuals. Uses adaptive AI to learn from each user's unique patterns—tone, rhythm, and intent—to create a personalized digital voice that truly represents them.",
                tag: 'Core Product',
              },
              {
                icon: '🤟',
                title: 'ASL AI Translator',
                description: 'Real-time sign language recognition and translation powered by advanced machine learning. Bridging the communication gap and making conversations accessible for the deaf and hard-of-hearing community.',
                tag: 'In Development',
              },
              {
                icon: '🧠',
                title: 'Empathetic AI Framework',
                description: 'A comprehensive approach to embedding accessibility and empathy into every layer of artificial intelligence. Building the foundation for truly inclusive technology.',
                tag: 'Research',
              },
              {
                icon: '🌍',
                title: 'Universal Expression Platform',
                description: 'Our vision for the future: A complete ecosystem where all forms of communication—speech, sign, text, and beyond—work seamlessly together to ensure everyone can be heard.',
                tag: 'Future Vision',
              },
            ].map((product, index) => (
              <Card key={index} className="glass-card transition-all duration-400 hover:border-primary/40 hover:shadow-[0_30px_80px_hsl(var(--primary)/0.2)] hover:-translate-y-3 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-primary before:to-accent before:scale-x-0 before:transition-transform before:duration-400 hover:before:scale-x-100">
                <CardContent className="p-14">
                  <div className="text-7xl mb-8 [filter:drop-shadow(0_0_20px_hsl(var(--primary)/0.5))]">{product.icon}</div>
                  <h3 className="text-3xl font-bold mb-6">{product.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">{product.description}</p>
                  <span className="inline-block px-5 py-2 bg-primary/15 border border-primary/30 rounded-full text-primary text-sm font-semibold uppercase tracking-wider">
                    {product.tag}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ASL Translator Demo Link */}
          <div className="mt-20 max-w-2xl mx-auto">
            <Card className="glass-card p-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Try Our AI ASL Translator</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Experience real-time American Sign Language translation powered by AI
              </p>
              <Link to="/asl-translator" className="inline-block">
                <Button size="lg" className="text-lg px-12 py-6 rounded-full underglow shadow-[0_0_40px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)] gap-2">
                  <Hand className="w-5 h-5" />
                  Open ASL Translator
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-40 relative" style={{ background: 'radial-gradient(ellipse at center, hsl(189 100% 50% / 0.05) 0%, hsl(222 32% 6%) 70%)' }} aria-labelledby="vision-heading">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-8xl mb-8 [filter:drop-shadow(0_0_30px_hsl(var(--primary)/0.5))]">✨</div>
            <p className="text-3xl md:text-5xl font-bold mb-12 leading-tight italic">
              "Technology doesn't just include people with disabilities—it's built with them in mind from the start."
            </p>
            <div className="space-y-8">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                We envision a world where accessibility isn't an afterthought, but the foundation of every technological advancement. Where AI doesn't just serve the majority, but empowers every voice. Where innovation is measured not just by what it can do, but by who it serves.
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Through research, innovation, and collaboration with diverse communities, we're building systems that make expression universal. Because when technology is designed with empathy, everyone benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-40 relative" aria-labelledby="donate-heading">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold uppercase tracking-[2px] mb-8">
              Support Our Mission
            </span>
            <h2 id="donate-heading" className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">Help Us Give Everyone a Voice</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-16">
              Your support helps us develop accessible technology and provide our tools to those who need them most.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <DonationFundraiser />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 relative" style={{ background: 'radial-gradient(ellipse at center, hsl(189 100% 50% / 0.05) 0%, hsl(222 32% 6%) 70%)' }} aria-labelledby="contact-heading">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/30 border-t border-primary/10 py-20" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <div>
              <UnmuteLogo showText={true} />
              <p className="text-muted-foreground mt-6 leading-relaxed">
                Empowering accessibility for all through innovative, human-centered technology.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#story" onClick={(e) => smoothScroll(e, '#story')} className="text-muted-foreground hover:text-primary transition-colors">Our Story</a></li>
                <li><a href="#founder" onClick={(e) => smoothScroll(e, '#founder')} className="text-muted-foreground hover:text-primary transition-colors">Founder</a></li>
                <li><a href="#products" onClick={(e) => smoothScroll(e, '#products')} className="text-muted-foreground hover:text-primary transition-colors">Products</a></li>
                <li><a href="#vision" onClick={(e) => smoothScroll(e, '#vision')} className="text-muted-foreground hover:text-primary transition-colors">Vision</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary mb-6">Tools</h4>
              <ul className="space-y-3">
                <li><Link to="/asl-translator" className="text-muted-foreground hover:text-primary transition-colors">ASL Translator</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/10 pt-12">
            <div className="flex flex-col items-center gap-8 mb-12">
              <div className="text-center">
                <h4 className="text-lg font-bold text-primary mb-2">Stay Updated</h4>
                <p className="text-muted-foreground text-sm mb-6">Subscribe to our newsletter for updates and announcements</p>
                <NewsletterForm />
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-8 mb-8">
              <h4 className="text-lg font-bold text-primary">Share Our Mission</h4>
              <div className="flex gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-5 h-5 text-primary" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Check out Unmute Inc. - Everyone deserves a voice')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5 text-primary" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent('Unmute Inc. - Everyone Deserves a Voice')}&body=${encodeURIComponent('Check out Unmute Inc.: ' + window.location.href)}`}
                  className="p-3 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                  aria-label="Share via Email"
                >
                  <Mail className="w-5 h-5 text-primary" />
                </a>
              </div>
            </div>
            <p className="text-muted-foreground/60 text-center">&copy; 2024 Unmute Inc. All rights reserved. Built with accessibility in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
