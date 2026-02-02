import { Heart, Leaf } from "lucide-react";

/**
 * Footer component with calming wellness quote
 */
const Footer = () => {
  // Array of calming wellness quotes
  const quotes = [
    "Take a deep breath. You are exactly where you need to be.",
    "Your mind is a garden, your thoughts are the seeds.",
    "Peace comes from within. Do not seek it without.",
    "Be gentle with yourself. You're doing the best you can.",
  ];

  // Select a quote based on the day
  const dailyQuote = quotes[new Date().getDay() % quotes.length];

  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="container py-8">
        {/* Quote Section */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Daily Wellness Quote
            </span>
            <Leaf className="h-4 w-4 text-primary" />
          </div>
          <p className="text-lg italic text-foreground/80 max-w-md">
            "{dailyQuote}"
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Wellnest</span>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-wellness-lavender fill-wellness-lavender" /> for your wellbeing
          </p>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Wellnest
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
