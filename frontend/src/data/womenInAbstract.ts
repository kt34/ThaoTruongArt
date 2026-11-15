import type { Artwork, Collection } from './types';

// Women in Abstract, from the "Women figures collection" deck (slides 2–9).
const dir = '/images/women-in-abstract';

const figure = (n: number, size: string): Artwork => ({
  slug: `women-figure-${n}`,
  name: `Women Figure #${n}`,
  card: `${dir}/figure-${n}-card.jpg`,
  cardHover: `${dir}/figure-${n}-room-card.jpg`,
  images: [
    { src: `${dir}/figure-${n}.jpg`, caption: 'The painting' },
    { src: `${dir}/figure-${n}-room.jpg`, caption: 'Shown in a room (for display only, not to scale)' },
  ],
  details: [
    { label: 'Medium', value: 'Acrylic' },
    { label: 'Size', value: size },
  ],
});

export const womenInAbstract: Collection = {
  slug: 'women-in-abstract',
  title: 'Women in Abstract',
  intro: 'Original acrylic paintings of the female figure, from Thao’s exhibition collection.',
  feature: { src: `${dir}/figure-7-room.jpg`, alt: 'Women Figure #7 framed on a living room wall' },
  noun: { singular: 'artwork', plural: 'artworks' },
  tags: ['Original artwork', 'Exhibition collection'],
  cardFit: 'contain',
  commission: false,
  artworks: [
    figure(1, '50 × 60 × 3 cm'),
    figure(2, '50 × 60 × 3 cm'),
    figure(3, '50 × 100 × 1.5 cm'),
    figure(4, '55 × 60 × 3 cm'),
    figure(5, '60 × 60 × 3 cm'),
    figure(6, '55 × 60 × 3 cm'),
    figure(7, '60 × 76 × 3 cm'),
  ],
};
