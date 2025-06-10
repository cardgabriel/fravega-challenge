'use client'

import dynamic from 'next/dynamic'

import Spinner from '../_components/Spinner/Spinner'

const FavoritesView = dynamic(() => import('@/app/_views/favorites/FavoritesView'), {
  ssr: false,
  loading: () => <Spinner />,
})

const FavoritesPage = () => {
  return <FavoritesView />
}

export default FavoritesPage
