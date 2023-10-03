import {
  capitalizeAndReplaceHyphen,
  capitalizeFirstLetter,
  fetchData,
  pokemonNationalId,
} from '@/libs/reusableFunctions';
import {
  PokemonDetails,
  MainPokemon,
  PrevNextPokemon,
  Type,
  TypeData,
  PokemonData,
  CollectedTypeData,
  PokemonType,
  MoveData,
  Moves,
  FlavorTextEntry,
  SpeciesData,
  Stats,
  Chain,
} from '@/routeTypings';
import { NextRequest, NextResponse } from 'next/server';

/**
 * * PokéApi base URR's
 * @param id The ID of the Pokémon for which you want to fetch the previous and next Pokémon.
 * @param type The Type of the Pokémon e.g Grass, Poison, Fire and etc.. For all pokemons
 * @param species The Species of the Pokémon, fetch more details of the Pokémon
 * @param item The Item of the Pokémon, fetch Pokémon items
 */
const POKEAPI_BASE_URL = (id: string | number) =>
  `https://pokeapi.co/api/v2/pokemon/${id}`;
const POKEAPI_TYPE_URL = (type: string) =>
  `https://pokeapi.co/api/v2/type/${type}`;
const POKEAPI_SPECIES_URL = (species: string | number) =>
  `https://pokeapi.co/api/v2/pokemon-species/${species}`;
const POKEAPI_ITEM_URL = (item: string) =>
  `https://pokeapi.co/api/v2/item/${item}`;

/**
 * * Fetch previous and next Pokemon
 * @param id The ID of the Pokémon for which you want to fetch the previous and next Pokémon.
 */
const fetchPrevNextPokemon = async (id: string) => {
  let prevPokemon = null;
  let nextPokemon = null;

  if (Number(id) > 1) {
    prevPokemon = await fetchData(POKEAPI_BASE_URL(Number(id) - 1));
  }
  if (Number(id) < 898) {
    nextPokemon = await fetchData(POKEAPI_BASE_URL(Number(id) + 1));
  }

  let pokemonPrevNext: PrevNextPokemon[] = [
    {
      id: prevPokemon?.id || null,
      nationalId: prevPokemon?.id
        ? pokemonNationalId(String(prevPokemon?.id))
        : null,
      name: prevPokemon ? capitalizeFirstLetter(prevPokemon.name) : null,
      type: 'prev',
      sprite_front_default: prevPokemon?.sprites.front_default || null,
      isAvailable: !!prevPokemon,
    },
    {
      id: nextPokemon?.id || null,
      nationalId: nextPokemon?.id
        ? pokemonNationalId(String(nextPokemon?.id))
        : null,
      name: nextPokemon ? capitalizeFirstLetter(nextPokemon.name) : null,
      type: 'next',
      sprite_front_default: nextPokemon?.sprites.front_default || null,
      isAvailable: !!nextPokemon,
    },
  ];

  return pokemonPrevNext;
};

/**
 * * Fetch type data for a give type
 */
const getTypeData = async (type: Type): Promise<TypeData> => {
  const typeData = await fetchData(POKEAPI_TYPE_URL(type.type.name));

  const weakTypes = typeData.damage_relations.double_damage_from.map(
    (type: { name: string }) => capitalizeFirstLetter(type.name)
  );
  const resistantTypes = typeData.damage_relations.half_damage_from.map(
    (type: { name: string }) => capitalizeFirstLetter(type.name)
  );
  const immuneTypes = typeData.damage_relations.no_damage_from.map(
    (type: { name: string }) => capitalizeFirstLetter(type.name)
  );
  const effectiveTypes = typeData.damage_relations.double_damage_to.map(
    (type: { name: string }) => capitalizeFirstLetter(type.name)
  );

  return { weakTypes, resistantTypes, immuneTypes, effectiveTypes };
};

/**
 * * Collect type data for a given Pokemon
 */
const collectTypeData = async (
  data: PokemonData
): Promise<CollectedTypeData> => {
  const typeDataArray = await Promise.all(data.types.map(getTypeData));

  let weaknesses: string[] = [];
  let resistances: string[] = [];
  let immunities: string[] = [];
  let effectives: string[] = [];

  for (const typeData of typeDataArray) {
    weaknesses.push(...typeData.weakTypes);
    resistances.push(...typeData.resistantTypes);
    immunities.push(...typeData.immuneTypes);
    effectives.push(...typeData.effectiveTypes);
  }

  weaknesses = Array.from(new Set(weaknesses));
  resistances = Array.from(new Set(resistances));
  immunities = Array.from(new Set(immunities));
  effectives = Array.from(new Set(effectives));

  return { weaknesses, resistances, immunities, effectives };
};

/**
 * * Fetch type data for a given list of types
 */
const fetchTypeData = async (types: any[]): Promise<PokemonType[]> => {
  return types.map((type: { type: { name: string } }) => {
    return {
      name: capitalizeFirstLetter(type.type.name),
    };
  });
};

/**
 * * Fetch species data for a given Pokemon
 */
const fetchSpeciesData = async (id: string): Promise<SpeciesData> => {
  const responsePokemonSpecies = await fetchData(POKEAPI_SPECIES_URL(id));
  const { flavor_text_entries, names, genera, color } = responsePokemonSpecies;

  const nameJaHrkt = names?.filter(
    (data: any) => data.language.name == 'ja-Hrkt'
  )[0].name;
  const pokemonGenera = genera?.filter(
    (data: any) => data.language.name == 'en'
  )[0].genus;

  const allEnFlavorText = flavor_text_entries
    .filter((entry: FlavorTextEntry) => entry.language.name === 'en')
    .map((entry: FlavorTextEntry) => ({
      flavor_text: entry.flavor_text,

      name: capitalizeAndReplaceHyphen(entry.version.name),
      url: entry.version.url,
    }));

  return { flavor_text_entries, nameJaHrkt, pokemonGenera, allEnFlavorText };
};

/**
 * * Fetch moves data for a given list of moves
 */
const fetchMovesData = async (moves: Moves[]): Promise<MoveData[]> => {
  return await Promise.all(
    moves.map(async (move: Moves) => {
      const moveData = await fetchData(move.move.url);
      const enFlavorText = moveData.flavor_text_entries?.find(
        (entry: any) => entry.language.name === 'en'
      );

      return {
        name: capitalizeAndReplaceHyphen(move.move.name),
        url: move.move.url,
        flavor_text: enFlavorText ? enFlavorText.flavor_text : null,
      };
    })
  );
};

/**
 * * Fetch main data for a given Pokemon
 */
const fetchPokemonMain = async (id: string): Promise<MainPokemon | null> => {
  try {
    const data = await fetchData(POKEAPI_BASE_URL(id));

    const prevNextPokemon = await fetchPrevNextPokemon(id);
    const { weaknesses, resistances, immunities, effectives } =
      await collectTypeData(data);
    const types = await fetchTypeData(data.types);
    const { allEnFlavorText, flavor_text_entries, nameJaHrkt, pokemonGenera } =
      await fetchSpeciesData(data.id);
    const moves = await fetchMovesData(data.moves);

    return {
      id: data.id,
      nationalId: pokemonNationalId(String(data.id)),
      name: capitalizeFirstLetter(data.name),
      pokemonGenera,
      nameJaHrkt,
      front_default_8bit: data.sprites.front_default,
      front_default: data.sprites.other['official-artwork'].front_default,
      front_shiny: data.sprites.other['official-artwork'].front_shiny,
      types,
      prev_next: prevNextPokemon,
      abilities: data.abilities,
      weaknesses,
      resistances,
      immunities,
      effectives,
      allEnFlavorText,
      moves,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * * Fetch varieties data for a given URL
 */
const fetchPokemonVarieties = async (url: string) => {
  try {
    const data = await fetchData(url);

    const stats = data.stats.map((stats: Stats) => {
      return { base_stat: stats.base_stat, stat_name: stats.stat.name };
    });

    const types: PokemonType[] = data.types.map(
      (type: { type: { name: string } }) =>
        capitalizeFirstLetter(type.type.name)
    );

    return {
      id: data.id,
      name: data.name,
      types,
      height: (Number(data.height) / 10).toFixed(1) + ' m',
      weight: (Number(data.weight) / 10).toFixed(1) + ' kg',
      front_default_8bit: data.sprites.front_default,
      front_default: data.sprites.other['official-artwork'].front_default,
      front_shiny: data.sprites.other['official-artwork'].front_shiny,
      stats: stats,
      abilities: data.abilities,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * * Parse evolution chain data
 */
const parseEvolutionChain = async (chain: Chain) => {
  const evoChain = [];
  let evoData = chain;

  do {
    const numberOfEvolutions = evoData['evolves_to'].length;

    let pokemonData = await fetchData(POKEAPI_BASE_URL(evoData.species.name));
    let pokemonImage =
      pokemonData.sprites.other['official-artwork'].front_default;

    let item = evoData.evolution_details[0]?.item;
    let itemDetails = null;
    if (item) {
      itemDetails = await fetchData(POKEAPI_ITEM_URL(item.name));
    }

    evoChain.push({
      id: pokemonData.id,
      nationalId: pokemonNationalId(String(pokemonData.id)),
      species_name: capitalizeFirstLetter(evoData.species.name),
      min_level: !evoData ? 1 : evoData.evolution_details[0]?.min_level,
      trigger: !evoData ? null : evoData.evolution_details[0]?.trigger?.name,
      item: itemDetails
        ? { name: item?.name, image: itemDetails.sprites.default }
        : null,
      image: pokemonImage,
    });

    if (numberOfEvolutions > 1) {
      for (let i = 1; i < numberOfEvolutions; i++) {
        pokemonData = await fetchData(
          POKEAPI_BASE_URL(evoData.evolves_to[i].species.name)
        );
        pokemonImage =
          pokemonData.sprites.other['official-artwork'].front_default;

        item = evoData.evolves_to[i].evolution_details[0]?.item;
        itemDetails = null;
        if (item) {
          itemDetails = await fetchData(POKEAPI_ITEM_URL(item.name));
        }

        evoChain.push({
          id: pokemonData.id,
          nationalId: pokemonNationalId(String(pokemonData.id)),
          species_name: capitalizeFirstLetter(
            evoData.evolves_to[i].species.name
          ),
          min_level: !evoData.evolves_to[i]
            ? 1
            : evoData.evolves_to[i].evolution_details[0].min_level,
          trigger: !evoData.evolves_to[i]
            ? null
            : evoData?.evolves_to[i]?.evolution_details[0]?.trigger?.name,
          item: itemDetails
            ? { name: item?.name, image: itemDetails.sprites.default }
            : null,
          image: pokemonImage,
        });
      }
    }

    //@ts-ignore
    evoData = evoData['evolves_to'][0];
  } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

  return evoChain;
};

/**
 * * Fetch pokemon species or details
 */
const fetchPokemonSpecies = async (
  url: string
): Promise<PokemonDetails | null> => {
  try {
    const data = await fetchData(url);
    const [mainPokemon, varieties, evolutionData] = await Promise.all([
      fetchPokemonMain(data.id),
      Promise.all(
        data.varieties.map((entry: any) =>
          fetchPokemonVarieties(entry.pokemon.url)
        )
      ),
      fetchData(data.evolution_chain.url),
    ]);
    const evolutionChain = await parseEvolutionChain(evolutionData.chain);

    return {
      ...mainPokemon,
      varieties,
      evolutionChain,
      weaknesses: mainPokemon?.weaknesses,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GET = async (
  req: NextRequest,
  context: { params: { search: string } }
) => {
  try {
    const pokemonResults = await fetchPokemonSpecies(
      POKEAPI_SPECIES_URL(context?.params?.search)
    );

    return NextResponse.json({
      message: 'Fetch pokemon success',
      data: pokemonResults,
    });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch pokemon. Please try again later', {
      status: 500,
    });
  }
};
