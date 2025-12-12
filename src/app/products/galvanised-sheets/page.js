"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import SidebarProducts from '@/components/SidebarProducts'
import { GALVANISED_SHEETS_CONTENT } from "@/lib/ApiPath";
import client from "@/lib/apollo-client";
import Loader from "@/components/Loader";

const GSheets = () => {

  const [gSheetData,setGsheeetData]=useState({});
  const [loading,setLoading] = useState(true);

    useEffect(() => {
      fetchGsheetData();
    }, []);



  const fetchGsheetData=async()=>{
    
     try{
      const res = await client.query({
        query: GALVANISED_SHEETS_CONTENT,
      });
      const pageData = res.data.pageBy;
      const result = formatSheetsPage(pageData);
      console.log("RES",result);
      
      setGsheeetData(result);
    }catch(err){
      console.log("Error at fetching G-Sheets Data:::::",err);
    }finally{
      setLoading(false)
    }
  }


  const formatSheetsPage = (pageData) => {
  try {
    const contentHtml = pageData?.content || "";

    const items = [];
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/g;

    let match;

    while ((match = liRegex.exec(contentHtml)) !== null) {
      const li = match[1];

      // ✅ Extract link and title
      const linkMatch = li.match(/<a href="([^"]+)"[^>]*>(.*?)<\/a>/);
      const link = linkMatch ? linkMatch[1] : "";
      const title = linkMatch ? linkMatch[2].trim() : "";

      // ✅ Extract slug/id from link (remove domain + trailing slash)
      const id = link
        ? link.replace("https://dev.tolirwa.com/", "").replace(/\/$/, "")
        : "";

      // ✅ Extract image & alt
      const imgMatch = li.match(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"/);
      const image = imgMatch ? imgMatch[1] : "";
      const alt = imgMatch ? imgMatch[2] : title;

      items.push({
        id,                 // ✅ new ID format
        title,
        images: [image],    // ✅ images array
        alt,
        link
      });
    }

    return {
      title: pageData?.title,
      slug: pageData?.slug,
      uri: pageData?.uri,
      items
    };

  } catch (err) {
    console.error("Error formatting sheets page:", err);
    return null;
  }
};
  if(loading) return <Loader/>;
  
  return (
    <div className="flex justify-center w-full mb-8">
      <div className="w-full max-w-5xl px-5 margintop">

            {/* <div className=' left-0 
            2xl:absolute 2xl:top-[80%] '>
              <Link href='/get-quotes'>
                <img 
                  src="https://www.tolirwa.com/wp-content/uploads/2014/06/get-aquote.png"
                  alt="Get a quote"
                />
              </Link>
            </div> */}


        <h1 className="text-gray-600 text-3xl font-bold mb-7">{gSheetData.title}</h1>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-2/3 text-[#56565A] font-source_Sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {gSheetData.items?.map((sheet) => (
                <Link
                key={sheet.id}
                href={`/products/galvanised-sheets/${sheet.id}`}
                className="group border border-[#CCCCCC] text-white hover:border-[#ef3713]"
                >
                <div className="flex items-center justify-center bg-[#CCCCCC] group-hover:bg-[#ef3713] h-12">
                    <h1 className="font-bold">{sheet.title}</h1>
                </div>
                <div className="p-4 flex justify-center">
                    <img
                    src={sheet.images?.[0]}
                    alt={sheet.title}
                    className="max-w-full h-auto mb-20"
                    />
                </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3 mt-[-4%] ">
            <SidebarProducts />
          </div>
        </div>
      </div>


    

    </div>
  );
};

export default GSheets;
