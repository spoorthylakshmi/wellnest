import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  Target,
  Calendar,
  TrendingUp,
  Brain,
  Heart,
  PlusCircle,
  Star,
  Zap,
  Sun,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TrackerData {
  streak: {
    current: number;
    longest: number;
    thisWeek: boolean[];
  };
  progress: {
    label: string;
    progress: number;
  }[];
  recentActivities: {
    action: string;
    time: string;
    points: string;
  }[];
}

interface BadgeData {
  name: string;
  description: string;
  earned: boolean;
  progress?: number;
  color: string;
  icon: string;
}

const iconMap: any = {
  Star,
  Zap,
  Heart,
  Brain,
  Sun,
  TrendingUp,
};

const Tracker = () => {
  const [data, setData] = useState<TrackerData | null>(null);
  const [badges, setBadges] = useState<BadgeData[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trackerRes = await fetch(
          `http://127.0.0.1:5000/api/tracker/${userId}`
        );
        const trackerJson = await trackerRes.json();
        setData(trackerJson);

        const badgeRes = await fetch(
          "http://127.0.0.1:5000/api/badges"
        );
        const badgeJson = await badgeRes.json();
        setBadges(badgeJson);
      } catch (error) {
        console.error("Error fetching tracker data", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading tracker data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">
          No tracker data available yet. Start logging your wellness 🌱
        </p>
      </div>
    );
  }

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="min-h-screen py-12">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wellness-peach/30 mb-4">
            <Target className="h-4 w-4" />
            <span className="text-sm font-medium">Wellness Tracker</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">Track Your Journey</h1>
          <p className="text-muted-foreground mb-6">
            Monitor your progress and maintain healthy habits.
          </p>

          <Button asChild size="lg" className="rounded-full gap-2">
            <Link to="/daily-input">
              <PlusCircle className="h-5 w-5" />
              Log Today's Data
            </Link>
          </Button>
        </div>

        {/* Streak Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="shadow-lg">
            <CardContent className="pt-8">
              <p className="text-muted-foreground mb-1">Current Streak</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold">
                  {data.streak.current}
                </span>
                <span className="text-2xl text-muted-foreground">days</span>
              </div>
              <p className="text-sm mt-2">
                Longest streak: {data.streak.longest} days
              </p>

              <div className="mt-6 flex gap-2">
                {weekDays.map((day, index) => (
                  <div key={index} className="flex-1 text-center">
                    <div
                      className={`w-full aspect-square rounded-lg flex items-center justify-center mb-1 ${
                        data.streak.thisWeek[index]
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {data.streak.thisWeek[index] ? "✓" : ""}
                    </div>
                    <span className="text-xs">{day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Overall Progress
              </CardTitle>
              <CardDescription>Your wellness at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.progress.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="flex items-center gap-2 text-sm">
                      {item.label === "Mental Wellness" && (
                        <Brain className="h-4 w-4" />
                      )}
                      {item.label === "Mindfulness" && (
                        <Heart className="h-4 w-4" />
                      )}
                      {item.label}
                    </span>
                    <span className="text-sm">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>



        {/* Motivation */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10">
            <Flame className="h-5 w-5" />
            <span className="font-medium">
              Keep going! You're doing amazing! 🌟
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
