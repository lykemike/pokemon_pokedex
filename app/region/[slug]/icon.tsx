import { ImageResponse } from 'next/server';

export const size = {
  width: 32,
  height: 32,
};

export default function icon() {
  return new ImageResponse(
    (
      <img
        alt='avatar'
        style={{ borderRadius: '100%' }}
        width='100%'
        height='100%'
        src='https://e7.pngegg.com/pngimages/706/299/png-clipart-pokemon-pokeball-illustration-pikachu-ash-ketchum-pokemon-coloring-book-pokeball-rim-pokemon.png'
      />
    )
  );
}
