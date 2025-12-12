"use client";

import { MILD_STEEL_SHEETS_CONTENT_BY_ID } from "@/lib/ApiPath";
import client from "@/lib/apollo-client";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function SteelDetail({ params }) {
  // ✅ unwrap params (Next.js 15+)
  const { id } = React.use(params);
  const [steelById, setSteelById] = useState(null);


    useEffect(() => {
      fetchSteelsById(id);
    }, [id]);

    const fetchSteelsById = async (sheetId) => {
      try {
        console.log("Fetching sheet:", sheetId);

        const res = await client.query({
          query: MILD_STEEL_SHEETS_CONTENT_BY_ID,
          variables: { slug: sheetId },
        });

        const pageData = res.data.postBy;
        const contentImages = extractContentImages(pageData.content);
        console.log("PAG",contentImages);
        

        setSteelById({
          ...pageData,
          contentImages
        });

        console.log("✅ Final sheetById object:", {
          ...pageData,
          contentImages,
        });
      } catch (err) {
        console.log("Error fetching Sheet By Id Data:", err);
      }
    };


    const extractContentImages = (html) => {
        if (!html) return [];

        const imgRegex = /<img[^>]+src="([^"]+)"/g;

        const images = [];
        let match;

        while ((match = imgRegex.exec(html)) !== null) {
          images.push(match[1]);
        }

        return images;
    };


  if (!steelById) {
    return (
   <div className="flex justify-center w-full mb-8">
      <div className="w-full max-w-5xl px-5 mt-8 animate-pulse">

        {/* Title Skeleton */}
        <div className="h-8 w-1/2 bg-gray-200 rounded mb-6"></div>

        {/* Image Skeletons */}
        <div className="h-[350px] w-full bg-gray-200 rounded mb-4"></div>
        <div className="h-[350px] w-full bg-gray-200 rounded mb-4"></div>

      </div>
    </div>
    );
  }

  return (
    <div className="flex justify-center w-full mb-8">
      <div className="margintop w-full max-w-5xl px-5">


            {/* <div className=' left-0 
            2xl:absolute 2xl:top-[80%] '>
              <Link href='/get-quotes'>
                <img 
                  src="https://www.tolirwa.com/wp-content/uploads/2014/06/get-aquote.png"
                  alt="Get a quote"
                />
              </Link>
            </div> */}



        <h1 className="text-gray-600 text-3xl font-bold mb-7">
          {steelById.title}
        </h1>

        <div className="w-full max-w-5xl">
           {steelById.contentImages?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${steelById.title} ${index + 1}`}
                className="w-full object-contain mb-4"
              />
            ))}
        </div>
      </div>

    
    </div>
  );
}
