import Link from 'next/link';
import React from 'react';
import { AiFillApi, AiFillLinkedin, AiFillRocket } from 'react-icons/ai';
export default function Footer() {
  return (
    <footer className='sticky top-[100vh] flex h-10 items-center justify-center rounded-t-3xl bg-neutral-800 p-8 text-white'>
      <div className='mx-auto max-w-7xl'>
        <div className='flex items-center justify-center space-x-2'>
          <AiFillApi className='h-6 w-6 text-white' />
          <p>API by: </p>
          <Link href='https://pokeapi.co/' className='text-yellow-300'>
            PokéAPI
          </Link>
        </div>

        <div className='flex items-center space-x-2'>
          <AiFillRocket className='h-6 w-6 text-white' />
          <p>Made by: Mike</p>
        </div>
      </div>
    </footer>
  );
}
