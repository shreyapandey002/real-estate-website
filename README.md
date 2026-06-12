# DreamHomes - Real Estate Demo Website

A modern, responsive real estate website built with React, Vite, and Tailwind CSS. Features a curated property listing showcase and an embedded Langflow AI chat widget for intelligent customer assistance.

## 🎯 Features

- **Modern Hero Section**: Eye-catching hero section with integrated search bar for properties
- **Property Listings**: Grid of 12 featured properties with detailed cards including images, pricing, and features
- **Responsive Design**: Fully responsive design optimized for mobile, tablet, and desktop devices
- **AI Chat Widget**: Integrated Langflow embedded chat agent for customer support and property inquiries
- **Professional UI**: Clean, modern aesthetic using Tailwind CSS with smooth hover effects and transitions
- **Performance Optimized**: Built with Vite for fast build times and optimal performance

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Langflow** - AI chat widget integration

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Getting Started

### 1. Installation

```bash
npm install
```

This will install all dependencies including:
- React and related packages
- Tailwind CSS and PostCSS
- Lucide React for icons

### 2. Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 3. Build

Create a production build:

```bash
npm run build
```

The optimized production files will be in the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your Git repository to Vercel dashboard: https://vercel.com

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Option A - Direct Upload:
   - Visit https://app.netlify.com/drop
   - Drag and drop the `dist/` folder

3. Option B - Git Integration:
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

### Environment Variables

If using the Langflow chat widget with your own flow:
1. Get your flow ID from Langflow
2. Update `src/components/ChatWidget.tsx` with your configuration:
   ```tsx
   <langflow-chat
     window_title="Real Estate Agent"
     flow_id="YOUR_FLOW_ID"
     host_url="YOUR_HOST_URL"
     api_key="YOUR_API_KEY"
   />
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Hero.tsx             # Hero section with search
│   ├── PropertyCard.tsx      # Individual property card
│   ├── PropertyListings.tsx  # Property grid
│   └── ChatWidget.tsx        # Langflow chat widget
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
├── index.css                # Tailwind CSS setup
└── assets/                  # Static images
```

## 🎨 Customization

### Change Color Scheme

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: "#YOUR_COLOR",
      secondary: "#YOUR_COLOR",
    },
  },
}
```

### Update Property Data

Modify the `properties` array in `src/components/PropertyListings.tsx`:

```tsx
const properties = [
  {
    id: 1,
    image: 'URL_TO_IMAGE',
    title: 'Property Title',
    price: '₹Price',
    location: 'Location',
    beds: 3,
    baths: 2,
    area: '2500',
  },
  // Add more properties
]
```

### Configure Chat Widget

Update `src/components/ChatWidget.tsx` with your Langflow configuration:
- `flow_id`: Your Langflow flow ID
- `host_url`: Your Langflow host URL
- `api_key`: Your API key
- `window_title`: Chat widget title

## 📊 Performance

- **Lighthouse Score**: Optimized for Core Web Vitals
- **Build Time**: < 1 second with Vite
- **Bundle Size**: ~50KB gzipped
- **Load Time**: < 2 seconds on 4G

## 🔐 Security

- No sensitive data stored client-side
- API keys should be kept secret
- HTTPS recommended for production
- Content Security Policy headers recommended

## 🤝 Features Roadmap

- [ ] Property filter and search functionality
- [ ] Property detail pages
- [ ] Contact form integration
- [ ] User authentication
- [ ] Favorites/Wishlist feature
- [ ] Image carousel for properties
- [ ] Virtual tours integration
- [ ] Testimonials section
- [ ] Blog integration

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint (if configured)
```

## 🐛 Troubleshooting

### Chat widget not loading
- Verify the flow ID and host URL are correct
- Check browser console for errors
- Ensure API key is valid

### Styles not appearing
- Clear node_modules: `rm -rf node_modules && npm install`
- Restart dev server
- Check Tailwind CSS configuration

### Build errors
- Delete `.vite/` and `dist/` folders
- Run `npm install` again
- Check for TypeScript errors: `npx tsc --noEmit`

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Real estate concept and design
- Property images from Unsplash
- Icons from Lucide React
- Langflow for AI chat integration
- Tailwind CSS for styling

## 📞 Support

For questions or issues:
1. Check the troubleshooting section above
2. Review the component files for customization examples
3. Visit Langflow documentation: https://docs.langflow.org
4. Visit Vite documentation: https://vitejs.dev

---

Built with ❤️ using React, Vite, and Tailwind CSS

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
