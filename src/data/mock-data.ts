export interface LeaderboardEntry {
  rank: number;
  project: string;
  team: string;
  score: number;
  type: string;
  status: string;
  updated: string;
}

export interface ProjectEntry {
  title: string;
  team: string;
  description: string;
  tags: string[];
  category: string;
  repo: string;
  deploy: string;
}

export const leaderboard: LeaderboardEntry[] = [];

export const projects: ProjectEntry[] = [];
