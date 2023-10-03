const colours = {
  normal: 'bg-[#A8A77A]',
  fire: 'bg-[#f08030]',
  water: 'bg-[#6390F0]',
  electric: 'bg-[#F7D02C]',
  grass: 'bg-[#7AC74C]',
  ice: 'bg-[#96D9D6]',
  fighting: 'bg-[#C22E28]',
  poison: 'bg-[#A33EA1]',
  ground: 'bg-[#E2BF65]',
  flying: 'bg-[#a890f0]',
  psychic: 'bg-[#F95587]',
  bug: 'bg-[#A6B91A]',
  rock: 'bg-[#B6A136]',
  ghost: 'bg-[#735797]',
  dragon: 'bg-[#7038f8]',
  dark: 'bg-[#705746]',
  steel: 'bg-[#B7B7CE]',
  fairy: 'bg-[#D685AD]',
};

export default function PokemonTypeBadge({ type }: { type: string }) {
  // @ts-ignore
  const bgColor = colours[type.toLowerCase()];

  return (
    <span
      className={`rounded-md px-4 py-1 text-sm font-semibold uppercase tracking-widest text-white ${bgColor}`}
    >
      {type}
    </span>
  );
}
