export const GITHUB_PATHS = {
  GET_ALL_USERS: () => `https://api.github.com/users`,
  SEARCH_USERS: (username: string) => `https://api.github.com/search/users?q=${username}`,
}
