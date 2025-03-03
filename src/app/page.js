"use client";
import Navigation from "./components/Navigation";
import Introduction from "./components/Introduction";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Introduction />
      <Projects />
      <Contact />
    </main>
  );
}
