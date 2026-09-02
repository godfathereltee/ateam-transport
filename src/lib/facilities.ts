export interface Facility {
  name: string
  slug: string
  city: string
  state: string
}

export const facilities: Facility[] = [
  { name: 'Marquette Manor', slug: 'marquette-manor', city: 'Indianapolis', state: 'IN' },
  { name: 'Greenwood Meadows', slug: 'greenwood-meadows', city: 'Greenwood', state: 'IN' },
  { name: 'Restoracy of Carmel', slug: 'restoracy-of-carmel', city: 'Carmel', state: 'IN' },
  { name: 'Restoracy of Whitestown', slug: 'restoracy-of-whitestown', city: 'Whitestown', state: 'IN' },
  { name: 'Wellbrook of Carmel', slug: 'wellbrook-of-carmel', city: 'Carmel', state: 'IN' },
  { name: 'Springmill Meadows', slug: 'springmill-meadows', city: 'Indianapolis', state: 'IN' },
  { name: 'Allisonville Meadows', slug: 'allisonville-meadows', city: 'Indianapolis', state: 'IN' },
  { name: 'Castleton Healthcare', slug: 'castleton-healthcare', city: 'Indianapolis', state: 'IN' },
  { name: 'American Village', slug: 'american-village', city: 'Indianapolis', state: 'IN' },
  { name: 'Hamilton Trace', slug: 'hamilton-trace', city: 'Fishers', state: 'IN' },
  { name: 'Harbour Manor', slug: 'harbour-manor', city: 'Indianapolis', state: 'IN' },
  { name: 'Hooverwood', slug: 'hooverwood', city: 'Indianapolis', state: 'IN' },
  { name: 'Five Star Noblesville', slug: 'five-star-noblesville', city: 'Noblesville', state: 'IN' },
  { name: 'Rosegate Village', slug: 'rosegate-village', city: 'Indianapolis', state: 'IN' },
]

export function getFacilityBySlug(slug: string): Facility | undefined {
  return facilities.find(f => f.slug === slug)
}
