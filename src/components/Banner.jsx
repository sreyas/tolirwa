"use client";

import { FETCH_SLIDER_IMAGES } from "@/lib/ApiPath";
import client from "@/lib/apollo-client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon, solidIcons } from "@/icons/icons";

const Banner = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch slider images
  useEffect(() => {
    fetchSlideImage();
  }, []);

  const fetchSlideImage = async () => {
    try {
      const res = await client.query({
        query: FETCH_SLIDER_IMAGES,
      });

      const slideNodes = res.data.slides.edges;

      const updatedSlides = [
        {
          image:
            slideNodes[0]?.node?.featuredImage?.node?.sourceUrl ||
            "https://dev.tolirwa.com/wp-content/uploads/2014/06/slider21.jpg",
          text: "All time Protection",
          para: "Rust Proof and New all the time.",
        },
        {
          image:
            slideNodes[1]?.node?.featuredImage?.node?.sourceUrl ||
            "https://dev.tolirwa.com/wp-content/uploads/2014/06/slider1.jpg",
          text: "TOLIRWA roofs",
          para: "The ultimate roofing solutions.",
        },
      ];

      setSlides(updatedSlides);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching slider images:", err);
      setLoading(false);
    }
  };

  // Auto slide (after mount)
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Skeleton (keeps layout stable)
  if (loading) {
    return (
      <div className="relative w-full h-[50vh] bg-gray-200 animate-pulse">
        <div className="w-full h-full bg-gray-300" />
      </div>
    );
  }

  const heroSlide = slides[0];

  return (
    <div className="relative w-full h-[50vh] overflow-hidden group">
      {/* ✅ LCP IMAGE — STATIC, NO JS DEPENDENCY */}
      <Image
        src={heroSlide.image}
        alt="Tolirwa Hero"
        width={1200}
        height={600}
        priority
        fetchPriority="high"
        sizes="100vw"
        className="w-full h-[50vh] object-cover"
      />

      {/* ✅ SLIDER IMAGES — LAZY, NO PRIORITY */}
      {slides.map((slide, index) =>
        index !== 0 ? (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              width={1200}
              height={600}
              loading="lazy"
              sizes="100vw"
              className="w-full h-[50vh] object-cover"
            />
          </div>
        ) : null
      )}

      {/* TEXT OVERLAY */}
      <div className="absolute bottom-10 right-0 h-[25%] flex items-center bannerbg">
        <div className="bg-black/70 text-white p-6 w-full h-full flex flex-col justify-center">
          <h2 className="md:text-3xl sm:text-2xl text-xl slide-title">
            {slides[current]?.text}
          </h2>
          <p className="text-sm sm:text-xs text-[10px] slide-para mt-1">
            {slides[current]?.para}
          </p>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 right-[13%] flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full ${
              index === current ? "bg-white" : "bg-red-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* PREV BUTTON */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/60 transition"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <FontAwesomeIcon icon={solidIcons.faChevronLeft} />
      </button>

      {/* NEXT BUTTON */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/60 transition"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={solidIcons.faChevronRight} />
      </button>
    </div>
  );
};

export default Banner;
