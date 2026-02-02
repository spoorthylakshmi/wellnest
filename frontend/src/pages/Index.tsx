import { Link } from "react-router-dom";
import { Sparkles, Music, Brain, Activity, Heart, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Landing Page / Home
 * Hero section with tagline and feature highlights
 */
const Index = () => {
  // Feature cards data
  const features = [
    {
      icon: Music,
      title: "Sound Therapy",
      description: "Immerse yourself in calming nature sounds and soothing melodies",
      color: "bg-wellness-blue",
      link: "/sound-therapy",
    },
    {
      icon: Brain,
      title: "AI Insights",
      description: "Get personalized wellness recommendations powered by AI",
      color: "bg-wellness-lavender",
      link: "/ai-insights",
    },
    {
      icon: Activity,
      title: "Wellness Tracker",
      description: "Track your progress and build healthy habits with streaks",
      color: "bg-wellness-green",
      link: "/tracker",
    },
  ];

  // Additional wellness areas
  const wellnessAreas = [
    {
      icon: Heart,
      title: "Mental Health",
      description: "Guided breathing, stress relief, and mindfulness practices",
      link: "/mental-health",
    },
    {
      icon: Sun,
      title: "Physical Health",
      description: "Exercise tips, nutrition guides, and body wellness",
      link: "/physical-health",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 wellness-gradient opacity-30" />
        
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Your wellness journey starts here</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Nurture Your{" "}
              <span className="text-primary">Mind</span> &{" "}
              <span className="text-wellness-blue">Body</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Wellnest brings together mental and physical wellness in one calming space. 
              Discover sound therapy, track your progress, and get personalized insights 
              to feel your best every day.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/sound-therapy">
                  <Music className="mr-2 h-5 w-5" />
                  Explore Sound Therapy
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/ai-insights">
                  <Sparkles className="mr-2 h-5 w-5" />
                  View AI Insights
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="rounded-full px-8">
                <Link to="/tracker">
                  <Activity className="mr-2 h-5 w-5" />
                  Track Wellness
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-wellness-mint/30 blur-2xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-wellness-lavender/30 blur-2xl animate-float" style={{ animationDelay: "1s" }} />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need to Thrive
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our comprehensive wellness tools help you build healthy habits and find inner peace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="h-full wellness-card-hover cursor-pointer border-0 shadow-md">
                  <CardContent className="p-8 text-center">
                    <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <feature.icon className="h-8 w-8 text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Wellness Areas */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {wellnessAreas.map((area, index) => (
              <Link key={index} to={area.link}>
                <Card className="h-full wellness-card-hover cursor-pointer overflow-hidden border-0 shadow-md">
                  <CardContent className="p-8 flex items-center gap-6">
                    <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <area.icon className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {area.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {area.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of people who have found peace and balance with Wellnest
            </p>
            <Button asChild size="lg" className="rounded-full px-10">
              <Link to="/tracker">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
