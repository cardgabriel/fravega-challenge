import { redirect } from 'next/navigation'

import { CLIENT_PATHS } from './_lib/constants'

export default function HomePage() {
  redirect(CLIENT_PATHS.USERS)
}
