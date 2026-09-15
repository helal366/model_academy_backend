* pg_isready -h localhost -p 5432

* git remote set-url origin https://github.com/helal366/model_academy_backend.git

* TERMINAL COMMAND TO CREATE RANDOM TOKEN = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))*

* pnpm dlx vercel env import .env
* pnpm dlx vercel env add
* pnpm dlx vercel env ls
* pnpm dlx vercel --prod
* 
* pnpm store prune
* pnpm config set fetch-timeout 60000

* redis-cli ping


1. Remove the .env file from the Git index (stops tracking it)
- The --cached flag ensures it stays on your computer and ONLY gets removed from Git.
* git rm --cached .env

2. Commit the change
* git commit -m "chore: remove .env from git tracking and keep it local"

3. Push to your repository (e.g., GitHub, GitLab)
* git push origin main

