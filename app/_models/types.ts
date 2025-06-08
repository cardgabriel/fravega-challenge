// User types for API responses
export interface User {
  id: number
  avatar_url: string
  name: string
}

// Error response type
export interface ErrorResponse {
  error: string
}

// Detailed user response for individual user endpoint
export interface DetailedUser {
  avatar: string
  username: string
  name: string | null
  company: string | null
  location: string | null
  followers_count: number
  following_count: number
}

// Repository type
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

// Pagination interface for GitHub API requests
export interface UrlBuildParams {
  searchQuery?: string
  since?: number
  per_page?: number
}

// GitHub API user structure
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
  // Additional fields for detailed user info
  company?: string | null
  location?: string | null
  followers?: number
  following?: number
  public_repos?: number
}

// GitHub API repository structure
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
