import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Moon, Droplets, Dumbbell, BookOpen, 
  Mic, MicOff, Smile, Meh, Frown, Angry, Heart, Sparkles,
  Save, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [isSaved, setIsSaved] = useState(false);

  // Form state
  const [sleepHours, setSleepHours] = useState<number[]>([7]);
  const [waterIntake, setWaterIntake] = useState<number[]>([4]);
  const [exerciseTime, setExerciseTime] = useState<number[]>([30]);
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<MoodType>(null);
  const [isRecording, setIsRecording] = useState(false);

  // Mock voice-to-text
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording - add mock transcribed text
      setIsRecording(false);
      setJournalEntry((prev) => 
        prev + (prev ? " " : "") + "Today I felt productive and accomplished my goals."
      );
      toast({
        title: "Recording stopped",
        description: "Your voice has been transcribed (demo).",
      });
    } else {
      // Start recording
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak your thoughts... (demo mode)",
      });
    }
  };

  // Handle save
  const handleSave = () => {
    // Mock save to localStorage
    const dailyData = {
      date: new Date().toISOString(),
      sleepHours: sleepHours[0],
      waterIntake: waterIntake[0],
      exerciseTime: exerciseTime[0],
      journalEntry,
      mood: selectedMood,
    };

    localStorage.setItem("wellnest_daily_input", JSON.stringify(dailyData));

    setIsSaved(true);
    toast({
      title: "Saved successfully!",
      description: "Your daily wellness data has been recorded.",
    });

    // Reset saved state after animation
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-2xl">
        {/* Header with back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/tracker">
              <ArrowLeft className="h-4 w-4" />
              Back to Tracker
            </Link>
          </Button>
        </div>

        {/* Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wellness-peach/30 text-foreground mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Daily Check-in</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            How's Your Day?
          </h1>
          <p className="text-muted-foreground">
            Track your wellness metrics and reflect on your day
          </p>
        </div>

        {/* Input Cards */}
        <div className="space-y-6">
          {/* Sleep Hours */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Moon className="h-5 w-5 text-wellness-lavender" />
                Sleep Hours
              </CardTitle>
              <CardDescription>How many hours did you sleep last night?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Slider
                  value={sleepHours}
                  onValueChange={setSleepHours}
                  max={12}
                  min={0}
                  step={0.5}
                  className="flex-1"
                />
                <span className="text-2xl font-bold text-foreground w-20 text-right">
                  {sleepHours[0]} hrs
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Water Intake */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Droplets className="h-5 w-5 text-wellness-blue" />
                Water Intake
              </CardTitle>
              <CardDescription>How many glasses of water did you drink?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Slider
                  value={waterIntake}
                  onValueChange={setWaterIntake}
                  max={12}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <span className="text-2xl font-bold text-foreground w-24 text-right">
                  {waterIntake[0]} glasses
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Exercise Time */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Dumbbell className="h-5 w-5 text-wellness-mint" />
                Exercise Time
              </CardTitle>
              <CardDescription>How many minutes did you exercise?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Slider
                  value={exerciseTime}
                  onValueChange={setExerciseTime}
                  max={120}
                  min={0}
                  step={5}
                  className="flex-1"
                />
                <span className="text-2xl font-bold text-foreground w-20 text-right">
                  {exerciseTime[0]} min
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Journaling */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                Daily Journal
              </CardTitle>
              <CardDescription>Write or speak your thoughts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="How are you feeling today? What's on your mind?"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <Button
                variant={isRecording ? "destructive" : "outline"}
                onClick={toggleRecording}
                className="gap-2"
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-4 w-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" />
                    Voice to Text
                  </>
                )}
              </Button>
              {isRecording && (
                <p className="text-sm text-destructive animate-pulse">
                  🎤 Recording... (Demo mode - will add sample text)
                </p>
              )}
            </CardContent>
          </Card>

          {/* Mood Selection */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5 text-pink-500" />
                How are you feeling?
              </CardTitle>
              <CardDescription>Select the mood that best describes you right now</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mood Icons */}
              <div className="flex justify-center gap-4 mb-6">
                {(Object.keys(moodConfig) as Exclude<MoodType, null>[]).map((mood) => {
                  const config = moodConfig[mood];
                  const Icon = config.icon;
                  const isSelected = selectedMood === mood;

                  return (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${
                        isSelected
                          ? `${config.color} scale-110 shadow-lg`
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      <Icon className={`h-8 w-8 ${isSelected ? "" : "text-muted-foreground"}`} />
                      <span className={`text-xs font-medium ${isSelected ? "" : "text-muted-foreground"}`}>
                        {config.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quote based on mood */}
              {selectedMood && (
                <div className="p-4 bg-muted/50 rounded-xl animate-fade-in">
                  <p className="text-sm italic text-foreground text-center">
                    "{moodConfig[selectedMood].quote}"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button
            size="lg"
            onClick={handleSave}
            className="w-full rounded-full gap-2"
            disabled={isSaved}
          >
            {isSaved ? (
              <>
                <Check className="h-5 w-5" />
                Saved!
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Today's Entry
              </>
            )}
          </Button>

          {/* Note */}
          <p className="text-center text-xs text-muted-foreground">
            📝 Data is stored locally for demo purposes. Backend sync coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyInput;
