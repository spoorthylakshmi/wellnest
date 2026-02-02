import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, RotateCcw, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Guided Breathing Page
 * Animated breathing exercise with ball animation and captions
 */

type BreathingPhase = "idle" | "inhale" | "hold" | "exhale";

const GuidedBreathing = () => {
  const [phase, setPhase] = useState<BreathingPhase>("idle");
  const [isActive, setIsActive] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Breathing timing (in seconds)
  const INHALE_TIME = 4;
  const HOLD_TIME = 4;
  const EXHALE_TIME = 6;

  // Phase captions
  const phaseMessages: Record<BreathingPhase, { main: string; sub: string }> = {
    idle: { main: "Ready to Begin", sub: "Press start to begin your breathing exercise" },
    inhale: { main: "Breathe In", sub: "Slowly fill your lungs with fresh air..." },
    hold: { main: "Hold", sub: "Keep the breath... feel the calm..." },
    exhale: { main: "Breathe Out", sub: "Release slowly... let go of tension..." },
  };

  // Run the breathing cycle
  const runBreathingCycle = useCallback(() => {
    if (!isActive) return;

    // Inhale phase
    setPhase("inhale");
    setTimeRemaining(INHALE_TIME);

    const inhaleInterval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(inhaleInterval);
      if (!isActive) return;

      // Hold phase
      setPhase("hold");
      setTimeRemaining(HOLD_TIME);

      const holdInterval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(holdInterval);
        if (!isActive) return;

        // Exhale phase
        setPhase("exhale");
        setTimeRemaining(EXHALE_TIME);

        const exhaleInterval = setInterval(() => {
          setTimeRemaining((prev) => prev - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(exhaleInterval);
          setCycleCount((prev) => prev + 1);
          // Continue to next cycle
          runBreathingCycle();
        }, EXHALE_TIME * 1000);
      }, HOLD_TIME * 1000);
    }, INHALE_TIME * 1000);
  }, [isActive]);

  // Start/stop breathing exercise
  useEffect(() => {
    if (isActive) {
      runBreathingCycle();
    } else {
      setPhase("idle");
      setTimeRemaining(0);
    }
  }, [isActive, runBreathingCycle]);

  const handleStart = () => {
    setIsActive(true);
    setCycleCount(0);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase("idle");
    setCycleCount(0);
    setTimeRemaining(0);
  };

  // Calculate ball size based on phase
  const getBallSize = () => {
    switch (phase) {
      case "inhale":
        return "scale-150";
      case "hold":
        return "scale-150";
      case "exhale":
        return "scale-100";
      default:
        return "scale-100";
    }
  };

  // Get transition duration based on phase
  const getTransitionDuration = () => {
    switch (phase) {
      case "inhale":
        return `${INHALE_TIME}s`;
      case "exhale":
        return `${EXHALE_TIME}s`;
      default:
        return "0.3s";
    }
  };

  return (
    <div className="min-h-screen py-8 flex flex-col">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-wellness-mint/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-wellness-lavender/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container flex-1 flex flex-col">
        {/* Header with back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/mental-health">
              <ArrowLeft className="h-4 w-4" />
              Back to Mental Health
            </Link>
          </Button>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-16">
          {/* Title */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wellness-mint/30 text-foreground mb-4">
              <Wind className="h-4 w-4" />
              <span className="text-sm font-medium">Guided Breathing</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Find Your Calm
            </h1>
            <p className="text-muted-foreground">
              Follow the ball for a calming breathing exercise
            </p>
          </div>

          {/* Breathing Ball */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-8">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/20 animate-spin-slow" />
            
            {/* Breathing ball */}
            <div
              className={`w-32 h-32 rounded-full bg-gradient-to-br from-primary via-wellness-mint to-wellness-blue shadow-2xl flex items-center justify-center transition-transform ease-in-out ${getBallSize()}`}
              style={{ transitionDuration: getTransitionDuration() }}
            >
              {/* Inner glow */}
              <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm" />
            </div>

            {/* Timer display */}
            {isActive && timeRemaining > 0 && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12">
                <span className="text-4xl font-bold text-primary">{timeRemaining}</span>
              </div>
            )}
          </div>

          {/* Phase message */}
          <div className="text-center mb-8 h-20">
            <h2 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${
              phase === "inhale" ? "text-wellness-blue" :
              phase === "hold" ? "text-wellness-lavender" :
              phase === "exhale" ? "text-wellness-mint" :
              "text-foreground"
            }`}>
              {phaseMessages[phase].main}
            </h2>
            <p className="text-muted-foreground animate-fade-in">
              {phaseMessages[phase].sub}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {!isActive ? (
              <Button
                size="lg"
                onClick={handleStart}
                className="rounded-full px-8 gap-2"
              >
                <Play className="h-5 w-5" />
                {cycleCount > 0 ? "Resume" : "Start"}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="secondary"
                onClick={handlePause}
                className="rounded-full px-8 gap-2"
              >
                <Pause className="h-5 w-5" />
                Pause
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={handleReset}
              className="rounded-full px-8 gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Reset
            </Button>
          </div>

          {/* Cycle counter */}
          {cycleCount > 0 && (
            <Card className="mt-8 border-0 shadow-md">
              <CardContent className="py-4 px-6">
                <p className="text-sm text-muted-foreground">
                  Completed Cycles: <span className="font-bold text-foreground">{cycleCount}</span>
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tips at bottom */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            💡 Tip: For best results, sit comfortably with your back straight. 
            Breathe through your nose and focus on the rhythm.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidedBreathing;
