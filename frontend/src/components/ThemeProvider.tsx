import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ComponentProps } from "react";

/**
 * Theme provider wrapper for dark/light mode support
 */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
