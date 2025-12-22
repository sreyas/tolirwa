"use client";

import React, { useState } from "react";
import { FontAwesomeIcon, solidIcons } from '@/icons/icons';

const SidebarProducts = () => {
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
        "https://www.tolirwa.com/wp-content/gallery/sidebar-widget/thumbs/thumbs_Curved-Sheets.JPG",
      imgFull:
        "https://dev.tolirwa.com/wp-content/uploads/2015/02/Curved-Sheets.jpg",
    },
    {
      title: "Treillis",
      imgThumb:
        "https://www.tolirwa.com/wp-content/gallery/sidebar-widget/thumbs/thumbs_Treillis.JPG",
      imgFull:
        "https://www.tolirwa.com/wp-content/uploads/2015/02/Treillis1.jpg",
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
    <aside className="w-full md:w-[250px] lg:w-[280px] mt-4 md:mt-0 bg-[#eee]">
      <div className=" p-4">
        <h3 className="text-2xl text-[#56565A] mb-4 mt-2">Products</h3>
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
                className="w-full h-auto hover:opacity-90 transition"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#7777777d]  flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >

            <button
              className="absolute top-[5%] right-[10%] text-white rounded-3xl bg-black text-2xl border-2 border-white p-1 hover:text-gray-300 z-10"
              onClick={closeModal}
              aria-label="close slide"
            >
              <FontAwesomeIcon icon={solidIcons.faTimes} />
            </button>

          <div className="relative flex justify-center items-center w-[80%] h-[90%]  ">
            <button
              className="absolute left-[2%] transform -translate-y-1/2 text-white rounded-3xl bg-black text-sm  p-1 hover:text-gray-300"
              onClick={prevImage}
              aria-label="Previous slide"
            >
              <FontAwesomeIcon icon={solidIcons.faChevronLeft} />
            </button>

            <img
              src={products[currentIndex].imgFull}
              alt={products[currentIndex].title}
              className=" h-full border-8 border-white  w-full"
            />

          

        

            <button
              className="absolute right-[2%] transform -translate-y-1/2 text-white rounded-3xl border-2 border-white bg-black text-sm p-1 hover:text-gray-300"
              onClick={nextImage}
              aria-label="next slide"
            >
              <FontAwesomeIcon icon={solidIcons.faChevronRight} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SidebarProducts;
