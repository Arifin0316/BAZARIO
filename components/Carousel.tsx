// components/Carousel.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

interface CarouselProps {
  images: {
    src: string | StaticImageData;
    alt: string;
    title?: string;
    description?: string;
  }[];
  autoPlayInterval?: number;
}

export default function Carousel({ images, autoPlayInterval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length, autoPlayInterval]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  return (
    <div 
      className="relative w-full h-[500px] overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="flex h-full">
          {images.map((image, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay text */}
              {(image.title || image.description) && (
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-8">
                  {image.title && (
                    <h2 className="text-white text-3xl font-bold mb-2">
                      {image.title}
                    </h2>
                  )}
                  {image.description && (
                    <p className="text-white/90 text-lg">
                      {image.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 
                   text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity
                   focus:outline-none focus:ring-2 focus:ring-white/60"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 
                   text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity
                   focus:outline-none focus:ring-2 focus:ring-white/60"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors
              ${index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}