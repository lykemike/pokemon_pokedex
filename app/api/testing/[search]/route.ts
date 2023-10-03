import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  return NextResponse.json({ message: 'Fetch pokemon success' });
};

// interface PokemonType {
//   pokemon_type: string;
// }

// interface PokemonDetails {
//   id: number;
//   name: string;
//   types: PokemonType[];
//   weight: string;
//   height: string;
//   front_default: string;
//   stats: string;
//   enFlavorText: string;
//   nameJaHrkt: string;
//   pokemonGenera: string;
//   abilities: string;
// }

// const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

// const pokemonNationalId = (str: string): string => (str.length === 2 ? "0" + str : str.length === 1 ? "00" + str : str);

// const fetchData = async (url: string) => {
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// };

// function capitalizeAndReplaceHyphen(str: string) {
//   if (!str) return ""; // if str is null or undefined, return an empty string

//   // Replace hyphen with space
//   str = str.replace(/-/g, " ");

//   // Capitalize first character of each word
//   return str
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// }

// const fetchPokemonMain = async (id: string) => {
//   const versionOrder = [
//     "red",
//     "blue",
//     "yellow",
//     "gold",
//     "silver",
//     "crystal",
//     "ruby",
//     "sapphire",
//     "emerald",
//     "fire-red",
//     "leaf-green",
//     "diamond",
//     "pearl",
//     "platinum",
//     "heart-gold",
//     "soul-silver",
//     "black",
//     "white",
//     "black-2",
//     "white-2",
//     "x",
//     "y",
//     "omega-ruby",
//     "alpha-sapphire",
//     "lets-go-pikachu",
//     "lets-go-eevee",
//     "sword",
//     "shield",
//     "brilliant-diamond",
//     "shining-pearl",
//   ];

//   try {
//     const data = await fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`);

//     let prevPokemon = null;
//     let nextPokemon = null;
//     if (Number(id) > 1) {
//       prevPokemon = await fetchData(`https://pokeapi.co/api/v2/pokemon/${Number(id) - 1}`);
//     }
//     if (Number(id) < 898) {
//       nextPokemon = await fetchData(`https://pokeapi.co/api/v2/pokemon/${Number(id) + 1}`);
//     }

//     let pokemonPrevNext = [
//       {
//         id: prevPokemon?.id || null,
//         nationalId: pokemonNationalId(String(prevPokemon?.id)),
//         name: prevPokemon ? capitalizeFirstLetter(prevPokemon.name) : null,
//         type: "prev",
//         sprite_front_default: prevPokemon?.sprites.front_default || null,
//         isAvailable: !!prevPokemon,
//       },
//       {
//         id: nextPokemon?.id || null,
//         nationalId: pokemonNationalId(String(nextPokemon?.id)),
//         name: nextPokemon ? capitalizeFirstLetter(nextPokemon.name) : null,

//         type: "next",
//         sprite_front_default: nextPokemon?.sprites.front_default || null,
//         isAvailable: !!nextPokemon,
//       },
//     ];

//     const types: PokemonType[] = data.types.map((type: { type: { name: string } }) =>
//       capitalizeFirstLetter(type.type.name)
//     );

//     // New code to fetch type details and extract weaknesses
//     let weaknesses: string[] = [];
//     let resistances: string[] = [];
//     let immunities: string[] = [];
//     let effectives: string[] = [];
//     for (const type of data.types) {
//       const typeData = await fetchData(`https://pokeapi.co/api/v2/type/${type.type.name}`);
//       const weakTypes = typeData.damage_relations.double_damage_from.map((type: { name: string }) =>
//         capitalizeFirstLetter(type.name)
//       );
//       const resistantTypes = typeData.damage_relations.half_damage_from.map((type: { name: string }) =>
//         capitalizeFirstLetter(type.name)
//       );
//       const immuneTypes = typeData.damage_relations.no_damage_from.map((type: { name: string }) =>
//         capitalizeFirstLetter(type.name)
//       );
//       const effectiveTypes = typeData.damage_relations.double_damage_to.map((type: { name: string }) =>
//         capitalizeFirstLetter(type.name)
//       );

//       weaknesses.push(...weakTypes);
//       resistances.push(...resistantTypes);
//       immunities.push(...immuneTypes);
//       effectives.push(...effectiveTypes);

//       weaknesses = Array.from(new Set(weaknesses));
//       resistances = Array.from(new Set(resistances));
//       immunities = Array.from(new Set(immunities));
//       effectives = Array.from(new Set(effectives));
//     }

//     const responsePokemonSpecies = await fetchData(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
//     const { flavor_text_entries, names, genera, color } = responsePokemonSpecies;

//     const enFlavorText = flavor_text_entries?.filter((data: any) => data.language.name == "en")[0].flavor_text;

//     const nameJaHrkt = names?.filter((data: any) => data.language.name == "ja-Hrkt")[0].name;
//     const pokemonGenera = genera?.filter((data: any) => data.language.name == "en")[0].genus;

//     const moves = await Promise.all(
//       data.moves.map(async (move: { move: { name: string; url: string } }) => {
//         // Fetch the move details
//         const moveData = await fetchData(move.move.url);

//         // Find the first flavor text entry in English
//         const enFlavorText = moveData.flavor_text_entries?.find((entry: any) => entry.language.name === "en");

//         // Return the move name and flavor text
//         return {
//           name: capitalizeAndReplaceHyphen(move.move.name),
//           url: move.move.url,
//           flavor_text: enFlavorText ? enFlavorText.flavor_text : null,
//         };
//       })
//     );

//     let allEnFlavorText = flavor_text_entries
//       .filter((entry: any) => entry.language.name === "en")
//       .map((entry: any) => ({
//         flavor_text: entry.flavor_text,

//         name: capitalizeAndReplaceHyphen(entry.version.name),
//         url: entry.version.url,
//       }));

//     // allEnFlavorText = allEnFlavorText.sort((a, b) => {
//     //   return versionOrder.indexOf(a.version.name) - versionOrder.indexOf(b.version.name);
//     // });

//     return {
//       id: data.id,
//       nationalId: pokemonNationalId(String(data.id)),
//       name: capitalizeFirstLetter(data.name),
//       pokemonGenera,
//       nameJaHrkt,
//       front_default: data.sprites.other["official-artwork"].front_default,
//       front_shiny: data.sprites.other["official-artwork"].front_shiny,
//       types,
//       prev_next: pokemonPrevNext,
//       abilities: data.abilities,
//       weaknesses,
//       resistances,
//       immunities,
//       effectives,
//       allEnFlavorText,
//       moves,
//     };
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// const fetchPokemonVarieties = async (url: string) => {
//   try {
//     const data = await fetchData(url);

//     const stats = data.stats.map((stats: any) => {
//       return { base_stat: stats.base_stat, stat_name: stats.stat.name };
//     });

//     const types: PokemonType[] = data.types.map((type: { type: { name: string } }) =>
//       capitalizeFirstLetter(type.type.name)
//     );

//     return {
//       id: data.id,
//       name: data.name,
//       types,
//       height: (Number(data.height) / 10).toFixed(1) + " m",
//       weight: (Number(data.weight) / 10).toFixed(1) + " kg",
//       front_default: data.sprites.other["official-artwork"].front_default,
//       front_shiny: data.sprites.other["official-artwork"].front_shiny,
//       stats: stats,
//       abilities: data.abilities,
//     };
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// const parseEvolutionChain = async (chain: any) => {
//   const evoChain = [];
//   let evoData = chain;

//   do {
//     const numberOfEvolutions = evoData["evolves_to"].length;

//     let pokemonData = await fetchData(`https://pokeapi.co/api/v2/pokemon/${evoData.species.name}`);
//     let pokemonImage = pokemonData.sprites.other["official-artwork"].front_default;

//     let item = evoData.evolution_details[0]?.item;
//     let itemDetails = null;
//     if (item) {
//       itemDetails = await fetchData(`https://pokeapi.co/api/v2/item/${item.name}`);
//     }

//     evoChain.push({
//       id: pokemonData.id, // Push the Pokemon's id
//       nationalId: pokemonNationalId(String(pokemonData.id)),
//       species_name: capitalizeFirstLetter(evoData.species.name),
//       min_level: !evoData ? 1 : evoData.evolution_details[0]?.min_level,
//       trigger: !evoData ? null : evoData.evolution_details[0]?.trigger?.name,
//       item: itemDetails ? { name: item.name, image: itemDetails.sprites.default } : null,
//       image: pokemonImage,
//     });

//     if (numberOfEvolutions > 1) {
//       for (let i = 1; i < numberOfEvolutions; i++) {
//         pokemonData = await fetchData(`https://pokeapi.co/api/v2/pokemon/${evoData.evolves_to[i].species.name}`);
//         pokemonImage = pokemonData.sprites.other["official-artwork"].front_default;

//         item = evoData.evolves_to[i].evolution_details[0]?.item;
//         itemDetails = null;
//         if (item) {
//           itemDetails = await fetchData(`https://pokeapi.co/api/v2/item/${item.name}`);
//         }

//         evoChain.push({
//           id: pokemonData.id, // Push the Pokemon's id
//           nationalId: pokemonNationalId(String(pokemonData.id)),
//           species_name: capitalizeFirstLetter(evoData.evolves_to[i].species.name),
//           min_level: !evoData.evolves_to[i] ? 1 : evoData.evolves_to[i].evolution_details[0].min_level,
//           trigger: !evoData.evolves_to[i] ? null : evoData.evolves_to[i].evolution_details[0].trigger.name,
//           item: itemDetails ? { name: item.name, image: itemDetails.sprites.default } : null,
//           image: pokemonImage,
//         });
//       }
//     }
//     evoData = evoData["evolves_to"][0];
//   } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

//   return evoChain;
// };

// const fetchPokemonSpecies = async (url: string): Promise<PokemonDetails | null> => {
//   try {
//     const data = await fetchData(url);
//     const [mainPokemon, varieties, evolutionData] = await Promise.all([
//       fetchPokemonMain(data.id),
//       Promise.all(data.varieties.map((entry: any) => fetchPokemonVarieties(entry.pokemon.url))),
//       fetchData(data.evolution_chain.url),
//     ]);
//     const evolutionChain = await parseEvolutionChain(evolutionData.chain);

//     return {
//       ...mainPokemon,
//       varieties,
//       evolutionChain,
//       weaknesses: mainPokemon?.weaknesses,
//     };
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// export const GET = async (req: NextRequest, context: { params: { search: string } }) => {
//   try {
//     const pokemonResults = await fetchPokemonSpecies(
//       `https://pokeapi.co/api/v2/pokemon-species/${context?.params?.search}`
//     );

//     return NextResponse.json({ message: "Fetch pokemon success", data: pokemonResults });
//   } catch (error) {
//     console.error(error);
//     return new Response("Failed to fetch pokemon. Please try again later", { status: 500 });
//   }
// };
