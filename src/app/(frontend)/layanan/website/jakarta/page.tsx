import type { Metadata } from 'next'

import { generateMetadata as genMeta } from '@/lib/seo'
import { CITIES } from '@/content/cities'
import CityWebsitePage from '../_components/CityWebsitePage'

const city = CITIES.jakarta
const PATH = `/layanan/website/${city.slug}`

export const metadata: Metadata = genMeta({
  title: city.meta.title,
  description: city.meta.description,
  path: PATH,
  keywords: city.meta.keywords,
})

export default function JakartaWebsitePage() {
  return <CityWebsitePage city={city} />
}
