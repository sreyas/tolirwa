"use client";

import { FETCH_SLIDER_IMAGES } from "@/lib/ApiPath";
import client from "@/lib/apollo-client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';

const Banner = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlideImage();
  }, []);

  const fetchSlideImage = async () => {
    try {
      const res = await client.query({
        query: FETCH_SLIDER_IMAGES,
      });

      const slideNodes = res.data.slides.edges;

      // ✅ Only replace images; keep same text + para
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
      console.log("Error fetching slider images:", err);
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  // ✅ Skeleton Loader
  if (loading) {
    return (
      <div className="relative w-full h-[50vh] overflow-hidden bg-gray-200 animate-pulse">
        <div className="w-full h-[50vh] bg-gray-300"></div>

        <div className="absolute bottom-10 right-0 w-[32%] h-[25%] p-6">
          <div className="bg-gray-400/60 w-full h-full rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-[50vh] transition-all duration-1000 ease-in-out ${
            index === current ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          }`}
        >
          {/* <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-[50vh] object-cover"
            width="1200" 
            height="600" 
            priority
            fetchPriority="high"
          /> */}
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            width={1200}
            height={600}
            className="w-full h-[50vh] object-cover"
            priority 
          />

          <div className="absolute bottom-10 right-0 h-[25%] flex items-center bannerbg">
            <div className="bg-black/70 text-white p-6 w-full h-full flex flex-col justify-center">
              <h2 className="md:text-3xl sm:text-2xl text-xl slide-title">
                {slide.text}
              </h2>
              <p className="text-sm md:text-sm sm:text-xs text-[10px] slide-para mt-1">
                {slide.para}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 right-[13%] flex space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
              index === current ? "bg-white" : "bg-red-600"
            }`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>

      {/* Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/60 transition"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/60 transition"
        onClick={nextSlide}
        aria-label="next slide"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Banner;
