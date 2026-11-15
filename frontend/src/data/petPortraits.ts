import type { Artwork, Collection } from './types';

// Pet Portraits, in the order of the "Pets' Portrait collection" deck.
const dir = '/images/pet-portraits';

const portraits: Artwork[] = [
  {
    slug: 'mame-the-cub',
    name: 'Mame the Cub',
    card: `${dir}/mame-card.jpg`,
    images: [
      { src: `${dir}/mame-painting.jpg`, caption: 'The painting' },
      { src: `${dir}/mame-closeup.jpg`, caption: 'Close-up detail' },
      { src: `${dir}/mame-easel.jpg`, caption: 'On the easel' },
    ],
  },
  {
    slug: 'bo-the-pug',
    name: 'Bơ the Pug',
    card: `${dir}/bo-card.jpg`,
    images: [
      { src: `${dir}/bo-painting.jpg`, caption: 'The painting' },
      { src: `${dir}/bo-closeup.jpg`, caption: 'Close-up detail' },
      { src: `${dir}/bo-easel.jpg`, caption: 'On the easel' },
    ],
  },
  {
    slug: 'jessie',
    name: 'Jessie',
    card: `${dir}/jessie-card.jpg`,
    images: [
      { src: `${dir}/jessie-painting.jpg`, caption: 'The painting' },
      { src: `${dir}/jessie-closeup.jpg`, caption: 'Close-up detail' },
      { src: `${dir}/jessie-easel.jpg`, caption: 'On the easel' },
    ],
  },
  {
    slug: 'atom-and-cosmo',
    name: 'Atom & Cosmo',
    card: `${dir}/atom-cosmo-card.jpg`,
    images: [
      { src: `${dir}/atom-cosmo.jpg`, caption: 'The painting' },
      { src: `${dir}/atom-cosmo-closeup-1.jpg`, caption: 'Close-up detail' },
      { src: `${dir}/atom-cosmo-closeup-2.jpg`, caption: 'Close-up detail' },
    ],
  },
  {
    slug: 'the-awesome-three',
    name: 'The Awesome Three',
    card: `${dir}/awesome-three-card.jpg`,
    images: [
      { src: `${dir}/awesome-three-painting.jpg`, caption: 'The painting' },
      { src: `${dir}/awesome-three-easel.jpg`, caption: 'On the easel' },
    ],
  },
  {
    slug: 'trixy',
    name: 'Trixy',
    card: `${dir}/trixy-card.jpg`,
    images: [{ src: `${dir}/trixy.jpg`, caption: 'The painting' }],
  },
  {
    slug: 'guinea-pigs',
    name: 'Guinea Pigs',
    card: `${dir}/guinea-pigs-card.jpg`,
    images: [{ src: `${dir}/guinea-pigs.jpg`, caption: 'The painting' }],
  },
];

export const petPortraits: Collection = {
  slug: 'pet-portraits',
  title: 'Pet Portraits',
  intro:
    'Celebrate the special bond you share with your beloved pet through a custom portrait that captures their unique personality, charm, and spirit.',
  feature: {
    src: `${dir}/awesome-three-easel.jpg`,
    alt: 'The Awesome Three, a pet portrait of a dog and two cats, on an easel in the studio',
  },
  noun: { singular: 'portrait', plural: 'portraits' },
  cardFit: 'cover',
  commission: true,
  artworks: portraits,
};
