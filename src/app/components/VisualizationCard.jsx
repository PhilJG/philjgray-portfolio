"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function VisualizationCard({
  title,
  thumbnailSrc,
  thumbnailIsIcon = false,
  videoSrc,
  videoPoster,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border border-border rounded-lg overflow-hidden transition-all duration-300 ${
        !isOpen
          ? "hover:border-primary hover:shadow-[0_0_22px_hsl(var(--primary)/0.45)]"
          : ""
      }`}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
        aria-expanded={isOpen}
      >
        {thumbnailIsIcon ? (
          <div
            className="w-7 h-7 flex-shrink-0"
            style={{
              WebkitMaskImage: `url('${thumbnailSrc}')`,
              maskImage: `url('${thumbnailSrc}')`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.4))",
            }}
          />
        ) : thumbnailSrc ? (
          <div className="w-7 h-7 flex-shrink-0 relative rounded overflow-hidden">
            <Image src={thumbnailSrc} alt={title} fill className="object-cover" />
          </div>
        ) : null}

        <span className="flex-1 text-lg font-semibold text-primary">{title}</span>

        <ChevronDown
          className={`flex-shrink-0 h-5 w-5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-8 pt-4 border-t border-border">
            {videoSrc ? (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 min-w-0">{children}</div>
                <div className="md:w-1/2 flex-shrink-0">
                  <video
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-lg"
                    poster={videoPoster}
                  />
                </div>
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
