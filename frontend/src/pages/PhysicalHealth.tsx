import { Activity, Dumbbell, Apple, Timer, Droplets, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

/**
 * Physical Health Page
 * Exercise tips, nutrition guides, and body wellness information
 * All data is static/mock for demo purposes
 */
const PhysicalHealth = () => {
  // Daily stats (mock data) - removed Steps card
  const dailyStats = [
    { icon: Droplets, label: "Water", value: "6", target: "8 glasses", progress: 75 },
    { icon: Timer, label: "Exercise", value: "35", target: "45 min", progress: 78 },
    { icon: Moon, label: "Sleep", value: "7.2", target: "8 hours", progress: 90 },
  ];

  // Exercise categories
  const exercises = [
    {
      title: "Morning Yoga",
      description: "15-minute gentle stretching routine to start your day",
      duration: "15 min",
      difficulty: "Easy",
      color: "bg-wellness-mint",
    },
    {
      title: "Desk Stretches",
      description: "Quick stretches you can do at your workspace",
      duration: "5 min",
      difficulty: "Easy",
      color: "bg-wellness-blue",
    },
    {
      title: "Evening Walk",
      description: "Light cardio to help you unwind after work",
      duration: "30 min",
      difficulty: "Easy",
      color: "bg-wellness-lavender",
    },
    {
      title: "Core Workout",
      description: "Strengthen your core with these simple exercises",
      duration: "20 min",
      difficulty: "Medium",
      color: "bg-wellness-peach",
    },
  ];

  // Nutrition tips
  const nutritionTips = [
    {
      icon: Apple,
      title: "Eat Colorful",
      tip: "Include a variety of colorful fruits and vegetables in every meal for optimal nutrition.",
    },
    {
      icon: Droplets,
      title: "Stay Hydrated",
      tip: "Drink at least 8 glasses of water daily. Set reminders if needed!",
    },
    {
      icon: Timer,
      title: "Mindful Eating",
      tip: "Take time to enjoy your meals. Eating slowly aids digestion and satisfaction.",
    },
  ];


  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wellness-mint/30 text-foreground mb-4">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">Physical Wellness</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Move Your Body
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover exercises, nutrition tips, and healthy habits to keep your body 
            feeling strong and energized.
          </p>
        </div>

        {/* Daily Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {dailyStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">of {stat.target}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="text-foreground font-medium">{stat.progress}%</span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Exercise Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            Recommended Exercises
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {exercises.map((exercise, index) => (
              <Card
                key={index}
                className="border-0 shadow-md wellness-card-hover cursor-pointer"
              >
                <CardContent className="pt-6">
                  <div className={`${exercise.color} w-full h-2 rounded-full mb-4`} />
                  <h3 className="font-semibold text-foreground mb-2">{exercise.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{exercise.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{exercise.duration}</Badge>
                    <Badge variant="outline">{exercise.difficulty}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nutrition Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Apple className="h-6 w-6 text-primary" />
            Nutrition Tips
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {nutritionTips.map((tip, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-gradient-to-br from-wellness-peach/20 to-transparent"
              >
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-2">
                    <tip.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tip.tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Motivational Section */}
        <div className="mt-12 text-center">
          <Card className="border-0 shadow-lg wellness-gradient p-8">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Every Step Counts! 🌟
              </h3>
              <p className="text-foreground/80">
                Remember, physical wellness is a journey, not a destination. 
                Celebrate your small victories and keep moving forward!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhysicalHealth;
