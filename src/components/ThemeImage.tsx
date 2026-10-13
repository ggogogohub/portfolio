"use client";

import { useTheme } from "next-themes";

export default function ThemeImage({
  light,
  dark,
  alt,
  className,
  loading = "lazy",
}: {
  light: string;
  dark: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const { resolvedTheme } = useTheme();
  const src = resolvedTheme === "dark" ? dark : light;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
    />
  );
}
