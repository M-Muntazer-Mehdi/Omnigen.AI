const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-background text-foreground overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full px-4">{children}</div>
    </main>
  );
};

export default LandingLayout;
