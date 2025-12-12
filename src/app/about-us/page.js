"use client";

import React, { useEffect, useState } from 'react'
import SidebarProducts from '../../components/SidebarProducts'
import { ABOUT_US_PAGE_CONTENT } from '@/lib/ApiPath';
import client from '@/lib/apollo-client';
import Loader from "@/components/Loader";
import Link from 'next/link';



const About = () => {

    const [aboutUsFetchedData, setAboutUsFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);

      useEffect(() => {
        fetchedAboutUsData();
      }, []);
    

    const fetchedAboutUsData = async () => {
        try{
          const res = await client.query({
            query: ABOUT_US_PAGE_CONTENT,
           });
           const pageData = res.data.pageBy;
         if (pageData) {
            setAboutUsFetchedData(pageData);
            console.log("✅ About Us data fetched:", pageData);
          } else {
            console.log("⚠️ No About Us data found in response");
         }
           
        }catch(err){
           console.log("Error at fetching AboutUs Data:::;",err);
        }finally {
          setLoading(false);  
        }
    }
  
  if (loading) return <Loader />;
  
  return (
    <div>
      
        {/* <div className=' left-0 
        2xl:absolute 2xl:top-[80%] 2xl:left-0'>
          <Link href='/get-quotes'>
            <img 
              src="https://www.tolirwa.com/wp-content/uploads/2014/06/get-aquote.png"
              alt="Get a quote"
            />
          </Link>
        </div> */}

      <div className="margintop about_cvr w-full h-auto  bg-[#EEEE] 
      md:bg-white md:flex md:items-center md:justify-center
      ">
        <div className="about_content w-full flex flex-col items-center justify-center gap-5
        md:flex-row md:w-[80%]  md:items-start
        lg:w-[80%]
        xl:w-[55%]
         
        ">

           <div className="about_col_1 w-full shadow-custom_box p-3 rounded bg-white 
          md:shadow-none lg:w-[70%] lg:pe-8 ">
             <div className="about_head">
                <p className='font-Helvetica text-[20px] font-bold text-[#56565A] mb-5
                md:text-[30px]'>{aboutUsFetchedData.title}</p>
             </div>
             <div className="about_img">
                <img  src={aboutUsFetchedData?.featuredImage?.node?.sourceUrl || ""}  alt="" />
             </div>
             <div className="about_text text-[14px] text-[#56565A] leading-[24px] font-[Source Sans Pro', sans-serif]">
                <p className='text-[14px] mt-5 font-source_Sans
                md:mt-1'>  {aboutUsFetchedData?.content?.replace(/<[^>]+>/g, "")}</p>
            </div>
           </div>

           <div className="about_Col_2 w-full shadow-custom_box 
           md:flex md:items-center md:justify-center md:shadow-none md:mt-2
           lg:w-[28%] ">
            <SidebarProducts/>
           </div>
        </div>

      </div>

      
    
    </div>
  )
}

export default About
