import { GeneralApiProblem } from "./api-problem"

export interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: any
  url: string
  html_url: string
  followers_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  received_events_url: string
  type: string
  score: number
  following_url: string
  gists_url: string
  starred_url: string
  events_url: string
  site_admin: boolean
}
export interface Stargazers {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: any
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
}
export interface Repos {
  private: boolean
  html_url: string
  description: string
  fork: boolean
  url: string
  archive_url: string
  assignees_url: string
  blobs_url: string
  branches_url: string
  collaborators_url: string
  comments_url: string
  commits_url: string
  compare_url: string
  contents_url: string
  contributors_url: string
  deployments_url: string
  downloads_url: string
  events_url: string
  forks_url: string
  git_commits_url: string
  git_refs_url: string
  git_tags_url: string
  git_url: string
  issue_comment_url: string
  issue_events_url: string
  issues_url: string
  keys_url: string
  labels_url: string
  languages_url: string
  merges_url: string
  milestones_url: string
  notifications_url: string
  pulls_url: string
  releases_url: string
  ssh_url: string
  stargazers_url: string
  statuses_url: string
  subscribers_url: string
  subscription_url: string
  tags_url: string
  teams_url: string
  trees_url: string
  clone_url: string
  mirror_url: string
  hooks_url: string
  svn_url: string
  homepage: string
  language: any
  forks: number
  forks_count: number
  stargazers_count: number
  watchers_count: number
  watchers: number
  size: number
  default_branch: string
  open_issues: number
  open_issues_count: number
  is_template: boolean
}
export interface SearchResult {
  total_count: number
  incomplete_results: string
  items: User[]
}
export interface LoadRepos {
  incomplete_results: string
  items: Repos[]
}
export interface getStargazers {
  incomplete_results: string
  items: Stargazers[]
}
export type SearchUserResult = { kind: "ok"; data: SearchResult } | GeneralApiProblem
export type GethUserReposResult = { kind: "ok"; data: any } | GeneralApiProblem
export type GetStargazersResult = { kind: "ok"; data: any } | GeneralApiProblem
