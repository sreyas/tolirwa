import Link from "next/link";
import Image from "next/image";

export default function Quotebar() {
  return (
    <div className='2xl:absolute 2xl:top-[80%] 2xl:left-0 mt-3'>
      <Link href="/get-quotes">
        {/* <img
          src="https://www.tolirwa.com/wp-content/uploads/2014/06/get-aquote.png"
          alt="Get a quote"
        /> */}
        <Image
            src="https://www.tolirwa.com/wp-content/uploads/2014/06/get-aquote.png"
            alt="Get a quote"
            width={150}      
            height={300}   
            sizes="(max-width: 768px) 150px, 300px"
            quality={100}    
            loading="lazy"
            fetchPriority="high"
        />
      </Link>
    </div>
  );
}
