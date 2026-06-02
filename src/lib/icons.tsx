import {
  Cpu,
  Home,
  Plane,
  Gem,
  Scale,
  Building2,
  ShoppingBag,
  Globe,
  TrendingUp,
  Search,
  Target,
  Bot,
  Smartphone,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

export const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  'B2B IT & Teknologi': Cpu,
  'Home Service': Home,
  'Tour & Travel': Plane,
  'Perhiasan & Jewelry': Gem,
  'Firma Hukum & Legal': Scale,
  'Sewa Kantor & Virtual Office': Building2,
  'E-commerce': ShoppingBag,
}

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  website: Globe,
  'google-ads': TrendingUp,
  seo: Search,
  'digital-marketing': Target,
  'ai-integration': Bot,
  'mobile-app': Smartphone,
  maintenance: ShieldCheck,
}
