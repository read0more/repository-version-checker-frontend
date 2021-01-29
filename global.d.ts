interface RepositoryVersion {
  id: number;
  prerelease: boolean;
  url: string;
  publishedAt: Date;
}

interface Repository {
  id: number;
  name: string;
  updatedAt: Date;
  versions?: RepositoryVersion[];
}

interface UserRepository {
  repository?: Repository;
  order: number;
  repositoryUrl: string;
}

interface User {
  id: number;
  githubId: string;
  username: string;
  profileImage?: string;
  repositories?: UserRepository[];
}
