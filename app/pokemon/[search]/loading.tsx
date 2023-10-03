import Image from 'next/image';

export default function PokemonCardLoading() {
  return (
    <div className='m-20 mx-auto max-w-7xl'>
      <div className='m-4 flex justify-center text-center'>
        <div className='animate-pulse text-4xl font-bold'>
          <Image
            src='/regions_img/pokeballsvg.svg'
            alt=''
            height={120}
            width={120}
            className='animate-spin-slow  transition-transform duration-200 ease-in-out'
          />
        </div>
      </div>
    </div>
  );
}
