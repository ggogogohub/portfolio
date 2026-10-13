"use client";

export default function ThemeImage({
  light,
  dark,
  alt,
  className = "",
  loading = "lazy",
}: {
  light: string;
  dark: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  return (
    <>
      <img
        src={light}
        alt={alt}
        className={`${className} block dark:hidden`}
        loading={loading}
      />
      <img
        src={dark}
        alt={alt}
        className={`${className} hidden dark:block`}
        loading={loading}
      />
    </>
  );
}
