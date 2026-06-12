# Deployment Guide - DreamHomes Real Estate Website

This guide will help you deploy the DreamHomes real estate website to production on Vercel or Netlify.

## Quick Start

The project is fully configured for deployment. Choose one of the options below:

### Option 1: Deploy to Vercel (Recommended)

Vercel is the company behind Vite and provides seamless integration with React + Vite projects.

#### Method A: Using Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel
```

This will:
- Build your project automatically
- Deploy to a live URL
- Set up continuous deployment if you connect Git

#### Method B: Using Vercel Dashboard

1. Visit https://vercel.com and sign up (free)
2. Click "Add New..." → "Project"
3. Select your Git repository
4. Framework preset: **Next.js** (Vite will auto-detect)
5. Root directory: `./` (or leave blank)
6. Build command: `npm run build`
7. Output directory: `dist`
8. Click "Deploy"

#### Method C: Direct Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel dashboard
3. Vercel will auto-detect and deploy on every push

#### Environment Variables (Optional)

If you're using a custom Langflow AI agent:

1. In Vercel dashboard, go to Settings → Environment Variables
2. Add variables (if needed for your Langflow setup):
   - `VITE_LANGFLOW_FLOW_ID`: Your flow ID
   - `VITE_LANGFLOW_HOST`: Your host URL
   - `VITE_LANGFLOW_API_KEY`: Your API key

3. Update `src/components/ChatWidget.tsx` to use environment variables:

```tsx
const flowId = import.meta.env.VITE_LANGFLOW_FLOW_ID || "YOUR_DEFAULT_ID"
const hostUrl = import.meta.env.VITE_LANGFLOW_HOST || "YOUR_DEFAULT_HOST"
const apiKey = import.meta.env.VITE_LANGFLOW_API_KEY || "YOUR_DEFAULT_KEY"
```

### Option 2: Deploy to Netlify

Netlify is another excellent option with automatic deployments.

#### Method A: Using Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Method B: Using Netlify Dashboard

1. Visit https://app.netlify.com and sign up (free)
2. Click "Add new project" → "Import an existing project"
3. Choose your Git provider
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

#### Method C: Drag and Drop

The simplest option - no Git required!

1. Build locally: `npm run build`
2. Visit https://app.netlify.com/drop
3. Drag and drop the `dist/` folder
4. Netlify will deploy immediately!

### Option 3: Deploy to Other Platforms

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

#### GitHub Pages
```bash
# Add to package.json
npm install -D gh-pages

# Add this script to package.json:
"deploy": "npm run build && gh-pages -d dist"

# Then run:
npm run deploy
```

#### AWS Amplify
```bash
npm install -g @aws-amplify/cli
amplify init
amplify publish
```

#### Docker (For Advanced Users)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=0 /app/dist .

EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
```

Build and run:
```bash
docker build -t dreamhomes .
docker run -p 3000:3000 dreamhomes
```

## Post-Deployment

### 1. Verify Your Site

Visit your deployment URL and check:
- [ ] Hero section loads with background image
- [ ] Property cards are visible and styled correctly
- [ ] Chat widget appears in bottom-right corner
- [ ] Site is responsive on mobile
- [ ] Search bar is functional (UI only)

### 2. Custom Domain

#### Vercel
- Settings → Domains → Add domain
- Follow DNS setup instructions

#### Netlify
- Site settings → Domain management → Add custom domain
- Follow DNS setup instructions

### 3. SSL/HTTPS

Both Vercel and Netlify provide free SSL certificates automatically.

### 4. Monitoring

#### Vercel
- Dashboard shows build status and analytics
- Automatic error reporting

#### Netlify
- Deployment history and logs
- Build notifications via email/Slack

### 5. Continuous Deployment

Both platforms automatically redeploy on `main` branch push.

To deploy from a different branch:
- Vercel: Settings → Git → Production Branch
- Netlify: Settings → Deploy settings → Deploy contexts

## Troubleshooting

### Build Failures

1. Check build logs in platform dashboard
2. Verify `npm run build` works locally:
   ```bash
   rm -rf dist node_modules
   npm install
   npm run build
   ```

3. Common issues:
   - TypeScript errors: Run `npx tsc --noEmit` locally
   - Missing dependencies: Check `package.json`
   - Wrong Node version: Specify in `package.json`:
     ```json
     "engines": {
       "node": "18.x"
     }
     ```

### Chat Widget Not Loading

1. Check if Langflow server is accessible
2. Verify flow ID and host URL are correct
3. Check browser console for CORS errors
4. Ensure API key is valid

### Slow Performance

1. Check bundle size: `npm run build` shows file sizes
2. Lazy load images with proper `<img>` attributes
3. Enable caching in platform settings
4. Consider image optimization

## Performance Optimizations

The site is already optimized, but for further improvements:

### Images
- Already using Unsplash (CDN served)
- Add `loading="lazy"` to images
- Use responsive image sizes

### Code Splitting
- Vite automatically chunks code
- No additional configuration needed

### Caching
- **Vercel**: Automatic, Configure in `vercel.json`
- **Netlify**: Configure in `netlify.toml`

Example `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Environment-Specific Configuration

### Development
```bash
npm run dev
```

### Staging/Preview
```bash
npm run build
npm run preview
```

### Production
```bash
npm run build
# Deployed automatically
```

## Rollback Strategy

### Vercel
- Dashboard → Deployments → Find previous deployment → Click to restore

### Netlify
- Deploys → Find previous → Click deploy

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Vite Docs**: https://vitejs.dev
- **Langflow Docs**: https://docs.langflow.org

## Next Steps

1. Deploy to your chosen platform
2. Share your live URL
3. Monitor deployment health
4. Gather user feedback
5. Iterate and improve

---

**Your site is ready to deploy! Choose your platform above and follow the steps.** 🚀
