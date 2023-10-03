'use client';
import PokemonTabs from '@/components/PokemonTabs';
import { lowerCase } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiSolidChevronsLeft, BiSolidChevronsRight } from 'react-icons/bi';
import PokemonStats from './PokemonStats';
import PokemonTypeBadge from './PokemonTypeBadge';
import { capitalizeFirstLetter } from '@/libs/reusableFunctions';
import {
  AbilityProps,
  Ability,
  VarietiesProps,
  PokemonDetailsProps,
  Evolution,
} from '@/typings';

function Abilities({ abilities }: AbilityProps) {
  return abilities.map((entry: Ability, index) => {
    const abilityName = capitalizeFirstLetter(entry.ability.name);
    return (
      <p key={index}>
        <strong>{entry.is_hidden ? 'Hidden: ' : 'Abilities: '}</strong>
        {abilityName}
      </p>
    );
  });
}

function Varieties({
  varieties,
  setCurrentVariety,
  setIsShiny,
  shiny,
  selected,
}: VarietiesProps) {
  const [selectedVarietyId, setSelectedVarietyId] = useState<number | null>(
    null
  );

  return varieties
    .filter((variety) => variety.front_shiny)
    .map((variety) => {
      return (
        <div
          key={variety.id}
          onClick={() => {
            setCurrentVariety(variety);
            setIsShiny(shiny ? variety.front_shiny : variety.front_default);
            setSelectedVarietyId(variety.id);
          }}
        >
          <button
            className={`rounded-lg px-2 py-1 font-mono italic text-neutral-800 ${
              variety.front_default == selected ||
              variety.front_shiny == selected
                ? 'bg-blue-400'
                : 'bg-blue-200'
            }`}
          >
            {shiny ? '✨ ' : ''} {capitalizeFirstLetter(variety.name)}
          </button>
        </div>
      );
    });
}

export default function PokemonDetails({ data }: PokemonDetailsProps) {
  const [currentVariety, setCurrentVariety] = useState(data.varieties[0]);
  const [isShiny, setIsShiny] = useState(currentVariety.front_default);

  return (
    <div className='p-4'>
      <div className='mb-4 flex justify-between space-x-2'>
        <div className='flex-grow'>
          {data?.prev_next[0]?.name ? (
            <Link
              href={`${lowerCase(data?.prev_next[0]?.name).replace(
                /\s+/g,
                '-'
              )}`}
            >
              <button className='flex items-center space-x-2 rounded-xl border-2 border-neutral-800 bg-slate-50 px-6 py-2 font-bold text-neutral-800 transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:bg-[#cde41e] hover:shadow-[2px_2px_0px_#222222]'>
                <span>
                  <BiSolidChevronsLeft className='h-5 w-5 font-bold' />
                </span>
                <span>{`${data?.prev_next[0].name} #${data?.prev_next[0].nationalId}`}</span>
              </button>
            </Link>
          ) : null}
        </div>

        <div className='flex-grow'>
          {data?.prev_next[1]?.name ? (
            <Link
              href={`${lowerCase(data?.prev_next[1]?.name).replace(
                /\s+/g,
                '-'
              )}`}
            >
              <button className='float-right flex items-center space-x-2 rounded-xl border-2 border-neutral-800 bg-slate-50 px-6 py-2 font-bold text-neutral-800 transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:bg-[#cde41e] hover:shadow-[2px_2px_0px_#222222]'>
                <span>{`${data?.prev_next[1].name} #${data?.prev_next[1].nationalId}`}</span>
                <span>
                  <BiSolidChevronsRight className='h-5 w-5 font-bold' />
                </span>
              </button>
            </Link>
          ) : null}
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2'>
        <div>
          <div className='flex flex-col items-center space-y-2'>
            <div className='space-y-4'>
              <h1 className='text-5xl font-bold'>
                {data?.name} #{data?.nationalId}
              </h1>
              <h2 className='text-4xl font-semibold'>{data?.nameJaHrkt}</h2>
              <p className='text-xl italic'>{data?.enFlavorText}</p>
            </div>

            <Image
              src={isShiny}
              width={400}
              height={400}
              alt=''
              quality={100}
              priority
            />
            <h3 className='text-2xl font-semibold'>{data.pokemonGenera}</h3>
            <div className='flex flex-col items-center space-y-2'>
              <span className='flex space-x-2'>
                {currentVariety.types?.map((type: string, index: number) => (
                  <PokemonTypeBadge key={index} type={type} />
                ))}
              </span>
              <div className='grid grid-cols-2 gap-4'>
                <p>
                  <strong>Height:</strong> {currentVariety.height}
                </p>
                <p>
                  <strong>Weight:</strong> {currentVariety.weight}
                </p>
                <Abilities abilities={currentVariety.abilities} />
              </div>
            </div>

            <div className='flex flex-col items-center'>
              <p className='mt-4 text-xl font-bold'>Pokémon Varieties</p>
              <div className='grid grid-cols-2 gap-2'>
                <div className='space-y-2'>
                  <h1>
                    <span className='font-bold'>Default Varieties</span>
                  </h1>
                  <Varieties
                    varieties={data.varieties}
                    setCurrentVariety={setCurrentVariety}
                    setIsShiny={setIsShiny}
                    shiny={false}
                    selected={isShiny}
                  />
                </div>

                <div className='space-y-2'>
                  <h1>
                    <span className='font-bold'>Shiny Varieties ✨</span>
                  </h1>

                  <Varieties
                    varieties={data.varieties}
                    setCurrentVariety={setCurrentVariety}
                    setIsShiny={setIsShiny}
                    shiny={true}
                    selected={isShiny}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='text-2xl font-semibold'>
            <div className='flex items-center space-x-2'>
              <h3>Pokémon Stats</h3>
              <Image
                src={data.front_default_8bit}
                height={60}
                width={60}
                alt={''}
              />
            </div>
            <PokemonStats stats={currentVariety.stats} />
          </div>

          <hr />

          <div className='space-y-2'>
            <h4 className='text-lg font-semibold tracking-wider'>
              Effective against:{' '}
            </h4>
            <div className='flex space-x-2'>
              {data?.effectives.length > 0
                ? data?.effectives?.map((j: string, index: number) => (
                    <PokemonTypeBadge key={index} type={j} />
                  ))
                : '-'}
            </div>
          </div>

          <div className='space-y-2'>
            <h4 className='text-lg font-semibold tracking-wider'>
              Immune against:{' '}
            </h4>
            <div className='flex space-x-2'>
              {data?.immunities.length > 0
                ? data?.immunities?.map((j: string, index: number) => (
                    <PokemonTypeBadge key={index} type={j} />
                  ))
                : '-'}
            </div>
          </div>

          <div className='space-y-2'>
            <h4 className='text-lg font-semibold tracking-wider'>
              Resistant against:{' '}
            </h4>
            <span className='flex space-x-2'>
              {data?.resistances.length > 0
                ? data?.resistances?.map((j: string, index: number) => (
                    <PokemonTypeBadge key={index} type={j} />
                  ))
                : '-'}
            </span>
          </div>

          <div className='space-y-2'>
            <h4 className='text-lg font-semibold tracking-wider'>
              Weak against:{' '}
            </h4>
            <div className='flex space-x-2'>
              {data?.weaknesses.length > 0
                ? data?.weaknesses?.map((j: string, index: number) => (
                    <PokemonTypeBadge key={index} type={j} />
                  ))
                : '-'}
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <p className='mb-2 mt-4 text-3xl font-bold'>Evolutions</p>

        <div className='grid grid-cols-3 gap-4 p-4'>
          {data.evolutionChain.map((evolution: Evolution, index) => (
            <div key={index} className='flex flex-col p-4'>
              {data.evolutionChain.length === 1 ? (
                <p>This Pokémon does not evolve.</p>
              ) : null}
              <Link
                href={`/pokemon/${lowerCase(evolution.species_name).replace(
                  /\s+/g,
                  '-'
                )}`}
              >
                <Image
                  src={evolution.image}
                  alt={evolution.species_name}
                  height={200}
                  width={200}
                />
              </Link>
              <h1 className='text-sm font-bold md:text-lg'>
                {evolution.species_name} #{evolution.nationalId}
              </h1>
              <div className='text-sm md:text-lg'>
                <h2>
                  {evolution.trigger ? 'Trigger: ' + evolution.trigger : null}
                </h2>
                <h2>
                  {evolution.min_level ? 'Level: ' + evolution.min_level : null}
                </h2>
                <div className='flex space-x-1'>
                  <span>
                    {evolution.item ? 'Item: ' + evolution.item.name : null}
                  </span>
                  {evolution.item ? (
                    <Image
                      src={evolution?.item?.image}
                      alt={evolution?.item?.name}
                      height={30}
                      width={30}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col'>
        <PokemonTabs indicies={data?.allEnFlavorText} moves={data?.moves} />
      </div>
    </div>
  );
}
