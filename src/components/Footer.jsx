"use client";
import React from 'react'
import { FontAwesomeIcon, solidIcons, brandIcons } from '@/icons/icons';


const Footer = () => {
  return (
    <div>
      {/* Top Section */}
      <div className="bg-[#313131] py-6 flex justify-center ">
        <div className="w-[85%] sm:w-[75%] md:w-[85%] lg:w-[65%]">
          <h2 className="text-xl font-bold mb-4 text-orange-500">Tolirwa Ltd</h2>
          <p className='text-[#b8b8b8] text-[13px] mt-1'>PLOT E9,</p>
          <p className='text-[#b8b8b8] text-[13px] mt-1'>KIGALI SPECIAL ECONOMIC ZONE.</p>
          <p className='text-[#b8b8b8] text-[13px] mt-1'>MASORO</p>
          <p className='text-[#b8b8b8] text-[13px] mt-1'>POST BOX 521, KIGALI, RWANDA.</p>

          <table className='mt-5 text-[#b8b8b8] w-full sm:w-[50%] md:w-[35%]'>
            <tbody>
              <tr>
                <td>
                  <FontAwesomeIcon icon={solidIcons.faPhone} className="text-sm font-bold mr-1" aria-hidden="true"/>
                  <strong className='text-sm font-bold'>Tel</strong></td>
                <td><span className='text-sm'>: +250 78830 2990</span></td>
              </tr>
              <tr>
                <td><strong className='text-sm'>Kinyarwanda/<br />French</strong></td>
                <td><span className='text-sm'>: +250 78851 5964</span></td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon={solidIcons.faEnvelope} className="text-sm font-bold mr-1" aria-hidden="true"/>
                  <strong className='text-sm font-bold'>Email</strong></td>
                <td><span className='text-sm'>: sales@tolirwa.com <br />: tolirwa@tolirwa.com</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#000] text-[#b8b8b8] py-6 flex justify-center">
        <div className="w-[85%] sm:w-[75%] md:w-[85%] lg:w-[65%] flex flex-col md:flex-row justify-between items-center mt-6 mb-6">
          
          {/* Left Column */}
          <div className="w-full md:w-1/2 mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm mb-1">
              © 2025 <span className="text-[#EF3713]">Tolirwa</span>. All Rights Reserved.
            </p>
            <p className="text-sm mt-4 text-[#EF3713]">Wordpress website by Sreyas</p>
          </div>

          {/* Right Column - Social Media */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end space-x-4">
            <a 
              href="https://www.facebook.com/people/Tolirwa-Ltd/100054428262569/"
              className="flex justify-center items-center text-[#929292] hover:text-white hover:bg-[#EF3713] bg-[#555555] w-9 h-9 rounded-full"
              aria-label="Tolirwa Ltd Facebook page"
            >
              <span className="sr-only">Facebook</span>
              <FontAwesomeIcon icon={brandIcons.faFacebookF}  aria-hidden="true"/>
            </a>

            <a 
              href="https://www.linkedin.com/company/tolirwa-ltd"
              className="flex justify-center items-center text-[#929292] hover:text-white hover:bg-[#EF3713] bg-[#555555] w-9 h-9 rounded-full"
              aria-label="Tolirwa Ltd LinkedIn page"
            >
              <span className="sr-only">LinkedIn</span>
              <FontAwesomeIcon icon={brandIcons.faLinkedinIn}  aria-hidden="true"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
