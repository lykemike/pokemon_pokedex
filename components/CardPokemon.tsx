'use client';
import PokemonTypeBadge from '@/components/PokemonTypeBadge';
import { lowerCase } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Balancer from 'react-wrap-balancer';
import SearchPokemon from './SearchPokemon';

export default function CardPokemon({ pokemonData, region }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const [pokeData, setPokeData] = useState(pokemonData);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const searchPlaceholders = [
    'Explore Pokémon world...',
    'Find a rare Pokémon...',
    'Search for Pikachu...',
    'Discover new species...',
    'Hunt for legendary Pokémon...',
    'Seek Pokémon mysteries...',
    'Unearth hidden Pokémon...',
    "Catch 'em all today...",
    'Track down wild Pokémon...',
    'Find your next partner...',
  ];

  const randomSearchText =
    searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)];

  const handleSearch = async (searchTerm: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!searchTerm) {
      router.push(`/region/${region}`);
      setPokeData(pokemonData);
    } else {
      const filtered = pokemonData.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPokeData(filtered);
    }

    setLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='mx-auto max-w-7xl space-y-10 p-6'>
      <h1 className='flex justify-center text-6xl font-bold uppercase'>
        {region}
      </h1>
      <div className='flex justify-center'>
        <SearchPokemon
          defaultValue={search}
          region={region}
          onSearch={handleSearch}
        />
      </div>

      {loading ? (
        <div className='mt-30 flex justify-center text-center'>
          <div className='animate-pulse text-4xl font-bold'>
            {randomSearchText}
          </div>
        </div>
      ) : pokeData.length === 0 ? (
        <div className='flex justify-center'>
          <span className='text-xl font-semibold lowercase text-neutral-800'>
            {search ? (
              <>
                <span className='font-bold'>
                  pokemon not found in this region. 😔
                </span>
              </>
            ) : (
              'Pokemon not found. 😔'
            )}
          </span>
        </div>
      ) : pokeData ? (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {pokeData.map((i: any) => (
            <div key={i.id}>
              <Link href={`/pokemon/${lowerCase(i.name).replace(/\s+/g, '-')}`}>
                <div className='flex cursor-pointer space-x-2 rounded-lg border-2 border-neutral-800 bg-white p-2 transition-transform duration-200 ease-in-out hover:-translate-x-[3px] hover:-translate-y-[3px] hover:bg-[#cde41e] hover:shadow-[2px_2px_0px_#222222]'>
                  <span className='flex h-32 w-32 items-center justify-center'>
                    <Image
                      src={i.front_default}
                      width={120}
                      height={120}
                      alt=''
                      quality={100}
                      priority
                    />
                  </span>

                  <Balancer>
                    <div className='flex space-x-2 text-2xl font-bold'>
                      <h1>No</h1>
                      <h1>#{i.id}</h1>
                    </div>

                    <div className='space-y-2'>
                      <h2 className='text-2xl font-bold'>{i.name}</h2>
                      <span className='flex space-x-2 text-sm'>
                        <p>Height: {i.height}</p>
                        <p>Weight: {i.weight}</p>
                      </span>
                      <span className='flex space-x-2'>
                        {i?.types?.map((j: any, index: number) => (
                          <PokemonTypeBadge key={index} type={j} />
                        ))}
                      </span>
                    </div>
                  </Balancer>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : null}

      {isVisible && (
        <button
          className='fixed bottom-4 right-4 z-10 rounded-full bg-neutral-600 p-2 text-white shadow-md transition duration-300 hover:bg-neutral-900'
          onClick={scrollToTop}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18'
            />
          </svg>
        </button>
      )}
    </div>
  );
}
