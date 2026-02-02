import { Sparkles, TrendingUp, Brain, Heart, Sun, Moon, Zap, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/**
 * AI Insights Page
 * Dashboard-style layout with mock AI-generated insights
 * All data is static/dummy for demo purposes
 */
const AIInsights = () => {
  // Mock mood data for the week (for line chart)
  const moodData = [
    { day: "Mon", score: 7, emoji: "😊" },
    { day: "Tue", score: 6, emoji: "🙂" },
    { day: "Wed", score: 8, emoji: "😄" },
    { day: "Thu", score: 5, emoji: "😐" },
    { day: "Fri", score: 7, emoji: "😊" },
    { day: "Sat", score: 9, emoji: "🥳" },
    { day: "Sun", score: 8, emoji: "😄" },
  ];

  // Weekly wellness data for area chart
  const weeklyWellnessData = [
    { week: "Week 1", sleep: 6.5, exercise: 25, mindfulness: 15 },
    { week: "Week 2", sleep: 7, exercise: 30, mindfulness: 20 },
    { week: "Week 3", sleep: 6.8, exercise: 35, mindfulness: 25 },
    { week: "Week 4", sleep: 7.5, exercise: 40, mindfulness: 30 },
  ];

  // Activity distribution for pie chart
  const activityDistribution = [
    { name: "Sleep", value: 35, color: "#a78bfa" },
    { name: "Exercise", value: 20, color: "#34d399" },
    { name: "Mindfulness", value: 15, color: "#60a5fa" },
    { name: "Work", value: 30, color: "#fbbf24" },
  ];

  // Stress levels over time for bar chart
  const stressData = [
    { day: "Mon", stress: 65 },
    { day: "Tue", stress: 55 },
    { day: "Wed", stress: 45 },
    { day: "Thu", stress: 60 },
    { day: "Fri", stress: 40 },
    { day: "Sat", stress: 25 },
    { day: "Sun", stress: 30 },
  ];

  // Personalized insights (mock data)
  const insights = [
    {
      icon: TrendingUp,
      title: "Mood Improvement",
      message: "You seem more relaxed this week! Your average mood score increased by 15%.",
      type: "positive" as const,
    },
    {
      icon: Moon,
      title: "Evening Recommendation",
      message: "Try sound therapy in the evening. Based on your patterns, it could help you unwind.",
      type: "suggestion" as const,
    },
    {
      icon: Sun,
      title: "Morning Routine",
      message: "Your best moods happen after morning activities. Consider keeping this routine!",
      type: "positive" as const,
    },
    {
      icon: Zap,
      title: "Energy Levels",
      message: "You've been most energetic on weekends. Try to bring some weekend joy to weekdays!",
      type: "info" as const,
    },
  ];

  // Wellness metrics (mock data)
  const metrics = [
    { label: "Stress Level", value: 35, color: "bg-wellness-green" },
    { label: "Sleep Quality", value: 72, color: "bg-wellness-blue" },
    { label: "Mindfulness", value: 58, color: "bg-wellness-lavender" },
    { label: "Activity", value: 65, color: "bg-wellness-mint" },
  ];

  // Tips based on "AI analysis"
  const tips = [
    "Take a 5-minute breathing break when stress rises",
    "Your optimal sleep time appears to be 10:30 PM",
    "Walking after lunch could boost your afternoon energy",
    "Consider journaling your thoughts before bed",
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wellness-lavender/30 text-accent-foreground mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Insights</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Wellness Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Personalized insights and recommendations based on your wellness journey.
          </p>
          <Badge variant="secondary" className="mt-4">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-generated (demo)
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mood Trend Chart */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Weekly Mood Trend
              </CardTitle>
              <CardDescription>
                Your mood patterns over the past 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moodData}>
                    <defs>
                      <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis domain={[0, 10]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="url(#moodGradient)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Average Mood Score</p>
                  <p className="text-2xl font-bold text-foreground">7.1 / 10</p>
                </div>
                <Badge className="bg-wellness-green text-foreground">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% from last week
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Stress Level Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Stress Levels
              </CardTitle>
              <CardDescription>Daily stress tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="stress" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <Badge variant="secondary" className="w-full justify-center py-2 mt-4">
                😌 Stress trending down!
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Second Row Charts */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Weekly Wellness Trends */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Monthly Wellness Trends
              </CardTitle>
              <CardDescription>Sleep, Exercise & Mindfulness over 4 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyWellnessData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="sleep" stroke="#a78bfa" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="exercise" stroke="#34d399" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="mindfulness" stroke="#60a5fa" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Activity Distribution Pie Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Time Distribution
              </CardTitle>
              <CardDescription>How you spend your wellness time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={activityDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {activityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wellness Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">{metric.label}</span>
                  <span className="text-sm text-muted-foreground">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Personalized Insights */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Personalized Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <Card
                key={index}
                className={`border-0 shadow-md wellness-card-hover ${
                  insight.type === "positive"
                    ? "bg-gradient-to-br from-wellness-mint/20 to-transparent"
                    : insight.type === "suggestion"
                    ? "bg-gradient-to-br from-wellness-lavender/20 to-transparent"
                    : "bg-gradient-to-br from-wellness-blue/20 to-transparent"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <insight.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">{insight.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Wellness Tips */}
        <Card className="mt-12 border-0 shadow-lg bg-gradient-to-br from-primary/5 to-wellness-lavender/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Today's Wellness Tips
            </CardTitle>
            <CardDescription>
              Personalized recommendations based on your patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <p className="text-foreground">{tip}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <p className="text-center text-sm text-muted-foreground mt-8 flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4" />
          All insights shown are demo data. Real AI analysis will be connected via backend API.
        </p>
      </div>
    </div>
  );
};

export default AIInsights;
