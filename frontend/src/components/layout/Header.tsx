import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

/**
 * Header component with responsive navigation
 * Features mobile hamburger menu and desktop nav links
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Navigation links configuration
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/mental-health", label: "Mental Health" },
    { path: "/sound-therapy", label: "Sound Therapy" },
    { path: "/ai-insights", label: "AI Insights" },
    { path: "/physical-health", label: "Physical Health" },
    { path: "/tracker", label: "Tracker" },
  ];

  // Check if current path is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">Wellnest</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive(link.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Theme Toggle, Login & Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-primary" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Login Button */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden sm:flex gap-2 rounded-full"
          >
            <Link to="/auth">
              <User className="h-4 w-4" />
              Login
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile Login Link */}
            <Link
              to="/auth"
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Login / Sign Up
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
