"use client"
 
import React, { useState,useEffect } from 'react';
import SidebarProducts from '@/components/SidebarProducts';
import { FETCH_GET_QUOTES } from '@/lib/ApiPath';
import client from '@/lib/apollo-client';
import Link from 'next/link';

const GetQuotes = () => {
 

  // :::::: UseStates ::::: //

  const [getOuotes, setGetQuotes] = useState(""); 
  const [parsedForm, setParsedForm] = useState(null);


  // :::::: UseEffect ::::: //

  useEffect(() => {
    fetchgetQuotes();
  }, []);


  useEffect(() => {
    if (!getOuotes?.content) return;

    const parsed = parseCF7HTML(getOuotes.content);
    setParsedForm(parsed);

    console.log("FULL FORM DATA:", parsed);
  }, [getOuotes]);



  // :::::: Functions ::::: //

  const fetchgetQuotes = async () => {
    try {
       const res = await client.query({
            query: FETCH_GET_QUOTES,
           });
        setGetQuotes(res.data.pages.nodes[0]);
        console.log("Res raw",res.data.pages.nodes[0]);
           
    } catch (error) {
      console.error("Error fetching get quotes:", error);
    }
  }

 
// :::::: Parse Contact Form 7 HTML ::::: //


  const parseCF7HTML = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // FORM
  const form = doc.querySelector("form");

  // FORM ID
  const formId =
    doc.querySelector("[data-wpcf7-id]")?.getAttribute("data-wpcf7-id") || "";

  // ALL TEXT PARAGRAPHS (LABELS + DESCRIPTIONS)
  const paragraphs = [...doc.querySelectorAll("p")]
    .map(p => p.textContent.trim())
    .filter(Boolean);

  // HIDDEN FIELDS
  const hiddenFields = [...doc.querySelectorAll("input[type='hidden']")]
    .map(i => i.name);

  // INPUTS & TEXTAREAS
  const fields = [];

  [...doc.querySelectorAll(".wpcf7-form-control-wrap")].forEach(wrap => {
    const input =
      wrap.querySelector("input") || wrap.querySelector("textarea");

    if (!input) return;

    // LABEL = nearest previous <p>
    let label = "";
    let prev = wrap.closest("p")?.previousElementSibling;
    if (prev && prev.tagName === "P") {
      label = prev.textContent.replace("(required)", "").trim();
    }

    fields.push({
      label,
      tag: input.tagName.toLowerCase(),
      type: input.type || "textarea",
      name: input.name,
      required: input.classList.contains("wpcf7-validates-as-required"),
      classes: [...input.classList]
    });
  });

  // SUBMIT BUTTON
  const submitText =
    doc.querySelector(".wpcf7-submit")?.value || "Submit";

  return {
    formId,
    texts: paragraphs,
    fields,
    submitText,
    hiddenFields
  };
};



// :::::: Render ::::: //

if(!getOuotes){
    return <div>Loading...</div>;
  }


  return (
    <div>
      <div className="margintop about_cvr w-full h-auto bg-[#EEEE] md:bg-white md:flex md:items-center md:justify-center">
        <div className="about_content w-full flex flex-col items-center justify-center gap-5 md:flex-row md:w-[80%] md:items-start lg:w-[80%] xl:w-[65%]">
          <div className="about_col_1 w-full shadow-custom_box p-3 rounded bg-white md:shadow-none lg:w-[70%] lg:pe-8">
            <div className="about_head">
              <p className='font-Helvetica text-[20px] font-bold text-[#56565A] mb-5 md:text-[30px]'>
               {getOuotes?.title}
              </p>
            </div>
            
            <div className="">
              <p className='text-gray-700 text-sm mb-4'>
                {parsedForm?.texts[0]}
               </p>

              {parsedForm?.fields?.map((field, index) => (
                <div key={field.name || index} className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>

                  {field.tag === "input" ? (
                    <input
                      type={field.type}
                      name={field.name}
                      className="w-full lg:w-[50%] border border-gray-300 p-2 rounded"
                      required={field.required}
                    />
                  ) : (
                    <textarea
                      name={field.name}
                      className="w-full lg:w-[50%] border border-gray-300 p-2 rounded"
                      required={field.required}
                    />
                  )}
                </div>
              ))}


              {/* {renderField('Name of the company', 'companyName')}
              {renderField('Contact Person', 'contactPerson')}
              {renderField('Contact Number', 'contactNumber')}
              {renderField('Mobile Number', 'mobileNumber')}
              {renderField('Email', 'email')}
              {renderField('Subject', 'subject')}
              {renderField('Enquiry Details', 'enquiryDetails', 'textarea')} */}

              <div className='w-[50%] mt-10 flex items-center justify-center text-white'>
                <button 
                 
                  className='w-full bg-[#ef3713] hover:bg-[#ff2c02e0] p-2 rounded-md font-extrabold'
                  aria-label="submit button"
                >
                  {parsedForm?.submitText || "Submit.."}
                </button>
              </div>
              {/* {showValidationError && (
                <div className='bg-yellow-50 border-2 border-yellow-300 p-2 mb-4 mt-5'>
                  <p className='text-gray-700 text-[13px]'>
                    Validation errors occurred. Please confirm the fields and submit it again.
                  </p>
                </div>
              )} */}
            </div>
          </div>

          <div className="about_Col_2 w-full shadow-custom_box md:flex md:items-center md:justify-center md:shadow-none md:mt-2 lg:w-[28%]">
            <SidebarProducts/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetQuotes;