// * * PokemonDetails.TSX
type Indicies = { name: string; flavor_text: string }[];
type Moves = { name: string; flavor_text: string }[];

export interface Tabs {
  indicies: Indicies;
  moves: Moves;
}

export interface Ability {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

export interface AbilityProps {
  abilities: Ability[];
}

interface Stat {
  base_stat: number;
  stat_name: string;
}

export interface Variety {
  id: number;
  name: string;
  types: string[];
  height: string;
  weight: string;
  front_default_8bit: string;
  front_default: string;
  front_shiny: string;
  stats: Stat[];
  abilities: Ability[];
}

export interface VarietiesProps {
  varieties: Variety[];
  setCurrentVariety: (variety: Variety) => void;
  setIsShiny: (shiny: string) => void;
  shiny: boolean;
  selected: string;
}

export interface PrevNextPokemon {
  id: number | null;
  nationalId: string | null;
  name: string | null;
  type: 'prev' | 'next';
  sprite_front_default: string | null;
  isAvailable: boolean;
}

export interface Evolution {
  species_name: string;
  nationalId: number;
  image: string;
  trigger?: string;
  min_level?: number;
  item?: {
    name: string;
    image: string;
  };
}

export interface PokemonDetailsProps {
  data: {
    prev_next: PrevNextPokemon[];
    name: string;
    nationalId: number;
    nameJaHrkt: string;
    enFlavorText: string;
    pokemonGenera: string;
    front_default_8bit: string;
    varieties: Variety[];
    effectives: string[];
    immunities: string[];
    resistances: string[];
    weaknesses: string[];
    evolutionChain: Evolution[];
    allEnFlavorText: Indicies;
    moves: Moves;
  };
}
