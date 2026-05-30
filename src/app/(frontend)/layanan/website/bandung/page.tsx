import type { Metadata } from 'next'

import { buildMetadata } from '@/lib/page-metadata'
import { CITIES } from '@/content/cities'
import CityWebsitePage from '../_components/CityWebsitePage'

const city = CITIES.bandung
const PATH = `/layanan/website/${city.slug}`

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: city.meta.title,
    description: city.meta.description,
    path: PATH,
    keywords: city.meta.keywords,
    hasGeneratedOgImage: true,
  })
}

export default function BandungWebsitePage() {
  return <CityWebsitePage city={city} />
}
