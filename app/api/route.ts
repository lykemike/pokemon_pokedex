import { capitalizeFirstLetter } from '@/libs/reusableFunctions';
import { NextRequest, NextResponse } from 'next/server';

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonType {
  pokemon_type: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  types: PokemonType[];
  weight: string;
  height: string;
  front_default: string;
}

async function fetchPokemonDetails(
  url: string
): Promise<PokemonDetails | null> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const types: PokemonType[] = data.types.map(
      (type: { type: { name: string } }) =>
        capitalizeFirstLetter(type.type.name)
    );
    return {
      id: data.id,
      name: capitalizeFirstLetter(data.name),
      height: (Number(data.height) / 10).toFixed(1) + ' m',
      weight: (Number(data.weight) / 10).toFixed(1) + ' kg',
      types,
      front_default: data.sprites.other['official-artwork'].front_default,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const pokeapiResponse = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
    );
    const pokeapiData = await pokeapiResponse.json();

    const pokemonResults: PokemonResult[] = pokeapiData.results;

    const pokemonPromises: Promise<PokemonDetails | null>[] =
      pokemonResults.map((result) => fetchPokemonDetails(result.url));

    const pokemons: PokemonDetails[] = (
      await Promise.all(pokemonPromises)
    ).filter((pokemon): pokemon is PokemonDetails => pokemon !== null);

    return NextResponse.json({
      message: 'Fetch pokemon success',
      data: pokemons,
    });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch pokemon. Please try again later', {
      status: 500,
    });
  }
};

export const POST = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  console.log(req);
  try {
    const pokeapiResponse = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
    );
    const pokeapiData = await pokeapiResponse.json();

    const pokemonResults: PokemonResult[] = pokeapiData.results;

    const pokemonPromises: Promise<PokemonDetails | null>[] =
      pokemonResults.map((result) => fetchPokemonDetails(result.url));

    const pokemons: PokemonDetails[] = (
      await Promise.all(pokemonPromises)
    ).filter((pokemon): pokemon is PokemonDetails => pokemon !== null);

    return NextResponse.json({
      message: 'Fetch pokemon success',
      data: pokemons,
    });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch pokemon. Please try again later', {
      status: 500,
    });
  }
};
