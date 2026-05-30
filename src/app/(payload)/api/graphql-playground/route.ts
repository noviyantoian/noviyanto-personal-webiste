/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* Dimodifikasi: GraphQL Playground dimatikan di production (cegah introspeksi/eksekusi publik). */
import config from '@payload-config'
import { GRAPHQL_PLAYGROUND_GET } from '@payloadcms/next/routes'

export const GET =
  process.env.NODE_ENV === 'production'
    ? () => new Response('Not Found', { status: 404 })
    : GRAPHQL_PLAYGROUND_GET(config)
