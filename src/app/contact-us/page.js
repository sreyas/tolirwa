"use client";

import React, { useEffect, useState } from 'react'
import SidebarProducts from '../../components/SidebarProducts'
import client from '@/lib/apollo-client';
import { CONTACT_US_CONTENT } from '@/lib/ApiPath';
import Loader from "@/components/Loader";
import Link from 'next/link';


const Contact = () => {
  const [contactUs,setContactUs]=useState({});
  const [loading,setLoading]=useState(true)

    useEffect(() => {
      fetchContactUsData();
    }, []);

  const fetchContactUsData = async () => {
    try{
         const res = await client.query({
            query: CONTACT_US_CONTENT,
           });
            console.log(res.data.pageBy);
            const contactData = res.data.pageBy;
            const formatted = formatContactContent(contactData);
            console.log("For",formatted);
            
            setContactUs(formatted);
    }catch(err){
      console.log("Error at fetching Contact Us Data:::::",err);
    }finally{
      setLoading(false)
    }
  }


  const formatContactContent = (pageData) => {
  try {
    const raw = pageData?.content || "";

    // 1. Extract the Google Map iframe URL
    const mapMatch = raw.match(/src="([^"]*google[^"]*)"/);
    const mapUrl = mapMatch ? mapMatch[1] : "";

    // 2. Extract company name
    const companyMatch = raw.match(/<h4><b>(.*?)<\/b><\/h4>/);
    const company = companyMatch ? companyMatch[1] : "";

    // 3. Extract address block
    const addressMatch = raw.match(/<h4><b>.*?<\/h4>\s*<p>(.*?)<\/p>/s);
    let addressLines = [];

    if (addressMatch) {
      addressLines = addressMatch[1]
        .replace(/<br\s*\/?>/g, "\n")
        .replace(/&nbsp;/g, "")
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }

    // 4. Extract phone numbers
    const phoneMatches = [...raw.matchAll(/:\s?\+?[0-9\s]+/g)];
    const phones = [...raw.matchAll(/:\s?\+?[0-9\s]+/g)]
      .map(m => m[0].replace(":", "").trim())
      .filter(p => p.startsWith("+250"));


    // 5. Extract emails
    const emailMatches = [...raw.matchAll(/[\w.-]+@[\w.-]+\.\w+/g)];
    const emails = emailMatches.map(m => m[0]);

    return {
      title: pageData.title,
      slug: pageData.slug,
      uri: pageData.uri,
      mapUrl,
      company,
      address: addressLines,
      phones,
      emails
    };

  } catch (err) {
    console.log("Error formatting Contact Us content", err);
    return {};
  }
};

if(loading) return <Loader />;
  return (
    <div className='flex justify-center w-full mb-8'>
      <div className='margintop w-full max-w-5xl px-5'>
        <h1 className='text-gray-600 text-3xl font-bold mb-2'>{contactUs.title}</h1>
     
        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column */}
          <div className="w-full lg:w-2/3">
            {/* Map */}
            <div className="w-full mt-5 aspect-[16/9] lg:h-[450px]">
              <iframe
                src={contactUs.mapUrl || ""}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Address */}
          <div className="mt-6">
            {contactUs.address?.map((line, index) => (
              <p key={index} className="text-gray-700 text-[13px] font-medium">
                {line}
              </p>
            ))}
          </div>

            {/* Contact Table */}
            <table className="mt-5 w-full sm:w-[70%]">
              <tbody>
                <tr>
                  <td>
                    <i className="fa fa-phone text-[#ef3713] text-xl font-bold"></i>{" "}
                    <strong className="text-[#ef3713] text-xl font-bold">Tel</strong>
                  </td>
                  <td>
                    <span className="text-lg text-gray-700">:  {contactUs.phones?.[1]}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong className="text-[#ef3713] text-xl font-bold">
                      Kinyarwanda/<br />French
                    </strong>
                  </td>
                  <td>
                    <span className="text-lg text-gray-700">: {contactUs.phones?.[1]}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className="fa fa-envelope text-[#ef3713] text-xl font-bold"></i>{" "}
                    <strong className="text-[#ef3713] text-xl font-bold">Email</strong>
                  </td>
                  <td>
                  <span className="text-lg text-gray-700">
                    {contactUs.emails?.map((email, i) => (
                      <React.Fragment key={i}>
                        : {email}
                        {i !== contactUs.emails.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3  mt-[-4%]">
            <SidebarProducts />
          </div>
        </div>
      </div>

      {/* <div className='absolute left-0 top-[80%]'>
          <Link href='/get-quotes'>
            <img 
              src="https://www.tolirwa.com/wp-content/uploads/2014/06/get-aquote.png"
              alt="Get a quote"
            />
          </Link>
      </div> */}

    </div>
  )
}

export default Contact
