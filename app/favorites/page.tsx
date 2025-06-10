import { type Metadata } from 'next'

import FavoritesView from '../_views/favorites/FavoritesView'

export const metadata: Metadata = {
  title: 'Favorite Users',
  description: 'Manage your list of favorite GitHub users.',
}

const FavoritesPage = () => {
  return <FavoritesView />
}

export default FavoritesPage
