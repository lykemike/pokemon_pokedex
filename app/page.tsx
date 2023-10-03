import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

export const metadata: Metadata = {
  title: 'Pokémon Universe',
  description: 'Welcome to PokéAPI',
};

const travelPrompts = [
  {
    id: 1,
    text: 'Discover New Adventures: Select a Pokémon Region to Explore!',
  },
  { id: 2, text: 'Embark on a Journey: Which Pokémon Region Calls to You?' },
  {
    id: 3,
    text: 'Ready to Explore: Pick Your Ideal Pokémon Region to Travel!',
  },
  {
    id: 4,
    text: 'Your Adventure Awaits: Choose the Perfect Pokémon Region for You!',
  },
  {
    id: 5,
    text: 'Travel Goals: Select a Pokémon Region to Begin Your Expedition!',
  },
  { id: 6, text: 'Dream Destinations: Which Pokémon Region Will You Explore?' },
  {
    id: 7,
    text: 'Destination Pokémon: Pick the Region Where Your Journey Begins!',
  },
  {
    id: 8,
    text: "Region Quest: It's Time to Choose Your Pokémon Travel Spot!",
  },
  {
    id: 9,
    text: 'Map Your Destiny: Select the Pokémon Region to Start Your Adventure!',
  },
  {
    id: 10,
    text: 'Roam Free: Which Pokémon Region Will Be Your Next Expedition?',
  },
  {
    id: 11,
    text: 'Call of the Wild: Choose a Pokémon Region for Your Journey!',
  },
  { id: 12, text: 'Where to Wander: Select a Pokémon Region to Embark On!' },
  {
    id: 13,
    text: 'Ready to Roam: Which Pokémon Region Will You Explore Next?',
  },
  {
    id: 14,
    text: 'Paths Untraveled: Pick the Perfect Pokémon Region for Your Adventure!',
  },
  {
    id: 15,
    text: 'Choose Your Route: Select the Pokémon Region That Captures Your Imagination!',
  },
  {
    id: 16,
    text: 'Wanderlust Beckons: Pick a Pokémon Region for Your Next Odyssey!',
  },
  { id: 17, text: 'Region Discovery: Which Pokémon World Will You Explore?' },
  {
    id: 18,
    text: 'Seek and Find: Choose the Pokémon Region That Beckons to You!',
  },
  {
    id: 19,
    text: 'Adventure Awaits: Select a Pokémon Region to Begin Your Quest!',
  },
  {
    id: 20,
    text: 'Onward and Upward: Pick Your Desired Pokémon Region to Traverse!',
  },
];

const pokemonData = [
  {
    id: 1,
    name: 'Kanto',
    img: '/regions_img/kanto.png',
  },
  {
    id: 2,
    name: 'Johto',
    img: '/regions_img/johto.png',
  },
  {
    id: 3,
    name: 'Hoenn',
    img: '/regions_img/hoenn.png',
  },
  {
    id: 4,
    name: 'Sinnoh',
    img: '/regions_img/sinnoh.png',
  },
  {
    id: 5,
    name: 'Unova',
    img: '/regions_img/unova.png',
  },
  {
    id: 6,
    name: 'Kalos',
    img: '/regions_img/kalos.png',
  },
  {
    id: 7,
    name: 'Alola',
    img: '/regions_img/alola.png',
  },
  {
    id: 8,
    name: 'Galar',
    img: '/regions_img/galar.png',
  },
];

function getRandomPrompt() {
  const randomIndex = Math.floor(Math.random() * travelPrompts.length);
  return travelPrompts[randomIndex];
}

export default async function Home() {
  const randomPrompt = getRandomPrompt();
  return (
    <>
      <div className='mx-auto mt-4 flex max-w-7xl items-center'>
        <div className='w-full'>
          <p className='flex justify-center text-center text-4xl font-bold text-neutral-800 md:text-6xl '>
            <Balancer>{randomPrompt.text}</Balancer>
          </p>

          <div className='inline-flex w-full items-center justify-center'>
            <hr className='my-8 h-2 w-4/5  rounded border-0 bg-neutral-800' />
          </div>

          <div className='grid grid-cols-1 gap-4 p-4 lg:grid-cols-2'>
            {pokemonData.map((i, index) => {
              return (
                <Link key={index} href={`/region/${i.name.toLowerCase()}`}>
                  <div className='group relative cursor-pointer overflow-hidden rounded-md border'>
                    <div className='group cursor-pointer'>
                      <Image
                        className='h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-110'
                        src={i.img}
                        alt=''
                        width={500}
                        height={500}
                        quality={100}
                      />
                    </div>

                    <div className='absolute bottom-0 px-4 py-2'>
                      <h1 className='text-4xl font-bold tracking-wider text-white'>
                        {i.name}
                      </h1>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
