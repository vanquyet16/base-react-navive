/**
 * HOME TYPES
 * ==========
 */

export interface HomeSection {
  id: string;
  title: string;
  type: HomeSectionType;
}

export type HomeSectionType = 'news' | 'services' | 'banner' | 'shortcuts';
