export interface ArtworkImage {
  src: string;
  caption: string;
}

export interface Artwork {
  slug: string;
  name: string;
  // Grid thumbnail.
  card: string;
  // Optional second thumbnail the card fades to on hover (e.g. the painting shown in a room).
  cardHover?: string;
  // Gallery on the artwork's page, first image shown first.
  images: ArtworkImage[];
  // Optional facts shown beside the gallery, e.g. medium and size.
  details?: { label: string; value: string }[];
}

export interface Collection {
  slug: string;
  title: string;
  intro: string;
  feature: { src: string; alt: string };
  // Used in "7 portraits", "More pet portraits", "All pet portraits".
  noun: { singular: string; plural: string };
  // Small labels shown above an artwork's name (e.g. "Original artwork").
  tags?: string[];
  // "cover" fills a square tile; "contain" shows the whole painting (for unusual shapes).
  cardFit: 'cover' | 'contain';
  // Show the "Commission a pet portrait" section.
  commission: boolean;
  artworks: Artwork[];
}
