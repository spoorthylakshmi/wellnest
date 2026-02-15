import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Moon, Droplets, Dumbbell, BookOpen,
  Mic, MicOff, Smile, Meh, Frown, Angry, Heart, Sparkles,
  Save, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

/**
 * Daily Input Page
 * User inputs for sleep, water, exercise, journaling, and mood
 */

type MoodType = "happy" | "calm" | "neutral" | "sad" | "angry" | null;

const moodConfig: Record<Exclude<MoodType, null>, {
  icon: typeof Smile;
  label: string;
  color: string;
  quote: string;
}> = {
  happy: {
    icon: Smile,
    label: "Happy",
    color: "bg-yellow-400 text-yellow-900",
    quote: "Happiness is not something ready-made. It comes from your own actions. — Dalai Lama",
  },
  calm: {
    icon: Heart,
    label: "Calm",
    color: "bg-wellness-mint text-green-900",
    quote: "Within you, there is a stillness and a sanctuary to which you can retreat at any time. — Hermann Hesse",
  },
  neutral: {
    icon: Meh,
    label: "Neutral",
    color: "bg-slate-400 text-slate-900",
    quote: "Sometimes the most productive thing you can do is relax. — Mark Black",
  },
  sad: {
    icon: Frown,
    label: "Sad",
    color: "bg-blue-400 text-blue-900",
    quote: "Even the darkest night will end and the sun will rise. — Victor Hugo",
  },
  angry: {
    icon: Angry,
    label: "Angry",
    color: "bg-red-400 text-red-900",
    quote: "For every minute you remain angry, you give up sixty seconds of peace of mind. — Ralph Waldo Emerson",
  },
};

const DailyInput = () => {
  const { toast } = useToast();

  // Form state
  const [sleepHours, setSleepHours] = useState<number[]>([7]);
  const [waterIntake, setWaterIntake] = useState<number[]>([4]);
  const [exerciseTime, setExerciseTime] = useState<number[]>([30]);
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<MoodType>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // 🎤 Speech Recognition (stable)
  const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const recognitionRef = useRef<any>(null);

if (!recognitionRef.current && SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onresult = async (event: any) => {
    const transcript = event.results[0][0].transcript;
    console.log("🎤 Transcript:", transcript);

    setJournalEntry((prev) =>
      prev ? `${prev} ${transcript}` : transcript
    );

    await fetch("http://localhost:5000/voice-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: transcript }),
    });

    setIsRecording(false);

    toast({
      title: "Voice captured",
      description: "Your speech was converted to text successfully.",
    });
  };

  recognition.onerror = (e: any) => {
    console.error("Speech error:", e);
    setIsRecording(false);
  };

  recognition.onend = () => {
    setIsRecording(false);
  };

  recognitionRef.current = recognition;
}
const toggleRecording = () => {
  const recognition = recognitionRef.current;

  if (!recognition) {
    toast({
      title: "Not supported",
      description: "Speech recognition is not supported in this browser.",
      variant: "destructive",
    });
    return;
  }

  if (isRecording) {
    recognition.stop();
    setIsRecording(false);
  } else {
    setIsRecording(true);
    recognition.start();

    toast({
      title: "Recording started",
      description: "Speak now 🎙️",
    });
  }
};


  // 💾 Save handler
  const handleSave = async () => {

  // 🔥 GET LOGGED-IN USER
  const userId = localStorage.getItem("user_id");


  if (!userId) {
    alert("User not logged in");
    return;
  }

  const dailyData = {
    user_id: userId,
    sleepHours: sleepHours[0],
    waterIntake: waterIntake[0],
    exerciseTime: exerciseTime[0],
    journalEntry,
    mood: selectedMood,
  };

  try {
    const res = await fetch("http://localhost:5000/api/daily-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dailyData),
    });

    if (!res.ok) {
      throw new Error("Failed to save to backend");
    }

    localStorage.setItem("wellnest_daily_input", JSON.stringify(dailyData));

    setIsSaved(true);
    toast({
      title: "Saved successfully!",
      description: "Your daily wellness data has been stored in MongoDB.",
    });

    setTimeout(() => setIsSaved(false), 2000);

  } catch (error) {
    console.error(error);
    toast({
      title: "Save failed",
      description: "Could not save data to server",
      variant: "destructive",
    });
  }
};

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-2xl">

        {/* Back */}
        <Button variant="ghost" asChild className="gap-2 mb-6">
          <Link to="/tracker">
            <ArrowLeft className="h-4 w-4" />
            Back to Tracker
          </Link>
        </Button>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wellness-peach/30 mb-4">
            <Sparkles className="h-4 w-4" />
            Daily Check-in
          </div>
          <h1 className="text-3xl font-bold mb-2">How's Your Day?</h1>
          <p className="text-muted-foreground">
            Track your wellness metrics and reflect on your day
          </p>
        </div>

        <div className="space-y-6">

          {/* Sleep */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <Moon className="h-5 w-5" /> Sleep Hours
              </CardTitle>
              <CardDescription>How many hours did you sleep?</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4 items-center">
              <Slider value={sleepHours} onValueChange={setSleepHours} max={12} step={0.5} />
              <span className="w-20 text-right font-bold">{sleepHours[0]} hrs</span>
            </CardContent>
          </Card>

          {/* Water */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <Droplets className="h-5 w-5" /> Water Intake
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 items-center">
              <Slider value={waterIntake} onValueChange={setWaterIntake} max={12} />
              <span className="w-24 text-right font-bold">{waterIntake[0]} glasses</span>
            </CardContent>
          </Card>

          {/* Exercise */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <Dumbbell className="h-5 w-5" /> Exercise Time
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 items-center">
              <Slider value={exerciseTime} onValueChange={setExerciseTime} max={120} step={5} />
              <span className="w-20 text-right font-bold">{exerciseTime[0]} min</span>
            </CardContent>
          </Card>

          {/* Journal */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <BookOpen className="h-5 w-5" /> Daily Journal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                rows={4}
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Write or speak your thoughts..."
              />
              <Button
                onClick={toggleRecording}
                variant={isRecording ? "destructive" : "outline"}
                className="gap-2"
              >
                {isRecording ? <MicOff /> : <Mic />}
                {isRecording ? "Stop Recording" : "Voice to Text"}
              </Button>
              {isRecording && (
                <p className="text-sm text-destructive animate-pulse">🎤 Recording…</p>
              )}
            </CardContent>
          </Card>

          {/* Mood */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <Heart className="h-5 w-5" /> How are you feeling?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4 mb-4">
                {(Object.keys(moodConfig) as Exclude<MoodType, null>[]).map((mood) => {
                  const Icon = moodConfig[mood].icon;
                  return (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`p-3 rounded-2xl ${
                        selectedMood === mood
                          ? moodConfig[mood].color
                          : "bg-muted"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </button>
                  );
                })}
              </div>
              {selectedMood && (
                <p className="text-center italic text-sm">
                  “{moodConfig[selectedMood].quote}”
                </p>
              )}
            </CardContent>
          </Card>

          {/* Save */}
          <Button
            size="lg"
            onClick={handleSave}
            disabled={isSaved}
            className="w-full rounded-full gap-2"
          >
            {isSaved ? <Check /> : <Save />}
            {isSaved ? "Saved!" : "Save Today's Entry"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
           📝 Data is securely stored in MongoDB.

          </p>

        </div>
      </div>
    </div>
  );
};

export default DailyInput;
