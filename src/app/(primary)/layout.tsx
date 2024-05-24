import { Toaster } from "sonner";
import Navigation from "~/components/molecules/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen overflow-hidden">
      <Navigation />
      <Toaster />
      <div className="flex h-full w-full grow px-4 py-4 sm:pl-20 sm:pr-6">
        {children}
      </div>
    </main>
  );
}
