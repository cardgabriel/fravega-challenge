'use client'

import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Providers({ children }: { children: React.ReactNode }) {
  // Crear una instancia del QueryClient que se mantiene durante toda la sesión
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Configuraciones por defecto para queries
            staleTime: 60 * 1000, // Los datos se consideran frescos por 1 minuto
            retry: 1, // Reintentar una vez en caso de error
            refetchOnWindowFocus: false, // No refetch cuando se enfoca la ventana
          },
          mutations: {
            // Configuraciones por defecto para mutations
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Herramientas de desarrollo - solo se muestran en desarrollo */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
