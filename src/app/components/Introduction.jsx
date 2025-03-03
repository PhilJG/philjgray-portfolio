"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Introduction() {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {}, [theme, resolvedTheme]);

  if (!mounted) {
    return null;
  }

  const imageSrc =
    resolvedTheme === "dark" ? "/dark-profile.jpg" : "/light-profile.jpg";

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative w-80 h-80 mx-auto overflow-hidden rounded-lg shadow-lg">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              objectPosition={
                resolvedTheme === "dark" ? "center top" : "top right"
              }
              className="rounded-lg"
            />
          </div>
          <div className="md:w-3/4 md:pl-12 sm:pt-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Hey there, I'm Phil
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              I'm a web developer and former clean-tech founder based in
              Victoria BC. With my background in graphic design and branding, I
              found frontend development to be closely tied to my experience and
              interests. As I've grown as a developer, I have sought out wisdom
              and experience from programmers who have raised my standards for
              what's expected of any web application.
            </p>
            <a
              href="#contact"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded transition duration-300"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
