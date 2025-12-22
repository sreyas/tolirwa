"use client";

import React, { useState } from 'react'
import { FontAwesomeIcon, solidIcons } from '@/icons/icons';

const HomeProducts = () => {

      const products = [
        {
          title: "wavetile",
          imgThumb:
            "https://dev.tolirwa.com/wp-content/gallery/sidebar-widget/thumbs/thumbs_wavetile.jpg",
          imgFull:
            "https://dev.tolirwa.com/wp-content/gallery/sidebar-widget/wavetile.jpg",
        },
        {
          title: "Tileform",
          imgThumb:
            "https://dev.tolirwa.com/wp-content/gallery/sidebar-widget/thumbs/thumbs_Tileform.jpg",
          imgFull:
            "https://dev.tolirwa.com/wp-content/gallery/sidebar-widget/Tileform.jpg",
        },
        {
          title: "Curved Sheets",
          imgThumb:
            "https://dev.tolirwa.com/wp-content/gallery/sidebar-widget/thumbs/thumbs_Curved-Sheets.JPG",
          imgFull:
            "https://dev.tolirwa.com/wp-content/gallery/sidebar-widget/Curved-Sheets.JPG",
        },
        {
          title: "Treillis",
          imgThumb:
            "https://dev.tolirwa.com/wp-content/gallery/sidebar-widget/thumbs/thumbs_Treillis.JPG",
          imgFull:
            "https://dev.tolirwa.com/wp-content/gallery/sidebar-widget/Treillis.JPG",
        },
      ];
    
      const [isOpen, setIsOpen] = useState(false);
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const openModal = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
      };
    
      const closeModal = () => setIsOpen(false);
    
      const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
      };
    
      const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
      };

  return (
      <aside className="w-full md:w-[250px] lg:w-[280px]  md:mt-0">
      <div className="bg-white p-4">
        {/* <h3 className="text-2xl text-[#56565A] mb-4 mt-2">Products</h3> */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {products.map((product, index) => (
            <button
              key={index}
              onClick={() => openModal(index)}
              className="block focus:outline-none"
            >
              <img
                src={product.imgThumb}
                alt={product.title}
                className="w-full h-auto rounded-lg hover:opacity-90 transition"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={products[currentIndex].imgFull}
              alt={products[currentIndex].title}
              className="w-full h-auto rounded-lg"
            />

            <button
              className="absolute top-2 right-2 text-white rounded-3xl bg-black text-2xl p-1 hover:text-gray-300"
              onClick={closeModal}
              aria-label="close slide"
            >
              <FontAwesomeIcon icon={solidIcons.faTimes} />
            </button>

            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white rounded-3xl bg-black text-2xl p-1 hover:text-gray-300"
              onClick={prevImage}
              aria-label="Previous slide"
            >
              <FontAwesomeIcon icon={solidIcons.faChevronLeft} />
            </button>

            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white rounded-3xl bg-black text-2xl p-1 hover:text-gray-300"
              onClick={nextImage}
              aria-label="next slide"
            >
              <FontAwesomeIcon icon={solidIcons.faChevronRight} />
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}

export default HomeProducts
