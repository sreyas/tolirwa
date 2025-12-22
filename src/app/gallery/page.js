"use client";

import React, { useEffect, useState } from 'react';
import SidebarProducts from '../../components/SidebarProducts'
import client from '@/lib/apollo-client';
import { GALLERY_PAGE_CONTENT } from '@/lib/ApiPath';
import Loader from "@/components/Loader";
import Link from 'next/link';


const Gallery = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gallery,setGallery] = useState([]);
  const [loading,setLoading] = useState(true);

        useEffect(() => {
          fetchGalleryImages();
        }, []);

  const fetchGalleryImages = async() => {
    try{
       const res = await client.query({
            query: GALLERY_PAGE_CONTENT,
           });
           console.log("raw data in gallery",res.data.pageBy);
           const galleryData = res.data.pageBy;
             formattedGallery(galleryData);

              
    }catch(err){
      console.log("Error at fetching Gallery Images:::::",err);
      
    }
  }

  const formattedGallery = (galleryData) => {
    try {
      const html = galleryData?.content || "";
      let imagesArray = [];

      // Regex to capture image metadata
      const regex = /<a[^>]+href="([^"]+)"[^>]+data-thumbnail="([^"]+)"[^>]+data-image-id="([^"]+)"[^>]+data-title="([^"]*)"/g;

      let match;

      while ((match = regex.exec(html)) !== null) {
        imagesArray.push({
          id: match[3],
          title: match[4],
          thumbnail: match[2],
          original: match[1],
        });
      }

      const formatted = {
        title: galleryData?.title,
        slug: galleryData?.slug,
        uri: galleryData?.uri,
        images: imagesArray,
      };

      console.log("Final Formatted Gallery::::", formatted);

      setGallery(formatted);

    } catch (err) {
      console.log("Error Formatting Gallery:::::", err);
    } finally{
      setLoading(false)
    }
  };


  

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>prev === 0 ? gallery.images.length - 1 : prev - 1);

  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>prev === gallery.images.length - 1 ? 0 : prev + 1);
  };

  if(loading) return <Loader/>;

  return (
    <div className='flex justify-center w-full mb-8'>
      <div className='margintop w-full max-w-5xl px-5'>



        <h1 className='text-gray-600 text-3xl font-bold mb-7'>{gallery.title}</h1>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Gallery */}
          <div className="w-full lg:w-2/3 grid grid-cols-5 gap-3">
           {gallery.images?.map((item, index) => (
              <div key={index} className="cursor-pointer">
                <img
                 src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-auto object-cover"
                  onClick={() => openModal(index)}
                />
              </div>
            ))}
          </div>
        

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-1/3 mt-[-4%]">
            <SidebarProducts />
          </div>
        </div>


        

      </div>

     

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <button
            onClick={prevImage}
            className="absolute left-4 text-white text-3xl font-bold"
            aria-label="Previous slide"
          >
            &#10094;
          </button>
          <img
            src={gallery.images[currentIndex].original}
            alt={gallery.images[currentIndex].title}
            className="max-h-[90%] max-w-[90%]"
          />
          <button
            onClick={nextImage}
            className="absolute right-4 text-white text-3xl font-bold"
            aria-label="Next slide"
          >
            &#10095;
          </button>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            aria-label="close button"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
