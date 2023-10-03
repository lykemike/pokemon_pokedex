'use client';
import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { Tabs } from '@/typings';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function sanitizeFlavorText(text: string) {
  const sanitizedText = text.replace(/[\n\f]/g, ' ');
  return sanitizedText;
}

export default function Example({ indicies, moves }: Tabs) {
  let [categories] = useState({
    Indicies: [...indicies],
    Moves: [...moves],
  });

  return (
    <div className='w-full max-w-7xl px-2 py-16 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className='mb-2 grid grid-cols-5 gap-2 border border-neutral-400 shadow sm:rounded-lg'
                  >
                    <div className='col-span-1 whitespace-normal px-6 py-4 text-sm'>
                      {post.name}
                    </div>
                    <div className='col-span-4 whitespace-normal px-6 py-4 text-sm'>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: sanitizeFlavorText(String(post.flavor_text)),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
