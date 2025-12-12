import Link from "next/link";

export default function Quotebar() {
  return (
    <div className='2xl:absolute 2xl:top-[80%] 2xl:left-0 mt-3'>
      <Link href="/get-quotes">
        <img
          src="https://www.tolirwa.com/wp-content/uploads/2014/06/get-aquote.png"
          alt="Get a quote"
        />
      </Link>
    </div>
  );
}
