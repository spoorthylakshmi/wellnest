import { Link } from "react-router-dom";
import { Music, Wind, Heart, Brain, Smile } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Mental Health Section
 * Cards for Sound Therapy, Guided Breathing, and Stress Relief Tips
 */
const MentalHealth = () => {
  // Main wellness cards (removed Stress Relief Tips card)
  const mainCards = [
    {
      icon: Music,
      title: "Sound Therapy",
      description: "Immerse yourself in calming nature sounds and healing frequencies to relax your mind",
      color: "bg-wellness-blue",
      link: "/sound-therapy",
      buttonText: "Listen Now",
    },
    {
      icon: Wind,
      title: "Guided Breathing",
      description: "Follow along with breathing exercises designed to reduce stress and anxiety",
      color: "bg-wellness-mint",
      link: "/guided-breathing",
      buttonText: "Take a Deep Breath",
    },
  ];

  // Quick tips for mental wellness
  const quickTips = [
    {
      icon: Brain,
      title: "Practice Mindfulness",
      description: "Take 5 minutes each day to focus on your breath and be present in the moment.",
    },
    {
      icon: Heart,
      title: "Express Gratitude",
      description: "Write down three things you're grateful for each morning to shift your mindset.",
    },
    {
      icon: Smile,
      title: "Connect with Others",
      description: "Reach out to a friend or loved one today. Social connections boost mental health.",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wellness-lavender/30 text-accent-foreground mb-4">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">Mental Wellness</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Nurture Your Mind
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of mental wellness tools designed to help you 
            find peace, reduce stress, and cultivate a positive mindset.
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
          {mainCards.map((card, index) => (
            <Card
              key={index}
              className="wellness-card-hover border-0 shadow-lg overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                  <card.icon className="h-7 w-7 text-foreground" />
                </div>
                <CardTitle className="text-xl">{card.title}</CardTitle>
                <CardDescription className="text-base">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {card.link ? (
                  <Button asChild className="w-full rounded-full">
                    <Link to={card.link}>{card.buttonText}</Link>
                  </Button>
                ) : (
                  <Button variant="secondary" className="w-full rounded-full" disabled>
                    {card.buttonText}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Tips Section */}
        <div className="bg-muted/30 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Daily Mental Wellness Tips
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickTips.map((tip, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <tip.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-wellness-mint/20 to-wellness-lavender/20 rounded-3xl">
            <p className="text-xl italic text-foreground mb-4">
              "The greatest wealth is health."
            </p>
            <p className="text-muted-foreground">— Virgil</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;
