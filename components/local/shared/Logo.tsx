import Image from "next/image";

export default function Logo({ white = false }: { white?: boolean }) {
  return (
    <div className='w-10 h-10 mx-auto'>
      <Image
        src={"/images/logo.png"}
        alt='Xfinance Logo'
        width={180}
        height={180}
        className='w-10 h-10 '

        priority
      />
    </div>
  );
}
