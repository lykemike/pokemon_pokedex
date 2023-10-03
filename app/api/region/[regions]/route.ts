import { capitalizeFirstLetter } from '@/libs/reusableFunctions';
import { NextRequest, NextResponse } from 'next/server';
import { PokemonResult, PokemonType, PokemonDetails } from '@/typings.region';

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
      abilities: data.abilities,
      types,
      front_default: data.sprites.other['official-artwork'].front_default,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

const getRegionPokeapiUrl = (region: string): string | null => {
  const regions = {
    kanto: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151',
    johto: 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=100',
    hoenn: 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251',
    sinnoh: 'https://pokeapi.co/api/v2/pokemon?limit=108&offset=386',
    unova: 'https://pokeapi.co/api/v2/pokemon?limit=155&offset=494',
    kalos: 'https://pokeapi.co/api/v2/pokemon?limit=72&offset=649',
    alola: 'https://pokeapi.co/api/v2/pokemon?limit=88&offset=721',
    galar: 'https://pokeapi.co/api/v2/pokemon?limit=89&offset=809',
  };

  // @ts-ignore
  return regions[region] || null;
};

const fetchPokemonResults = async (url: string) => {
  const pokeapiResponse = await fetch(url);
  const pokeapiData = await pokeapiResponse.json();

  return pokeapiData.results;
};

const fetchPokemonDetailsForResults = async (results: PokemonResult[]) => {
  const pokemonPromises: Promise<PokemonDetails | null>[] = results.map(
    (result) => fetchPokemonDetails(result.url)
  );

  // Fetch Pokemon details in parallel
  const pokemons = await Promise.all(pokemonPromises);

  // Filter out null values
  return pokemons.filter(
    (pokemon): pokemon is PokemonDetails => pokemon !== null
  );
};

export const GET = async (
  req: NextRequest,
  context: { params: { regions: string } }
) => {
  try {
    const { regions } = context.params;

    const pokeapiUrl = getRegionPokeapiUrl(regions);

    if (!pokeapiUrl) {
      return new Response("Region doesn't exist", { status: 404 });
    }

    const pokemonResults = await fetchPokemonResults(pokeapiUrl);
    const pokemons = await fetchPokemonDetailsForResults(pokemonResults);

    return NextResponse.json({
      message: 'Fetch pokemon success',
      data: pokemons,
    });
  } catch (error) {
    return new Response('Failed to fetch pokemon. Please try again later', {
      status: 500,
    });
  }
};
