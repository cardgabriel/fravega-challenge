'use client'

import dynamic from 'next/dynamic'

import { QueryClient, QueryClientProvider, isServer } from '@tanstack/react-query'

const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then((d) => ({ default: d.ReactQueryDevtools })),
  {
    ssr: false,
  }
)

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // Data stays fresh for 1 minute
        retry: 1, // Retry once if error happens
        refetchOnWindowFocus: false, // Don't refetch when window gets focus
      },
      mutations: {
        retry: 1,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
