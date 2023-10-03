export interface PokemonDetails {
  varieties: any[];
  evolutionChain: {
    id: any;
    nationalId: string;
    species_name: string;
    min_level: any;
    trigger: any;
    item: {
      name: any;
      image: any;
    } | null;
    image: any;
  }[];
  weaknesses: string[] | undefined;
}

export interface MainPokemon {
  id: number;
  nationalId: string;
  name: string;
  pokemonGenera: string;
  nameJaHrkt: string;
  front_default_8bit: string;
  front_default: string;
  front_shiny: string;
  types: PokemonType[];
  prev_next: PrevNextPokemon[];
  abilities: Ability[];
  weaknesses: string[];
  resistances: string[];
  immunities: string[];
  effectives: string[];
  allEnFlavorText: FlavorText[];
  moves: Move[];
}

export interface Ability {
  abilitiy: [name: string, url: string];
  is_hidden: boolean;
  slot: number;
}

export interface FlavorText {
  flavor_text: string;
  name: string;
  url: string;
}

export interface PrevNextPokemon {
  id: number | null;
  nationalId: string | null;
  name: string | null;
  type: 'prev' | 'next';
  sprite_front_default: string | null;
  isAvailable: boolean;
}

export interface TypeName {
  name: string;
}

export interface Type {
  type: TypeName;
}

export interface DamageRelations {
  double_damage_from: TypeName[];
  half_damage_from: TypeName[];
  no_damage_from: TypeName[];
  double_damage_to: TypeName[];
}

export interface TypeData {
  weakTypes: string[];
  resistantTypes: string[];
  immuneTypes: string[];
  effectiveTypes: string[];
}

export interface PokemonData {
  types: Type[];
}

export interface CollectedTypeData {
  weaknesses: string[];
  resistances: string[];
  immunities: string[];
  effectives: string[];
}

export interface PokemonType {
  name: string;
}

export interface MoveData {
  name: string;
  url: string;
  flavor_text: string | null;
}

export interface Move {
  name: string;
  url: string;
}

export interface Moves {
  move: Move;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: { name: string };
  version: { name: string; url: string };
}

export interface SpeciesData {
  flavor_text_entries: FlavorTextEntry[];
  nameJaHrkt: string;
  pokemonGenera: string;
  allEnFlavorText: {
    flavor_text: string;
    name: string;
    url: string;
  }[];
}

export interface Stats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface Species {
  name: string;
}

export interface Trigger {
  name: string;
}

export interface Item {
  name: string;
}

export interface EvolutionDetails {
  min_level: number;
  item?: Item;
  trigger?: Trigger;
}

export interface EvolvesTo {
  species: Species;
  evolution_details: EvolutionDetails[];
  evolves_to?: EvolvesTo[];
}

export interface Chain {
  species: Species;
  evolves_to: EvolvesTo[];
  evolution_details: EvolutionDetails[];
}

export interface Sprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonData {
  id: number;
  sprites: Sprites;
}
