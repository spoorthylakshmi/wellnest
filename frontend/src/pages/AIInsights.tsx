import { useEffect, useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Brain,
  Heart,
  Sun,
  Moon,
  Zap,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
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

const moodScoreMap: Record<string, number> = {
  happy: 9,
  calm: 8,
  neutral: 6,
  sad: 4,
  angry: 3,
};


 const AIInsights = () => {
   const [logs, setLogs] = useState<any[]>([]);
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const url = userId
      ? `http://localhost:5000/api/daily-log/${userId}`
      : "http://localhost:5000/api/daily-log";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Logs:", data);
        // API might return { data: [...] } or an array directly
        setLogs((data && (data.data ?? data)) || []);
      })
      .catch((err) => console.error("Failed to fetch logs:", err));
  }, []);


  /* -------------------- DATA TRANSFORMATIONS -------------------- */

  /*const moodData = logs.slice(-7).map((log: any) => ({
    day: new Date(log.createdAt).toLocaleDateString("en-US", { weekday: "short" }),
    score: moodScoreMap[log.mood] ?? 6,
  }));*/
 const moodData = logs.slice(-7).map((log: any) => ({
  day: new Date(log.createdAt).toLocaleDateString("en-US", {
    weekday: "short",
  }),
  score: moodScoreMap[log.mood] ?? 6,
}));



 const avgMood =
  moodData.reduce((sum, m) => sum + m.score, 0) /
  (moodData.length || 1);


  const stressLevel = Math.max(100 - avgMood * 10, 20);


 const avgSleep =
  logs.reduce((sum, log) => sum + (log.sleepHours || 0), 0) /
  (logs.length || 1);


  const avgExercise =
  logs.reduce((sum, log) => sum + (log.exerciseTime || 0), 0) /
  (logs.length || 1);


  const weeklyWellnessData = logs.slice(-4).map((log: any, i: number) => ({
    week: `Week ${i + 1}`,
    sleep: log.sleep,
    exercise: log.exercise,
    mindfulness: Math.min(log.exerciseTime / 2, 30),
  }));

  const activityDistribution = [
    { name: "Sleep", value: Math.round((avgSleep / 8) * 100), color: "#a78bfa" },
    { name: "Exercise", value: Math.round((avgExercise / 60) * 100), color: "#34d399" },
    { name: "Mindfulness", value: 15, color: "#60a5fa" },
    { name: "Work", value: 30, color: "#fbbf24" },
  ];

  const stressData = moodData.map((m) => ({
    day: m.day,
    stress: Math.max(100 - m.score * 10, 20),
  }));

  const metrics = [
  {
    label: "Stress Level",
    value: Math.round(stressLevel),
  },
  {
    label: "Sleep Quality",
    value: Math.min(Math.round((avgSleep / 8) * 100), 100),
  },
  {
    label: "Mindfulness",
    value: Math.min(Math.round((avgExercise / 30) * 100), 100),
  },
  {
    label: "Activity",
    value: Math.min(Math.round((avgExercise / 60) * 100), 100),
  },
];


  const insights = [
    {
      icon: TrendingUp,
      title: "Mood Trend",
      message:
        avgMood >= 7
          ? "Your mood has been stable and positive recently. Keep it up!"
          : "Your mood seems lower recently. Consider rest and mindfulness.",
      type: "positive",
    },
    {
      icon: Moon,
      title: "Sleep Insight",
      message:
        avgSleep >= 7
          ? "You are maintaining healthy sleep patterns."
          : "Your sleep duration is below optimal. Try winding down earlier.",
      type: "suggestion",
    },
    {
      icon: Zap,
      title: "Energy Levels",
      message:
        avgExercise >= 30
          ? "You’ve been active lately — great for energy levels!"
          : "Try light daily exercise to improve energy.",
      type: "info",
    },
  ];

  const tips = [
    "Maintain consistent sleep and wake times",
    "Short walks can significantly improve mood",
    "Journaling helps process daily emotions",
    "Breathing exercises reduce stress quickly",
  ];

  /* -------------------- UI -------------------- */

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wellness-lavender/30 mb-4">
            <Sparkles className="h-4 w-4" />
             Insights
          </div>
          <h1 className="text-4xl font-bold mb-2">Your Wellness Dashboard</h1>
          <p className="text-muted-foreground">
            Insights generated from your personal wellness data
          </p>
        </div>

        {/* Mood & Stress */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <Brain className="h-5 w-5" /> Weekly Mood Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={moodData}>
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Area dataKey="score" stroke="#22c55e" fill="#bbf7d0" />
                </AreaChart>
              </ResponsiveContainer>

              <div className="flex justify-between mt-4 bg-muted/50 p-4 rounded-xl">
                <div>
                  <p className="text-sm">Average Mood</p>
                  <p className="text-2xl font-bold">{avgMood.toFixed(1)} / 10</p>
                </div>
                <Badge className="bg-wellness-green">
                  + Trend improving
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <Heart className="h-5 w-5" /> Stress Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stressData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stress" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
              <Badge className="w-full mt-4 justify-center">
                Stress Level: {Math.round(stressLevel)}%
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {metrics.map((m, i) => (
            <Card key={i} className="shadow-md border-0">
              <CardContent className="pt-6">
                <div className="flex justify-between mb-2">
                  <span>{m.label}</span>
                  <span>{Math.round(m.value)}%</span>
                </div>
                <Progress value={m.value} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Insights */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center">
            <Sparkles />  Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {insights.map((ins, i) => (
              <Card key={i} className="shadow-md border-0">
                <CardContent className="pt-6 flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <ins.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{ins.title}</h3>
                    <p className="text-sm text-muted-foreground">{ins.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips */}
        <Card className="mt-10 shadow-lg border-0">
          <CardHeader>
            <CardTitle> Wellness Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tips.map((t, i) => (
                <li key={i}>• {t}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIInsights;
