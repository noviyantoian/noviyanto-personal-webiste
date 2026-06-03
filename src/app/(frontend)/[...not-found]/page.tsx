import { notFound } from 'next/navigation'

// Catch-all: semua URL yang tidak match halaman manapun
// ditangani oleh (frontend)/not-found.tsx dengan layout penuh.
export default function CatchAll() {
  notFound()
}
