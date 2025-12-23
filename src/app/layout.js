  // app/layout.js

import "./globals.css";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import React from 'react'
import Quotebar from "@/components/Quotebar";

// Font Awesome setup
import { config } from '@fortawesome/fontawesome-svg-core';
// import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

    export const metadata = {
    title: "Tolirwa Ltd",
    description: "Tolirwa Ltd – established in 1978, market leader in roofing sheets and allied products across Rwanda & East Africa. Rust-proof, high quality roofing solutions.",
    keywords: ["roofing sheets", "roofing solutions", "roofing Rwanda", "Tolirwa Ltd"],
    openGraph: {
      title: "Tolirwa Ltd ",
      description: "Tolirwa Ltd – established in 1978, market leader in roofing sheets and allied products across Rwanda & East Africa.",
      url: "https://www.tolirwa.com/",
      siteName: "Tolirwa Ltd",
      images: [
        {
          url: "https://www.tolirwa.com/wp-content/uploads/2024/01/roofing-sheets-tolirwa.jpg", 
          width: 1200,
          height: 630,
        }
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tolirwa Ltd – Roofing Sheets & Allied Products",
      description: "Market leader in roofing sheets and allied products in Rwanda & East Africa since 1978.",
      images: ["https://www.tolirwa.com/wp-content/uploads/2024/01/roofing-sheets-tolirwa.jpg"] 
    }
  };

  const Layout = ({ children }) => {
    return (
      <html lang="en">
        <body>
          <Header />
          <Banner />
          <Quotebar/>
          {children}
          <Footer />
        </body>
      </html>
    )
  }

  export default Layout
