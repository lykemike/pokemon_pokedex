import PokemonDetails from '@/components/PokemonDetails';
import ReturnHomeButton from '@/components/ReturnHomeButton';
import { capitalizeFirstLetter } from '@/libs/reusableFunctions';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';

type Params = {
  params: {
    search: string;
  };
};

export async function generateMetadata({
  params: { search },
}: Params): Promise<Metadata> {
  return {
    title: capitalizeFirstLetter(search),
    description: search,
  };
}

const searchPokemon = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const pokeapi = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/pokemon/${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': ' application/json',
        },
      }
    );
    const res = await pokeapi.json();
    return res;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

export default async function Page({ params }: { params: { search: string } }) {
  const decodedSearch = decodeURIComponent(params?.search);
  const { data } = await searchPokemon(decodedSearch);

  return (
    <div className='mx-auto max-w-7xl'>
      <span className='mt-20 p-2'>
        <ReturnHomeButton />
      </span>

      <PokemonDetails data={data} />
    </div>
  );
}
