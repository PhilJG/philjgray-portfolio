"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Lightbox from "../../components/Lightbox";
import projectData from "../../data/neuroprojection.json";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // For now, only handle neuroprojection. Can be extended to load other projects dynamically
  useEffect(() => {
    if (params.slug !== "neuroprojection") {
      router.push("/");
    }
  }, [params.slug, router]);

  if (params.slug !== "neuroprojection") {
    return null;
  }

  const scrollToGallery = () => {
    const gallery = document.getElementById("gallery");
    if (gallery) {
      gallery.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Helper component for gallery items
  const GalleryItem = ({ item, index }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      // Only run on client side
      if (typeof window !== "undefined" && videoRef.current) {
        // Auto-play the video after it's loaded
        const playPromise = videoRef.current.play();

        // Handle autoplay promise to prevent errors
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay was prevented
            console.log("Autoplay prevented");
          });
        }
      }
    }, []);

    return (
      <div key={index} className="my-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {item.type === "video" ? (
            <video
              ref={videoRef}
              src={item.src}
              loop
              muted
              playsInline
              className="w-full h-auto rounded-lg shadow-lg cursor-pointer"
              poster={item.poster}
              onClick={() => {
                setLightboxIndex(
                  projectData.gallery.findIndex((g) => g.src === item.src)
                );
                setLightboxOpen(true);
              }}
            />
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-lg cursor-pointer"
              onClick={() => {
                setLightboxIndex(
                  projectData.gallery.findIndex((g) => g.src === item.src)
                );
                setLightboxOpen(true);
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <div className="relative w-full h-full">
          {projectData.hero.type === "video" ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster={projectData.hero.poster}
              aria-label={projectData.hero.alt}
            >
              <source src={projectData.hero.src} type="video/mp4" />
              {projectData.hero.srcWebm && (
                <source src={projectData.hero.srcWebm} type="video/webm" />
              )}
            </video>
          ) : (
            <Image
              src={projectData.hero.src}
              alt={projectData.hero.alt}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                {projectData.title}
              </h1>
              <p className="text-xl md:text-2xl sm:p-4 mb-8 text-white/90">
                {projectData.summary}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contact"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Book a demo
                </a>
                <button
                  onClick={scrollToGallery}
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-3 px-6 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  View media
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Participant Experience */}
      <section className="mb-20 mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Participant Experience
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground leading-relaxed text-lg px-6 sm:px-0">
            {projectData.participantExperience}
          </p>
        </div>
      </section>

      {/* Gallery Item 1 */}
      {projectData.gallery
        .filter((item) => item.position === "afterParticipantExperience")
        .map((item, index) => (
          <GalleryItem key={index} item={item} index={index} />
        ))}

      {/* About */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">About</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 px-6 sm:px-0">
            {projectData.context.description}
          </p>
          <div className="space-y-6 px-6 sm:px-0">
            <h3 className="text-2xl font-semibold text-primary">Key Points</h3>
            <ul className="space-y-4">
              {projectData.context.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-primary mr-3"></span>
                  <span className="text-muted-foreground leading-relaxed text-lg">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Item 2 */}
      {projectData.gallery
        .filter((item) => item.position === "afterAbout")
        .map((item, index) => (
          <GalleryItem key={index} item={item} index={index} />
        ))}

      {/* System Overview */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">System Overview</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground mb-8 leading-relaxed px-6 sm:px-0">
            {projectData.systemOverview.description}
          </p>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Process Flow</h3>
            <ul className="space-y-3 px-6 sm:px-0">
              {projectData.systemOverview.flow.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Item 3 */}
      {projectData.gallery
        .filter((item) => item.position === "afterSystemOverview")
        .map((item, index) => (
          <GalleryItem key={index} item={item} index={index} />
        ))}

      {/* Visual Language Mapping */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Visual Language Mapping
        </h2>
        <div className="max-w-4xl mx-auto">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-card">
                <th className="border border-border p-4 text-left font-semibold">
                  Frequency
                </th>
                <th className="border border-border p-4 text-left font-semibold">
                  Emotional State
                </th>
              </tr>
            </thead>
            <tbody>
              {projectData.visualLanguage.mappings.map((mapping, index) => (
                <tr key={index} className="hover:bg-card/50">
                  <td className="border border-border p-4 font-medium">
                    {mapping.frequency}
                  </td>
                  <td className="border border-border p-4 text-muted-foreground">
                    {mapping.emotional}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ethics & Data Handling */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Ethics & Data Handling
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 px-6 sm:px-0">
            {projectData.ethics.description}
          </p>
          <div className="space-y-6 px-6 sm:px-0">
            <h3 className="text-2xl font-semibold text-primary">Key Points</h3>
            <ul className="space-y-4 ">
              {projectData.ethics.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-primary mr-3"></span>
                  <span className="text-muted-foreground leading-relaxed text-lg">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-20">
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Interested in experiencing Neuroprojection?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book a demo or get in touch to learn more about this installation
            and its applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Book a demo
            </a>
            <Link
              href="/"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-3 px-6 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Back to portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={projectData.gallery}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />
    </main>
  );
}
