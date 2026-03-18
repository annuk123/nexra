export function Section({
  children,
  size = "md",
  hero = false,
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  hero?: boolean;
}) {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
  };

  return (
    <section
      className={`
        ${sizes[size]}
        mx-auto
        px-4 sm:px-6
        ${hero ? "min-h-screen pt-24 sm:pt-28 lg:pt-32" : "py-12 sm:py-16"}
      `}
    >
      {children}
    </section>
  );
}