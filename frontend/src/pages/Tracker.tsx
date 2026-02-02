import { Link } from "react-router-dom";
import { Flame, Award, Target, Calendar, TrendingUp, Star, Zap, Heart, Brain, Sun, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Wellness Tracker Page
 * Displays streaks, badges, and progress with static mock data
 */
const Tracker = () => {
  // Current streak data (mock)
  const streakData = {
    current: 12,
    longest: 28,
    thisWeek: [true, true, true, true, true, false, false], // Mon-Sun
  };

  // Badges earned (mock data with fancy names)
  const badges = [
    {
      icon: Star,
      name: "Dawn Warrior",
      description: "Completed 7 days of morning routines",
      earned: true,
      color: "bg-yellow-400",
    },
    {
      icon: Zap,
      name: "Serenity Seeker",
      description: "Used sound therapy 10 times",
      earned: true,
      color: "bg-wellness-blue",
    },
    {
      icon: Heart,
      name: "Mindful Guardian",
      description: "Maintained a 7-day streak",
      earned: true,
      color: "bg-wellness-lavender",
    },
    {
      icon: Brain,
      name: "Zen Master",
      description: "Complete 30 meditation sessions",
      earned: false,
      progress: 65,
      color: "bg-wellness-mint",
    },
    {
      icon: Sun,
      name: "Harmony Hero",
      description: "Achieve all daily goals for a week",
      earned: false,
      progress: 40,
      color: "bg-wellness-peach",
    },
    {
      icon: TrendingUp,
      name: "Wellness Wizard",
      description: "Reach a 30-day streak",
      earned: false,
      progress: 40,
      color: "bg-primary",
    },
  ];

  // Progress categories (mock data)
  const progressCategories = [
    { label: "Mental Wellness", progress: 72, icon: Brain },
    { label: "Physical Activity", progress: 58, icon: Target },
    { label: "Sleep Quality", progress: 85, icon: Calendar },
    { label: "Mindfulness", progress: 64, icon: Heart },
  ];

  // Recent activities (mock data)
  const recentActivities = [
    { action: "Completed morning meditation", time: "Today, 7:30 AM", points: "+10" },
    { action: "Listened to Ocean sounds", time: "Today, 2:15 PM", points: "+5" },
    { action: "Logged mood as 'Happy'", time: "Yesterday, 8:00 PM", points: "+3" },
    { action: "Completed 10K steps goal", time: "Yesterday, 6:45 PM", points: "+15" },
    { action: "Tried breathing exercise", time: "2 days ago", points: "+8" },
  ];

  // Days of the week
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wellness-peach/30 text-foreground mb-4">
            <Target className="h-4 w-4" />
            <span className="text-sm font-medium">Wellness Tracker</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Track Your Journey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Monitor your progress, maintain streaks, and earn badges as you build 
            healthy habits.
          </p>
          {/* Prominent CTA Card */}
          <Card className="max-w-md mx-auto border-2 border-primary/30 shadow-xl bg-gradient-to-r from-primary/10 via-wellness-mint/20 to-primary/10">
            <CardContent className="py-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">Ready to track today's progress?</p>
              <Button asChild size="lg" className="rounded-full gap-2 px-8 text-base shadow-lg hover:scale-105 transition-transform">
                <Link to="/daily-input">
                  <PlusCircle className="h-5 w-5" />
                  Log Today's Data
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Streak Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Current Streak Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">Current Streak</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-bold text-foreground">{streakData.current}</span>
                    <span className="text-2xl text-muted-foreground">days</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Longest streak: {streakData.longest} days
                  </p>
                </div>
                <div className="text-8xl animate-pulse-soft">
                  <Flame className="h-24 w-24 text-orange-500" />
                </div>
              </div>

              {/* Weekly progress */}
              <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-3">This Week</p>
                <div className="flex gap-2">
                  {weekDays.map((day, index) => (
                    <div key={index} className="flex-1 text-center">
                      <div
                        className={`w-full aspect-square rounded-lg flex items-center justify-center mb-1 ${
                          streakData.thisWeek[index]
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {streakData.thisWeek[index] ? "✓" : ""}
                      </div>
                      <span className="text-xs text-muted-foreground">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overall Progress */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Overall Progress
              </CardTitle>
              <CardDescription>Your wellness journey at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {progressCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{category.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{category.progress}%</span>
                  </div>
                  <Progress value={category.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Badges & Achievements
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge, index) => (
              <Card
                key={index}
                className={`border-0 shadow-md transition-all duration-300 ${
                  badge.earned
                    ? "wellness-card-hover"
                    : "opacity-70"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        badge.earned ? badge.color : "bg-muted"
                      }`}
                    >
                      <badge.icon
                        className={`h-7 w-7 ${
                          badge.earned ? "text-white" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{badge.name}</h3>
                        {badge.earned && (
                          <Badge className="bg-wellness-green text-foreground text-xs">
                            Earned
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {badge.description}
                      </p>
                      {!badge.earned && badge.progress !== undefined && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-foreground">{badge.progress}%</span>
                          </div>
                          <Progress value={badge.progress} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest wellness actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="secondary" className="text-primary">
                    {activity.points}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary">
            <Flame className="h-5 w-5" />
            <span className="font-medium">Keep going! You're doing amazing! 🌟</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
