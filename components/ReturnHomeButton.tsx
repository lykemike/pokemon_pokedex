import Link from 'next/link';
import React from 'react';
import { AiFillHome } from 'react-icons/ai';

export default function ReturnHomeButton() {
  return (
    <div className='p-2'>
      <Link href={'/'}>
        <span className=' items-center justify-center'>
          <button className='rounded-xl border-2 border-neutral-800 bg-slate-50 px-2 py-2 font-bold text-neutral-800 transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:bg-[#cde41e] hover:shadow-[2px_2px_0px_#222222]'>
            <AiFillHome className='h-6 w-6' />
          </button>
        </span>
      </Link>
    </div>
  );
}
