export interface User {
  id: number
  avatar_url: string
  name: string
}

export interface ErrorResponse {
  error: string
}

export interface DetailedUser {
  avatar: string
  username: string
  name: string | null
  company: string | null
  location: string | null
  followers_count: number
  following_count: number
  id: number
}

export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  updated_at: string
}

export interface UrlBuildParams {
  searchQuery?: string
  since?: number
  page?: number
  q?: string
}

export interface GithubUser {
  name?: string | null
  email?: string | null
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string | null
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  starred_at?: string
  user_view_type?: string
  company?: string | null
  location?: string | null
  followers?: number
  following?: number
  public_repos?: number
}

export interface GithubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  updated_at: string
}

export interface UsersPage {
  users: User[]
  nextCursor?: number
}

export interface RepositoriesPage {
  repositories: Repository[]
  nextCursor: number | null
}
