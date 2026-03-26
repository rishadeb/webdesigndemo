import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && repoName;

  return {
    plugins: [react()],
    base: isGitHubPagesBuild ? `/${repoName}/` : '/',
  };
});
