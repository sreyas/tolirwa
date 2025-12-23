"use client";

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon, brandIcons } from '@/icons/icons';
import client from "@/lib/apollo-client";
import { HOME_PAGE_CONTENT } from '@/lib/ApiPath';
import Loader from "@/components/Loader";
import HomePagePopup from '@/components/HomePagePopup';
import Link from 'next/link';

const Home = () => {

  const [structuredContent, setStructuredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popUp,setPopUp]=useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const res = await client.query({
        query: HOME_PAGE_CONTENT,
      });
      const pageData = res.data.pageBy;
      console.log("HOME PAGE DATA:", pageData.content);
      if (pageData?.content) {
        const structured = parseHtmlToStructuredObjects(pageData.content);
        setStructuredContent(structured);
        console.log("STRUCTURED DATA:", structured);
      }
    } catch (err) {
      console.error("Error fetching home data:", err);
    } finally {
      setLoading(false);  
    }
  };

  // ✅ Convert HTML to structured JSON (including images)
  const parseHtmlToStructuredObjects = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const divSections = [];
    tempDiv.querySelectorAll("div").forEach((div) => {
      const id = div.getAttribute("id") || null;
      const className = div.getAttribute("class") || null;

      const textNodes = [];

      // Extract text elements (h1–h6, p, span)
      div.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span").forEach((el) => {
        const cleanText = el.textContent.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
        if (cleanText) {
          textNodes.push({
            tag: el.tagName.toLowerCase(),
            text: cleanText,
          });
        }
      });

      // ✅ Extract images inside the same div
      div.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt") || "";
        if (src) {
          textNodes.push({
            tag: "img",
            src,
            alt,
          });
        }
      });

      if (textNodes.length > 0) {
        divSections.push({
          id,
          class: className,
          text: textNodes,
        });
      }
    });

    return divSections;
  };



  if (loading) return <Loader />;
  
  return (
    <>


    {popUp && <HomePagePopup popUp={popUp} onClose={() => setPopUp(false)} />}


      <div className="margintop w-full flex items-center justify-center p-10 flex-col gap-16">


      {/* <div className='absolute left-0 top-[60%] 
      lg:top-[65%]
            xl:top-[70%]
            2xl:absolute 2xl:top-[80%] '>
              <Link href='/get-quotes'>
                <img 
                  src="https://www.tolirwa.com/wp-content/uploads/2014/06/get-aquote.png"
                  alt="Get a quote"
                />
              </Link>
            </div> */}


        <div className="margintop homeContent w-[95%] flex flex-col h-auto 
        md:flex-row 
        xl:w-[70%]">

          <div className="cnt-Col-1 w-full p-3 
                       sm:p-8
                       md:p-3
                       xl:px-10 xl:pb-14">
             <h2 className='text-[#333] text-[22px] font-bold mt-[-10px] mb-4'>{structuredContent[1]?.text[0]?.text}</h2>
             <h3 className='text-[#DD3737] font-bold  text-[30px] mb-2'>{structuredContent[1]?.text[1]?.text}</h3>
             <p className='text-[#56565A] text-[14px]
             md:text-[12px]
             xl:text-[13px]'>{structuredContent[1]?.text[2]?.text}</p>
          </div>
            <div className="cnt-Col-2  w-full ">
              <div className='text-col-2 w-full flex flex-col items-start justify-center gap-3 p-5 bg-[#F55739]
              md:h-[50%] md:p-2'>
                <h2 className='text-white text-lg font-bold
                sm:text-xl
                md:text-[18px]' >{structuredContent[3]?.text[0]?.text}</h2>
                <h3 className='text-white text-lg font-bold
                 sm:text-xl
                  md:text-[18px]'>{structuredContent[3]?.text[1]?.text}</h3>
              </div>
               <div className='img-col-2 w-full
               md:h-[50%]
               '>
                <img className='w-full md:h-full' src={structuredContent[3]?.text[2]?.src} alt={structuredContent[3]?.text[2]?.alt  || "Tolirwa product image"} />
              </div>
            </div>
              <div className="cnt-Col-1 w-full p-5 flex flex-col items-center justify-center gap-2">

                <div className='image-Col-1 flex gap-2'>
                    <div className='image1 '>
                     <img className=' sm:w-[150px]' src={structuredContent[6]?.text[0]?.src} alt={structuredContent[5]?.text[0]?.alt || "Tolirwa roofing sheet"} />
                    </div>
                     <div className='image1'>
                       <img className=' sm:w-[150px]' src={structuredContent[6]?.text[1]?.src} alt={structuredContent[5]?.text[1]?.alt || "Tolirwa steel product"} />
                     </div>
                </div>
           
              
                <div className='image-Col-2 flex gap-2'>
                    <div className='image1'>
                       <img className=' sm:w-[150px]' src={structuredContent[6]?.text[2]?.src} alt={structuredContent[5]?.text[2]?.alt || "Tolirwa steel product"} />
                    </div>
                      <div className='image1'>
                         <img className=' sm:w-[150px]' src={structuredContent[6]?.text[3]?.src} alt={structuredContent[5]?.text[5]?.alt || "Tolirwa steel product"} />
                      </div>
                </div>

              </div>
        </div>

        <div className='w-full py-4 flex items-center justify-center gap-5 border-[1px] border-b-[#FFA290] border-t-[#888888] border-l-0 border-r-0
         md:w-[95%]
         xl:w-[55%] xl:p-5'>

          <h2 className='text-[#6f6f6f] text-[15px] font-bold 
          sm:text-[22px]'>{structuredContent[15]?.text[0]?.text}</h2>
          <span className='w-[50px] h-[50px] bg-[#EEE] hover:bg-[#ef3713] text-[#929292] hover:text-white rounded-full flex items-center justify-center
          xl:w-[80px] xl:h-[80px]'>
            <Link href={`https://www.facebook.com/people/Tolirwa-Ltd/100054428262569/#`}>
              <FontAwesomeIcon icon={brandIcons.faFacebookF} size="xl" aria-hidden="true" />
            </Link>
          </span>
          <span className='w-[50px] h-[50px] bg-[#EEE] hover:bg-[#ef3713] text-[#929292] hover:text-white rounded-full flex items-center justify-center
           xl:w-[80px] xl:h-[80px]'>
          <Link href={`https://www.facebook.com/people/Tolirwa-Ltd/100054428262569/#`}>
            <FontAwesomeIcon icon={brandIcons.faLinkedinIn} size="xl" aria-hidden="true" />
          </Link>
          </span>
     

        </div>

     


    </div>

    </>

  )
}

export default Home

