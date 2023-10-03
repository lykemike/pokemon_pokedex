'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchPokemon({ region, defaultValue, onSearch }: any) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const searchPlaceholders = [{ id: 10, text: 'Find your next partner...' }];

  function pickRandomFromArray(array: any) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  const randomPlaceholder = pickRandomFromArray(searchPlaceholders);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(search);
    router.push(`/region/${region}?search=${search}`);
  };

  return (
    <form className='flex space-x-4' onSubmit={handleSubmit}>
      <div className='relative h-10 text-center'>
        {/* <span className='absolute left-0 top-0 mt-1 h-full w-full rounded-lg bg-neutral-800'></span> */}
        <input
          placeholder={randomPlaceholder.text}
          className='fold-bold relative inline-block h-10 w-full rounded-lg border-2 border-neutral-800 px-4 py-2 text-base font-bold placeholder:text-sm placeholder:italic focus:outline-none'
          onChange={(e) => setSearch(e.target.value)}
          defaultValue={defaultValue}
        />
      </div>

      <button
        type='submit'
        className='rounded-lg border-2 border-neutral-800 bg-slate-50 px-4 py-1 font-bold  uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:bg-[#cde41e] hover:shadow-[2px_2px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none'
      >
        Search
      </button>
    </form>
  );
}
