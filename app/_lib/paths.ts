export const GITHUB_PATHS = {
  GET_ALL_USERS: () => `https://api.github.com/users`,
  SEARCH_USERS: (username: string) =>
    username ? `https://api.github.com/search/users?q=${username}` : '',
  GET_USER_BY_ID: (id: string) => `https://api.github.com/users/${id}`,
  GET_USER_REPOS: (id: string) => `https://api.github.com/users/${id}/repos`,
}
