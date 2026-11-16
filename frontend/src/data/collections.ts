import { petPortraits } from './petPortraits';
import { womenInAbstract } from './womenInAbstract';

// The collection pages are only reachable from the hidden preview home page at /test for now.
export const PREVIEW_HOME = '/test';
export const COLLECTIONS_BASE = `${PREVIEW_HOME}/collections`;

// Collections that have their own pages, at /test/collections/<slug>.
export const galleryCollections = [petPortraits, womenInAbstract];
