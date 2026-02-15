import { useEffect, useState } from "react";
import { Activity, Dumbbell, Apple, Timer, Droplets, Moon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

/**
 * Physical Health Page
 * Fetches and displays user physical health data from MongoDB
 */
const PhysicalHealth = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = "6989633b434935eb2dd45f4d";

  useEffect(() => {
    const fetchPhysicalHealth = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/physical-health/${userId}`
        );
        const data = await res.json();
        setHealthData(data);
      } catch (error) {
        console.error("Error fetching physical health data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPhysicalHealth();
    }
  }, [userId]);

  /* -------------------- LOADING & EMPTY STATES -------------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">
          Loading physical health data...
        </p>
      </div>
    );
  }

  if (!healthData || healthData.message) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">
          No physical health data available
        </p>
      </div>
    );
  }

  /* -------------------- DAILY STATS (FROM MONGODB) -------------------- */

  const dailyStats = [
    {
      icon: Droplets,
      label: "Water",
      value: healthData.water_glasses,
      target: "8 glasses",
      progress: Math.min((healthData.water_glasses / 8) * 100, 100),
    },
    {
      icon: Timer,
      label: "Exercise",
      value: healthData.exercise_minutes,
      target: "45 min",
      progress: Math.min((healthData.exercise_minutes / 45) * 100, 100),
    },
    {
      icon: Moon,
      label: "Sleep",
      value: healthData.sleep_hours,
      target: "8 hours",
      progress: Math.min((healthData.sleep_hours / 8) * 100, 100),
    },
  ];

  /* -------------------- STATIC CONTENT -------------------- */

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

  /* -------------------- UI -------------------- */

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wellness-mint/30 mb-4">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">Physical Wellness</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Move Your Body</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover exercises, nutrition tips, and healthy habits to keep your
            body feeling strong and energized.
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
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">
                      of {stat.target}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="font-medium">
                      {Math.round(stat.progress)}%
                    </span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Exercise Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
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
                  <div
                    className={`${exercise.color} w-full h-2 rounded-full mb-4`}
                  />
                  <h3 className="font-semibold mb-2">{exercise.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {exercise.description}
                  </p>
                  <div className="flex gap-2">
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
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
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

        {/* Motivation */}
        <div className="mt-12 text-center">
          <Card className="border-0 shadow-lg wellness-gradient p-8">
            <h3 className="text-2xl font-bold mb-4">Every Step Counts! 🌟</h3>
            <p className="text-foreground/80">
              Physical wellness is a journey. Celebrate small wins and keep
              moving forward!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhysicalHealth;
