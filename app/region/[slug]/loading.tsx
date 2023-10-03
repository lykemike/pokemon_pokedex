import Balancer from 'react-wrap-balancer';

const loadingText = [
  {
    id: 1,
    text: 'Catching all Pokémons...',
  },
  {
    id: 2,
    text: "Training Pikachu's Thunderbolt...",
  },
  {
    id: 3,
    text: 'Evolving Eevee into something cool...',
  },
  {
    id: 4,
    text: "Searching for Mewtwo's secret hideout...",
  },
  {
    id: 5,
    text: 'Hatching a batch of Pokémon eggs...',
  },
  {
    id: 6,
    text: 'Preparing Pokéballs for a catching spree...',
  },
  {
    id: 7,
    text: 'Exploring the tall grass for wild encounters...',
  },
  {
    id: 8,
    text: 'Challenging the Elite Four for the umpteenth time...',
  },
  {
    id: 9,
    text: 'Trading Magikarp for a legendary (not really)...',
  },
  {
    id: 10,
    text: 'Mixing Pokéblocks for Pokémon contests...',
  },
  {
    id: 11,
    text: 'Following the mysterious footprints of Unown...',
  },
  {
    id: 12,
    text: 'Solving the puzzle of the Ruins of Alph...',
  },
  {
    id: 13,
    text: 'Battling Team Rocket and their Meowth...',
  },
  {
    id: 14,
    text: 'Raising a team of cute but formidable Clefairies...',
  },
  {
    id: 15,
    text: 'Tracking the steps of the elusive Entei...',
  },
  {
    id: 16,
    text: 'Trying to figure out what Ditto really looks like...',
  },
  {
    id: 17,
    text: 'Unleashing the power of the Mega Evolution...',
  },
  {
    id: 18,
    text: 'Syncing with the Rotom Dex for an adventure...',
  },
  {
    id: 19,
    text: 'Calling on Lugia from the heart of the ocean...',
  },

  {
    id: 20,
    text: 'Syncing up with Eevee for a Z-Move dance-off...',
  },
];

function pickRandomFromArray(array: any) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export default function PokemonCardLoading() {
  const randomLoadingText = pickRandomFromArray(loadingText);

  return (
    <div className='m-20 mx-auto max-w-7xl'>
      <div className='m-4 flex justify-center text-center'>
        <div className='animate-pulse text-4xl font-bold'>
          <Balancer>{randomLoadingText.text}</Balancer>
        </div>
      </div>
    </div>
  );
}
