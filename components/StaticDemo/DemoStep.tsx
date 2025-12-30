export function DemoStep({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-24 border-b border-neutral-900 last:border-none">
      {children}
    </div>
  );
}
