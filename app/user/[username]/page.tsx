import { UserView } from '@/app/_views/user/UserView'

interface UserPageProps {
  params: {
    username: string
  }
}

const UserPage = ({ params }: UserPageProps) => {
  return <UserView userId={params.username} />
}

export default UserPage
