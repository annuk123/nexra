// design-system/layout/Section.tsx
export function Section({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
  };

  return (
    <section className={`${sizes[size]} mx-auto px-6 py-29`}>
      {children}
    </section>
  );
}
