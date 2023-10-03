import CardPokemon from '@/components/CardPokemon';
import ReturnHomeButton from '@/components/ReturnHomeButton';
import { Metadata } from 'next';
import { capitalizeFirstLetter } from '@/libs/reusableFunctions';

export const dynamic = 'force-dynamic';
type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: Params): Promise<Metadata> {
  return {
    title: capitalizeFirstLetter(slug),
    description: `Welcome to ${slug}`,
  };
}

const fetchPokemon = async (region: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const pokeapi = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/region/${region}`,
      {
        method: 'GET',
      }
    );
    const res = await pokeapi.json();

    return res;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data } = await fetchPokemon(params?.slug);

  return (
    <div className='mx-auto max-w-7xl'>
      <span className='mt-20 p-2'>
        <ReturnHomeButton />
      </span>

      <CardPokemon pokemonData={data} region={params?.slug} />
    </div>
  );
}
