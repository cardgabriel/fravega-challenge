import { UserView } from '@/app/_views/user/UserView'

interface UserPageProps {
  params: Promise<{
    username: string
  }>
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params
  return <UserView userId={username} />
}

export default UserPage
