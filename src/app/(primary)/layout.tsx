import Navigation from "~/components/molecules/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen overflow-hidden">
      <Navigation />
      <div className="flex h-full w-full grow px-4 py-4 sm:px-16">
        {children}
      </div>
    </main>
  );
}
