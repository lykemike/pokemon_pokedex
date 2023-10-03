'use client'; // Error components must be Client components

import { useEffect } from 'react';
import Link from 'next/link';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='flex h-screen flex-col items-center justify-center p-4'>
      <h2 className='text-5xl font-bold'>Something went wrong! 😑</h2>
      <div className='my-6 flex gap-12'>
        <button
          className='rounded-md bg-green-300 px-4 py-2 font-bold text-neutral-800 hover:bg-green-400'
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
        <div className='rounded-md bg-sky-300 px-4 py-2 font-bold text-neutral-800 hover:bg-sky-400'>
          <Link href={'/'}>Return home 👍</Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
