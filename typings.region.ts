export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonType {
  pokemon_type: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: PokemonType[];
  weight: string;
  height: string;
  front_default: string;
  abilities: string;
}
