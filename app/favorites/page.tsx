import { Suspense } from 'react'

import { type Metadata } from 'next'

import Spinner from '../_components/Spinner/Spinner'
import FavoritesView from '../_views/favorites/FavoritesView'

export const metadata: Metadata = {
  title: 'Favorite Users',
  description: 'Manage your list of favorite GitHub users.',
}

export default async function FavoritesPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <FavoritesView />
    </Suspense>
  )
}
