import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { UnmuteLogo } from "@/components/UnmuteLogo";
import { AccessibilityPopup } from "@/components/AccessibilityPopup";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";

interface Resource {
  name: string;
  description: string;
  link: string;
  platforms?: string[];
}

const ResourcesPage = () => {
  const screenReaders: Resource[] = [
    {
      name: "JAWS",
      description: "Industry-leading screen reader for Windows with extensive support for desktop applications and web content.",
      link: "https://www.freedomscientific.com/products/software/jaws/",
      platforms: ["Windows"]
    },
    {
      name: "NVDA",
      description: "Free, open-source screen reader for Windows with excellent web and application support.",
      link: "https://www.nvaccess.org/",
      platforms: ["Windows"]
    },
    {
      name: "VoiceOver",
      description: "Built-in screen reader for Apple devices with seamless integration across macOS, iOS, and iPadOS.",
      link: "https://www.apple.com/accessibility/voiceover/",
      platforms: ["macOS", "iOS"]
    },
    {
      name: "TalkBack",
      description: "Android's built-in screen reader providing spoken, audible, and vibration feedback.",
      link: "https://support.google.com/accessibility/android/answer/6283677",
      platforms: ["Android"]
    }
  ];

  const textReading: Resource[] = [
    {
      name: "Natural Reader",
      description: "Text-to-speech software that reads text, PDFs, and web pages aloud with natural-sounding voices.",
      link: "https://www.naturalreaders.com/",
      platforms: ["Windows", "macOS", "iOS", "Android"]
    },
    {
      name: "Voice Dream Reader",
      description: "Feature-rich reading app that converts documents, web articles, and eBooks into spoken word.",
      link: "https://www.voicedream.com/reader/",
      platforms: ["iOS", "Android"]
    },
    {
      name: "Immersive Reader",
      description: "Microsoft's free tool that improves reading comprehension with text decoding, fluency, and comprehension support.",
      link: "https://www.microsoft.com/en-us/education/products/learning-tools",
      platforms: ["Web", "Windows"]
    },
    {
      name: "BeeLine Reader",
      description: "Reading tool that uses color gradients to guide eyes through text, improving reading speed and comprehension.",
      link: "https://www.beelinereader.com/",
      platforms: ["Web", "iOS", "Android"]
    }
  ];

  const communication: Resource[] = [
    {
      name: "The ASL App",
      description: "Free American Sign Language learning app with over 2,500 signs and interactive lessons.",
      link: "https://theaslapp.com/",
      platforms: ["iOS", "Android"]
    },
    {
      name: "Proloquo2Go",
      description: "Augmentative and alternative communication (AAC) app providing a voice to those who cannot speak.",
      link: "https://www.assistiveware.com/products/proloquo2go",
      platforms: ["iOS"]
    },
    {
      name: "Live Transcribe",
      description: "Google's app that transcribes speech to text in real-time, helping deaf and hard-of-hearing people.",
      link: "https://www.android.com/accessibility/live-transcribe/",
      platforms: ["Android"]
    },
    {
      name: "Ava",
      description: "Professional captioning app for meetings and conversations, combining AI and professional captioners.",
      link: "https://www.ava.me/",
      platforms: ["iOS", "Android", "Web"]
    }
  ];

  const mobilityMotor: Resource[] = [
    {
      name: "Dragon NaturallySpeaking",
      description: "Advanced speech recognition software for hands-free computer control and dictation.",
      link: "https://www.nuance.com/dragon.html",
      platforms: ["Windows", "macOS"]
    },
    {
      name: "Voice Control",
      description: "Apple's built-in voice control feature for hands-free navigation and control of devices.",
      link: "https://support.apple.com/en-us/HT210539",
      platforms: ["macOS", "iOS"]
    },
    {
      name: "Click-N-Type",
      description: "Free on-screen keyboard for users who cannot use a physical keyboard.",
      link: "https://cnt.lakefolks.org/",
      platforms: ["Windows"]
    },
    {
      name: "Tecla Shield",
      description: "Device that allows switch users to control smartphones, tablets, and computers.",
      link: "https://gettecla.com/",
      platforms: ["iOS", "Android", "Windows"]
    }
  ];

  const visualAids: Resource[] = [
    {
      name: "ZoomText",
      description: "Screen magnification and reading software for low vision users with customizable viewing options.",
      link: "https://www.freedomscientific.com/products/software/zoomtext/",
      platforms: ["Windows"]
    },
    {
      name: "Seeing AI",
      description: "Microsoft's free app that narrates the world around you, describing people, text, and objects.",
      link: "https://www.microsoft.com/en-us/ai/seeing-ai",
      platforms: ["iOS"]
    },
    {
      name: "Be My Eyes",
      description: "Free app connecting blind and low-vision people with sighted volunteers for visual assistance.",
      link: "https://www.bemyeyes.com/",
      platforms: ["iOS", "Android"]
    },
    {
      name: "Magnifier",
      description: "Built-in magnification tool on Apple devices with detection mode for people, doors, and more.",
      link: "https://support.apple.com/guide/iphone/magnifier-iph3e2e367e/ios",
      platforms: ["iOS"]
    }
  ];

  const webAccessibility: Resource[] = [
    {
      name: "WAVE",
      description: "Web accessibility evaluation tool that helps identify accessibility issues on web pages.",
      link: "https://wave.webaim.org/",
      platforms: ["Web"]
    },
    {
      name: "axe DevTools",
      description: "Browser extension for testing web accessibility during development.",
      link: "https://www.deque.com/axe/devtools/",
      platforms: ["Chrome", "Firefox"]
    },
    {
      name: "Dark Reader",
      description: "Browser extension that enables dark mode for every website, reducing eye strain.",
      link: "https://darkreader.org/",
      platforms: ["Chrome", "Firefox", "Safari"]
    },
    {
      name: "Read&Write",
      description: "Literacy support tool offering text-to-speech, word prediction, and more for web content.",
      link: "https://www.texthelp.com/products/read-write/",
      platforms: ["Web", "Chrome"]
    }
  ];

  const renderResourceCard = (resource: Resource) => (
    <Card key={resource.name} className="h-full hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          {resource.name}
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
        {resource.platforms && (
          <CardDescription className="text-xs">
            {resource.platforms.join(", ")}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
        <Button 
          asChild 
          variant="outline" 
          size="sm"
          className="w-full"
        >
          <a 
            href={resource.link} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Visit ${resource.name} website`}
          >
            Learn More
          </a>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <AccessibilityPopup />
      <AccessibilityToolbar />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass z-50 border-b border-primary/10" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <UnmuteLogo />
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Accessibility Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover helpful accessibility apps, tools, and services to enhance your digital experience
          </p>
        </div>

        {/* Resources Tabs */}
        <Tabs defaultValue="screen-readers" className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="screen-readers">Screen Readers</TabsTrigger>
            <TabsTrigger value="text-reading">Text & Reading</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="mobility">Mobility & Motor</TabsTrigger>
            <TabsTrigger value="visual">Visual Aids</TabsTrigger>
            <TabsTrigger value="web">Web Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="screen-readers" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {screenReaders.map(renderResourceCard)}
            </div>
          </TabsContent>

          <TabsContent value="text-reading" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {textReading.map(renderResourceCard)}
            </div>
          </TabsContent>

          <TabsContent value="communication" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {communication.map(renderResourceCard)}
            </div>
          </TabsContent>

          <TabsContent value="mobility" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mobilityMotor.map(renderResourceCard)}
            </div>
          </TabsContent>

          <TabsContent value="visual" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visualAids.map(renderResourceCard)}
            </div>
          </TabsContent>

          <TabsContent value="web" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {webAccessibility.map(renderResourceCard)}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center glass rounded-lg p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <h2 className="text-2xl font-bold mb-4">Can't Find What You Need?</h2>
          <p className="text-muted-foreground mb-6">
            Have a suggestion for a resource we should add? Contact us to help improve this list.
          </p>
          <Link to="/#contact">
            <Button>
              Contact Us
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ResourcesPage;
