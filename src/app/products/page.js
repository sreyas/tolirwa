"use client";

import React, { useEffect, useState } from "react";
import SidebarProducts from "../../components/SidebarProducts";
import Link from "next/link";
import { PRODUCT_PAGE_CONTENT } from "@/lib/ApiPath";
import client from "@/lib/apollo-client";
import Loader from "@/components/Loader";

const Products = () => {
  const [productData, setProductData] = useState({
    description: "",
    sections: [],
  });
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const res = await client.query({
        query: PRODUCT_PAGE_CONTENT,
      });

      setTitle( res.data.pageBy.title)
      const html = res.data.pageBy.content;
      console.log("Htmlll",html);
      

      const result = parseHtmlToJson(html);

      console.log("✅ Parsed HTML Data:", result);

      setProductData(result);
    } catch (err) {
      console.log("❌ Error fetching page data:", err);
    }finally {
      setLoading(false);  
    }
  };

  // ✅ Extract last part of URL (product slug)
  const getSlugFromUrl = (url) => {
    if (!url) return "";
    return url.replace(/\/$/, "").split("/").pop();
  };

  // ✅ Convert category title → slug
  const toSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  // ✅ Convert HTML → structured JSON
  const parseHtmlToJson = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    let description = "";
    const paragraphs = Array.from(doc.querySelectorAll("p"));

    for (const p of paragraphs) {
      description += p.textContent.trim() + "\n";
      if (p.nextElementSibling?.tagName === "H3") break;
    }

    description = description.trim();

    const sections = [];
    const h3Tags = Array.from(doc.querySelectorAll("h3"));

    h3Tags.forEach((h3) => {
      const title = h3.textContent.trim();
      const categorySlug = toSlug(title); // ✅ convert category → slug

      const ul = h3.nextElementSibling;

      const items = [];

      if (ul && ul.tagName === "UL") {
        const liTags = Array.from(ul.querySelectorAll("li"));

        liTags.forEach((li) => {
          const link = li.querySelector("a");
          const img = li.querySelector("img");

          const url = link?.getAttribute("href") || "";
          const itemSlug = getSlugFromUrl(url);

          items.push({
            title: link?.textContent?.trim() || "",
            url,
            slug: itemSlug,
            category: categorySlug,
            fullPath: `/products/${categorySlug}/${itemSlug}`, // ✅ Final route
            image: img?.getAttribute("src") || "",
          });
        });
      }

      sections.push({ title, categorySlug, items });
    });

    return { description, sections };
  };

    if (loading) return <Loader />;
  

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


        <h1 className="text-gray-600 text-3xl font-bold mb-7">{title}</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-2/3 text-[#56565A]">

            {/* ✅ Render Description */}
            {productData.description.split("\n").map((p, i) => (
              <p key={i} className="mb-4 text-[14px] leading-[24px]">
                {p}
              </p>
            ))}

            {/* ✅ Render All Sections */}
            {productData.sections.map((section, sIndex) => (
              <div key={sIndex} className="mt-10">

                <h1 className="text-[24px] font-bold mb-4 text-[#56565A]">
                  {section.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item, iIndex) => (
                    <Link
                      key={iIndex}
                      href={item.fullPath}   // ✅ Correct dynamic route
                      className="border border-[#CCCCCC] hover:border-[#ef3713] group"
                    >
                      <div className="bg-[#CCCCCC] group-hover:bg-[#ef3713] h-12 flex items-center justify-center transition">
                        <h1 className="font-bold text-white">{item.title}</h1>
                      </div>

                      <div className="p-4 flex justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-w-full h-auto"
                        />
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            ))}

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-1/3 mt-[-4%]">
            <SidebarProducts />
          </div>
        </div>
      </div>


   


    </div>
  );
};

export default Products;
