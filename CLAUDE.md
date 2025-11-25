# SBHX Landing Page

## Deployment

This site is deployed to Cloudflare Pages.

**Project:** `sbhx-landing-page`
**URL:** https://sbhx-landing-page.pages.dev

### Deploy Command

```bash
wrangler pages deploy . --project-name=sbhx-landing-page
```

This deploys the current directory as a static site. Cloudflare will automatically upload changed files and provide a preview URL for each deployment.

### Requirements

- Node.js with wrangler installed (`npm install -g wrangler`)
- Authenticated with Cloudflare (`wrangler login`)
