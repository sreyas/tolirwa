"use client";

import { GALVANISED_SHEETS_CONTENT_BY_ID } from "@/lib/ApiPath";
import client from "@/lib/apollo-client";
import Link from "next/link";
import React, { useEffect, useState } from "react";



export default function GSheetDetail({ params }) {
  
 const { id } = React.use(params);
 const [sheetById, setSheetById] = useState(null);

    useEffect(() => {
      fetchSheetsById(id);
    }, [id]);


    const fetchSheetsById = async (sheetId) => {
        try {
          console.log("Fetching sheet:", sheetId);

          const res = await client.query({
            query: GALVANISED_SHEETS_CONTENT_BY_ID,
            variables: { slug: sheetId },
          });

          const pageData = res.data.postBy;
          const contentImages = extractContentImages(pageData.content);
          console.log("PAG",contentImages);
          
          setSheetById({
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




  if (!sheetById) {
    return (
      <div className="flex justify-center w-full mb-8">
        <div className="w-full max-w-5xl px-5">
          <h2 className="text-red-600 text-xl font-bold mt-8">
            Sheet not found!
          </h2>
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
          {sheetById.title}
        </h1>

        <div className="w-full max-w-5xl">
          {sheetById.contentImages?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${sheetById.title} ${index + 1}`}
                className="w-full object-contain mb-4"
              />
          ))}
      
        </div>
      </div>

     

    </div>
  );
}
