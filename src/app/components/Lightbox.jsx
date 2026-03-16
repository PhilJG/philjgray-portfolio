"use client";
import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    const handleArrow = (e) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      window.addEventListener("keydown", handleArrow);
      return () => {
        window.removeEventListener("keydown", handleEscape);
        window.removeEventListener("keydown", handleArrow);
      };
    }
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentItem = images[currentIndex];
  const isVideo = currentItem.type === "video";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Media gallery"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded"
        aria-label="Close gallery"
      >
        <X size={24} />
      </button>

      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          className="absolute left-4 z-10 p-2 text-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded"
          aria-label="Previous"
        >
          ←
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          className="absolute right-4 z-10 p-2 text-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded"
          aria-label="Next"
        >
          →
        </button>
      )}

      <div
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {isVideo ? (
            <video
              src={currentItem.src}
              autoPlay
              loop
              muted
              playsInline
              className="max-w-full max-h-full object-contain"
              poster={currentItem.poster}
              aria-label={currentItem.alt || "Gallery video"}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={currentItem.src}
              alt={currentItem.alt || "Gallery image"}
              fill
              className="object-contain"
              priority
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
