import { MapPin } from 'lucide-react'
import type { CityData } from '@/content/cities'

interface CityLocalProps {
  local: CityData['local']
}

export default function CityLocal({ local }: CityLocalProps) {
  return (
    <section aria-labelledby="city-local-heading" className="py-20 lg:py-32 bg-[#F9FAFB]">
      <div className="container-wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-5">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            {local.eyebrow}
          </span>
          <h2
            id="city-local-heading"
            className="text-3xl lg:text-5xl font-bold text-[#111827] tracking-tight mb-6"
          >
            {local.headline}{' '}
            <span className="text-[#6B7280] font-medium">{local.headlineMuted}</span>
          </h2>
          <p className="text-base lg:text-lg text-[#6B7280] leading-relaxed">{local.intro}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-[#111827] mb-4">{local.areasTitle}</h3>
            <ul className="flex flex-wrap gap-2">
              {local.areas.map((area) => (
                <li
                  key={area}
                  className="px-3 py-1.5 rounded-full bg-[#F3F4F6] text-[#374151] text-sm"
                >
                  {area}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#6B7280] mt-5 leading-relaxed">{local.meetupNote}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-[#111827] mb-4">{local.nearbyTitle}</h3>
            <ul className="flex flex-wrap gap-2 mb-5">
              {local.nearby.map((city) => (
                <li
                  key={city}
                  className="px-3 py-1.5 rounded-full bg-[#F3F4F6] text-[#374151] text-sm"
                >
                  {city}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#6B7280] leading-relaxed">{local.nearbyNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
