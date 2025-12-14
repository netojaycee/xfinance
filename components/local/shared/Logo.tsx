import Image from "next/image";

export default function Logo({ white = false }: { white?: boolean }) {
  return (
    <div className='w-35.5 h-12 mx-auto'>
      <Image
        src={white ? "/logo_white.png" : "/logo.png"}
        alt='Hunslow Accounting Logo'
        width={142}
        height={48}
        className='w-35.5 h-12 object-fit'

        priority
      />
    </div>
  );
}
