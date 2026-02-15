import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, CloudRain, Trees, Waves, Moon, Music, Smile } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

/**
 * Sound Therapy Page
 * Calm UI with nature-themed audio player
 * Uses HTML5 audio with placeholder audio URLs
 */

interface SoundCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  posterColor: string;
  // Placeholder audio URLs - replace with actual audio files
  audioUrl: string;
  /** optional public image path (e.g. /images/rain.jpeg) */
  imageUrl?: string;
}

const SoundTherapy = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sound cards configuration with placeholder audio
  const sounds: SoundCard[] = [
  {
    id: "rain",
    title: "Rain",
    description: "Gentle rainfall to calm your mind",
    icon: CloudRain,
    color: "from-wellness-blue to-blue-300",
    posterColor: "bg-gradient-to-br from-slate-700 via-blue-800 to-slate-900",
    audioUrl: "/sounds/rain.mp3",
    imageUrl: "/images/rain.jpeg",
  },
  {
    id: "forest",
    title: "Jungle",
    description: "Natural jungle ambience to relax your senses",
    icon: Trees,
    color: "from-wellness-green to-green-300",
    posterColor: "bg-gradient-to-br from-green-700 via-emerald-800 to-green-900",
    audioUrl: "/sounds/jungle.mp3",
    imageUrl: "/images/jungle.jpeg",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    description: "Soothing ocean waves on the shore",
    icon: Waves,
    color: "from-cyan-400 to-blue-400",
    posterColor: "bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800",
    audioUrl: "/sounds/waves.mp3",
    imageUrl: "/images/ocean.jpeg",
  },
  {
    id: "flute",
    title: "Flute",
    description: "Calming flute melodies for meditation",
    icon: Music,
    color: "from-amber-400 to-orange-300",
    posterColor: "bg-gradient-to-br from-amber-600 via-orange-700 to-red-800",
    audioUrl: "/sounds/flute.mp3",
    imageUrl: "/images/krishna.jpeg",

  },
  {
    id: "om",
    title: "Om Chanting",
    description: "Sacred Om sound for deep relaxation",
    icon: Music,
    color: "from-wellness-lavender to-purple-300",
    posterColor: "bg-gradient-to-br from-purple-700 via-violet-800 to-purple-900",
    audioUrl: "/sounds/om.mp3",
    imageUrl: "/images/om.jpeg",


  },
  {
    id: "happy",
    title: "Happy Music",
    description: "Uplifting music to improve your mood",
    icon: Smile,
    color: "from-yellow-400 to-amber-300",
    posterColor: "bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-700",
    audioUrl: "/sounds/happy.mp3",
    imageUrl: "/images/happy.jpeg",
  },
  {
    id: "bowls",
    title: "Singing Bowls",
    description: "Tibetan singing bowls for mindfulness",
    icon: Music,
    color: "from-indigo-400 to-purple-400",
    posterColor: "bg-gradient-to-br from-indigo-800 via-purple-900 to-slate-900",
    audioUrl: "/sounds/bowls.mp3",
    imageUrl: "/images/bowl.jpeg",
  },
];


  // Handle play/pause for a sound
  const togglePlay = (sound: SoundCard) => {
    if (playingId === sound.id) {
      // Pause current sound
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      // Stop any currently playing sound
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Create new audio instance
      const audio = new Audio(sound.audioUrl);
      audio.volume = isMuted ? 0 : volume / 100;
      audio.loop = true;
      
      // Handle audio errors gracefully
      audio.onerror = () => {
        console.log(`Note: Audio file for ${sound.title} is a placeholder`);
      };

      audio.play().catch(() => {
        console.log(`Audio playback requires user interaction or file not available`);
      });

      audioRef.current = audio;
      setPlayingId(sound.id);
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume / 100 : 0;
    }
  };

  return (
    <div className="min-h-screen py-12">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-wellness-mint/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-wellness-blue/20 rounded-full blur-3xl" />
      </div>

      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wellness-blue/30 text-secondary-foreground mb-4">
            <Music className="h-4 w-4" />
            <span className="text-sm font-medium">Sound Therapy</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Find Your Inner Peace
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in nature's calming sounds. Select a sound to begin 
            your relaxation journey.
          </p>
        </div>

        {/* Volume Control */}
        <div className="max-w-md mx-auto mb-12 p-6 bg-card rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="flex-shrink-0"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-12 text-right">
              {isMuted ? 0 : volume}%
            </span>
          </div>
        </div>

        {/* Sound Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sounds.map((sound) => {
            const isPlaying = playingId === sound.id;
            const Icon = sound.icon;

            return (
              <Card
                key={sound.id}
                className={`wellness-card-hover border-0 shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  isPlaying ? "ring-2 ring-primary wellness-glow" : ""
                }`}
                onClick={() => togglePlay(sound)}
              >
                {/* Poster/Cover Image */}
                <div className={`h-40 ${sound.posterColor} relative flex items-center justify-center overflow-hidden`}>
                  {/* background image (served from public/) — keep icon on top for visual identity */}
                  {sound.imageUrl && (
                    <img
                      src={sound.imageUrl}
                      alt={`${sound.title} poster`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-70"
                      onError={(e) => {
                        // fallback to a bundled image if the requested file 404s
                        (e.currentTarget as HTMLImageElement).src = '/images/rain.jpeg';
                      }}
                    />
                  )}

                  {/* subtle dark overlay to keep icon readable */}
                  <div className="absolute inset-0 bg-black/10" />

                  <Icon className={`relative z-10 h-16 w-16 text-white/90 ${isPlaying ? "animate-breathe" : ""}`} />

                  {isPlaying && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-20">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-1 bg-white rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 20 + 10}px`,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-lg">
                      {sound.title}
                    </h3>
                    <Button
                      variant={isPlaying ? "default" : "secondary"}
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(sound);
                      }}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4 ml-0.5" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {sound.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Currently Playing Indicator */}
        {playingId && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-card px-6 py-3 rounded-full shadow-lg border border-border flex items-center gap-3 animate-fade-in">
            <div className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1 h-4 bg-primary rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              Now Playing: {sounds.find((s) => s.id === playingId)?.title}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={() => {
                audioRef.current?.pause();
                setPlayingId(null);
              }}
            >
              Stop
            </Button>
          </div>
        )}

        {/* Note about audio */}
      
      </div>
    </div>
  );
};

export default SoundTherapy;
