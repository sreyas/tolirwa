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
            console.log("raw Data",res.data.pageBy);
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

    // Map
    const mapMatch = raw.match(/src="([^"]*google[^"]*)"/);
    const mapUrl = mapMatch ? mapMatch[1] : "";

    // Company
    const companyMatch = raw.match(/<h4><b>(.*?)<\/b><\/h4>/);
    const company = companyMatch ? companyMatch[1] : "";

    // Address
    const addressMatch = raw.match(/<h4><b>.*?<\/h4>\s*<p>(.*?)<\/p>/s);
    let address = [];

    if (addressMatch) {
      address = addressMatch[1]
        .replace(/<br\s*\/?>/g, "\n")
        .replace(/&nbsp;/g, "")
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);
    }

    // 🔹 Contact rows (Tel / Kinyarwanda / Email)
   // 🔹 Contact rows (with icon)
const contactRows = [];
const rowRegex = /<tr>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<\/tr>/gs;

let match;
while ((match = rowRegex.exec(raw)) !== null) {
  const labelHtml = match[1];
  const valueHtml = match[2];

  // Extract icon class (if exists)
  const iconMatch = labelHtml.match(/<i[^>]*class="([^"]+)"/);
  const iconClass = iconMatch ? iconMatch[1] : null;

  console.log("iconClassName",iconClass);
  

  // Extract label text
  const label = labelHtml
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // Extract values
  const values = valueHtml
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/:/g, "")
    .replace(/&nbsp;/g, "")
    .split("\n")
    .map(v => v.trim())
    .filter(Boolean);

  contactRows.push({
    label,
    iconClass,
    value: values
  });
}


    return {
      title: pageData.title,
      slug: pageData.slug,
      uri: pageData.uri,
      mapUrl,
      company,
      address,
      contactRows
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
    {contactUs.contactRows?.map((row, index) => (
      <tr key={index}>
        <td className="w-[30%] py-2">
          <div className="flex items-center   gap-2">
            {row.iconClass && (
              <i className={`${row.iconClass} text-[#ef3713] text-xl`} />
            )}
            <strong className="text-[#ef3713] text-xl font-bold">
              {row.label}
            </strong>
          </div>
        </td>

        <td className="py-2 text-lg text-gray-700">
          {row.value.map((v, i) => (
            <React.Fragment key={i}>
              : {v}
              {i !== row.value.length - 1 && <br />}
            </React.Fragment>
          ))}
        </td>
      </tr>
    ))}
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
