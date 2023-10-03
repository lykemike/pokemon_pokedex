import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex justify-center rounded-b-3xl bg-neutral-800 p-4'>
      <Link href='/'>
        <div className='flex items-center space-x-2'>
          <Image
            className='h-20 w-20 animate-spin-slow object-contain md:h-32 md:w-32'
            src='https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
            width={100}
            height={100}
            alt=''
            priority
            quality={100}
          />
          <h1 className='text-3xl font-bold tracking-wider text-white md:text-5xl'>
            Pokémon Universe
          </h1>
        </div>
      </Link>
    </header>
  );
}
