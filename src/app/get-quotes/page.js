"use client"
 
import React, { useState,useEffect } from 'react';
import SidebarProducts from '@/components/SidebarProducts';
import { FETCH_GET_QUOTES } from '@/lib/ApiPath';
import client from '@/lib/apollo-client';
import Link from 'next/link';

const GetQuotes = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    contactNumber: '',
    mobileNumber: '',
    email: '',
    subject: '',
    enquiryDetails: ''
  });

  const [errors, setErrors] = useState({});
  const [showValidationError, setShowValidationError] = useState(false);
  const [qetOuotes, setGetQuotes] = useState(""); 


  const fetchgetQuotes = async () => {
    try {
       const res = await client.query({
            query: FETCH_GET_QUOTES,
           });

          console.log("Res raw",res.data);
           
    } catch (error) {
      console.error("Error fetching get quotes:", error);
    }
  }


  useEffect(() => {
    fetchgetQuotes();
  },[])





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (showValidationError) {
      setShowValidationError(false);
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    const requiredFields = ['companyName', 'contactPerson', 'contactNumber', 'mobileNumber', 'email', 'subject', 'enquiryDetails'];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'Please fill the required field.';
      }
    });

    // Special email validation
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowValidationError(true);
    } else {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
      
      setFormData({
        companyName: '',
        contactPerson: '',
        contactNumber: '',
        mobileNumber: '',
        email: '',
        subject: '',
        enquiryDetails: ''
      });
      setErrors({});
      setShowValidationError(false);
    }
  };

  const renderField = (label, name, type = 'text') => (
    <div className='flex flex-col w-full gap-3 mt-4 text-gray-700 sm:w-[50%] md:w-full lg:w-[50%]'>
      <label className='text-sm'>{label} (required)</label>
      {type === 'textarea' ? (
        <textarea 
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="border border-gray-700 rounded-sm p-2 h-32 resize-none"
        />
      ) : (
        <input 
          type='text' 
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className='border-[1px] border-gray-700 rounded-sm h-[30px]'
        />
      )}
      {errors[name] && <p className='text-red-700 text-[13px]'>{errors[name]}</p>}
    </div>
  );

  return (
    <div>
      <div className="margintop about_cvr w-full h-auto bg-[#EEEE] md:bg-white md:flex md:items-center md:justify-center">
        <div className="about_content w-full flex flex-col items-center justify-center gap-5 md:flex-row md:w-[80%] md:items-start lg:w-[80%] xl:w-[65%]">
          <div className="about_col_1 w-full shadow-custom_box p-3 rounded bg-white md:shadow-none lg:w-[70%] lg:pe-8">
            <div className="about_head">
              <p className='font-Helvetica text-[20px] font-bold text-[#56565A] mb-5 md:text-[30px]'>
                Get A Quote
              </p>
            </div>
            
            <div className="getQuotesFields">
              <p className='text-gray-700 text-sm mb-4'>
                Please submit the details of query, We will contact you soon.
              </p>

              {renderField('Name of the company', 'companyName')}
              {renderField('Contact Person', 'contactPerson')}
              {renderField('Contact Number', 'contactNumber')}
              {renderField('Mobile Number', 'mobileNumber')}
              {renderField('Email', 'email')}
              {renderField('Subject', 'subject')}
              {renderField('Enquiry Details', 'enquiryDetails', 'textarea')}

              <div className='w-[50%] mt-10 flex items-center justify-center text-white'>
                <button 
                  onClick={handleSubmit}
                  className='w-full bg-[#ef3713] hover:bg-[#ff2c02e0] p-2 rounded-md font-extrabold'
                  aria-label="submit button"
                >
                  Submit
                </button>
              </div>
              {showValidationError && (
                <div className='bg-yellow-50 border-2 border-yellow-300 p-2 mb-4 mt-5'>
                  <p className='text-gray-700 text-[13px]'>
                    Validation errors occurred. Please confirm the fields and submit it again.
                  </p>
                </div>
              )}
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