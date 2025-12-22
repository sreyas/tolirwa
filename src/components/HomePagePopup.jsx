"use client";
import React, { useEffect } from "react";
import { FontAwesomeIcon, solidIcons } from "@/icons/icons";

const HomePagePopup = ({ popUp, onClose }) => {

  // ✅ Disable scrolling when popup mounts
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      // ✅ Restore scroll when popup unmounts
      document.body.style.overflow = "auto";
    };
  }, []);




  return (
    <div className="fixed inset-0 w-full h-full bg-[#000000cc] z-[2000] flex items-center justify-center">
     <div className="w-[95%] h-[80%]  flex flex-col
     sm:w-[70%]">
    <div className="closeBtn w-full h-[10%] flex items-center justify-end 
    md:p-14
    2xl:pr-[30%]">
      <button onClick={onClose} aria-label="Close popup" className="text-white hover:opacity-80 transition">
        <FontAwesomeIcon
          icon={solidIcons.faXmark}
          size="2x"
        />
      </button>
    </div>
<div className="commonDiv relative flex flex-col items-center justify-center">
      <div className="firstDiv absolute left-[5%] p-5   top-[-10px] w-[150px] h-[150px] bg-[#ef3713] text-white rounded-full flex flex-col items-center justify-center text-center  z-20
      sm:left-[10%] sm:w-[220px] sm:h-[220px]
      md:left-[20%]
      lg:left-[30%]
       2xl:w-[200px] 2xl:h-[200px] 2xl:top-[30%] 2xl:left-[33%]">
      <h1 className="text-[15px] sm:text-[23px] md:text-[28px] lg:text-[35px] font-bold">NOW WE ARE AT:</h1>
      <p className="text-[10px] sm:text-[14px] md:text-[14px] lg:text-[14px]">Kigali Special Economic Zone</p>
    </div>
     <div className="secondDiv absolute top-[60px] left-[28%] p-4 w-[250px] h-[250px] bg-white rounded-full flex flex-col items-center justify-center text-center z-10
     sm:top-[90px] sm:left-[30%] sm:w-[330px] sm:h-[330px]
     md:left-[40%]
      2xl:w-[350px] 2xl:h-[350px]">
      <h1  className="text-[37px] font-bold text-[#FF8044]" >Tolirwa Ltd</h1>
      <p className="text-[14px]">PLOT E9, <br />KIGALI SPECIAL ECONOMIC ZONE. <br />MASORO <br />POST BOX 521, KIGALI, RWANDA.</p>

     </div>
</div>

     </div>
    </div>
  );
};

export default HomePagePopup;
