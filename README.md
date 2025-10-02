# 🎮 MCX Studios - Gaming Portfolio Website

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.5-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-blue.svg)](https://tailwindcss.com/)

A modern, responsive personal game showcase website showcasing MCX Studios' games across Roblox and mobile platforms. Built with cutting-edge web technologies and featuring a beautiful dark/light theme system.

![MCX Studios Banner](public/Logo.png)

## 🌟 Features

### 🎨 **Modern UI/UX Design**
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Animated Background**: Dynamic particle effects and gradients
- **Glass Morphism**: Modern backdrop blur effects throughout the interface
- **Smooth Animations**: Fluid transitions and hover effects

### 🎮 **Gaming Portfolio**
- **Multi-Platform Support**: Showcase Roblox games and mobile applications
- **Interactive Game Cards**: Detailed game information with ratings and reviews
- **Advanced Filtering**: Sort by popularity, rating, release date, or alphabetically
- **Search Functionality**: Real-time search across games and descriptions
- **Game Reviews System**: User ratings and feedback collection

### 📊 **Analytics & Tracking**
- **Google Analytics 4**: Comprehensive user behavior tracking
- **Custom Event Tracking**: Monitor user interactions and engagement
- **Social Media Analytics**: Track clicks on social media buttons
- **Search Analytics**: Monitor search queries and results

### 🔗 **Social Media Integration**
- **YouTube Channel**: Link to gaming content and tutorials
- **TikTok Account**: Short-form gaming content
- **Instagram Profile**: Behind-the-scenes and game updates
- **Consistent Branding**: Matching button styles with platform colors

### 📱 **Mobile-First Approach**
- **Optimized Tab Layout**: Horizontal tabs on mobile for better space usage
- **Touch-Friendly Interface**: Proper tap targets and gestures
- **Adaptive Text and Icons**: Responsive sizing for all screen sizes
- **Smooth Mobile Navigation**: Optimized for touch interactions

## 🚀 Live Demo

**Website**: [MCX Studios](https://mcx-studios.vercel.app) *(Replace with your actual domain)*

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 19.1.0** - Latest React with modern hooks and features
- **TypeScript 5.7.2** - Type-safe development with full IntelliSense
- **Vite 7.0.5** - Lightning-fast build tool and dev server

### **Styling & UI**
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React Icons** - Comprehensive icon library
- **Custom CSS** - Advanced animations and effects

### **Analytics & Tracking**
- **Google Analytics 4** - User behavior and engagement tracking
- **Custom Analytics Utils** - Event tracking for user interactions

### **Development Tools**
- **ESLint** - Code linting and quality assurance
- **TypeScript Config** - Strict type checking configuration
- **Vite Config** - Optimized build and development setup

## 📂 Project Structure

```
mcx-studios/
├── public/
│   ├── Logo.png                 # MCX Studios logo
│   └── vite.svg                 # Vite icon
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.tsx    # Dynamic background effects
│   │   ├── GameCard.tsx             # Individual game showcase cards
│   │   ├── Header.tsx               # Navigation and social links
│   │   ├── LoadingScreen.tsx        # Animated loading screen
│   │   ├── NotificationSystem.tsx   # Toast notifications
│   │   ├── RatingModal.tsx          # Game rating interface
│   │   ├── ReviewsPage.tsx          # Reviews and feedback page
│   │   ├── SearchBar.tsx            # Real-time search functionality
│   │   ├── SudokuPrivacy.tsx        # Privacy policy page
│   │   ├── Tabs.tsx                 # Navigation tabs with sorting
│   │   └── ThemeToggle.tsx          # Dark/light theme switcher
│   ├── contexts/
│   │   └── ThemeContext.tsx         # Global theme state management
│   ├── data/
│   │   └── games.ts                 # Game data and type definitions
│   ├── hooks/
│   │   └── useSortedGames.ts        # Custom hook for game sorting
│   ├── utils/
│   │   └── analytics.ts             # Google Analytics utilities
│   ├── App.tsx                      # Main application component
│   ├── index.css                    # Global styles and Tailwind imports
│   └── main.tsx                     # Application entry point
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML template with GA4 script
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.js               # Tailwind CSS configuration
└── vite.config.ts                   # Vite build configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheUnknown550/MCX_Studios.git
   cd MCX_Studios
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Update Google Analytics Measurement ID in `index.html`
   - Configure social media links in `Header.tsx`
   - Add your game data in `src/data/games.ts`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 📦 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Deploy automatically on every push to main branch

### **Netlify**
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Enable automatic deploys

### **GitHub Pages**
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

### **NGINX Server Deployment**

#### Option 1: Deploy from project root
```bash
# Build the project
npm run build

# Deploy to NGINX web directory
sudo rm -rf /var/www/mcxstudios24/*
sudo cp -r MCX_Studios/dist/* /var/www/mcxstudios24/
```

#### Option 2: Deploy from build directory
```bash
# Navigate to project directory
cd MCX_Studios

# Build the project
npm run build

# Deploy to NGINX web directory
sudo rm -rf /var/www/mcxstudios24/*
sudo cp -r dist/* /var/www/mcxstudios24/
```

#### NGINX Configuration
```nginx
server {
    listen 80;
    server_name mcxstudios24.com www.mcxstudios24.com;
    root /var/www/mcxstudios24;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### **Custom Server**
1. Build the project: `npm run build`
2. Upload `dist` folder contents to your web server
3. Configure server to serve `index.html` for all routes

## 🎮 Game Management

### Adding New Games

1. **Update game data** in `src/data/games.ts`:
   ```typescript
   {
     id: 3,
     title: "Your New Game",
     description: "Game description here",
     imageUrl: "https://your-image-url.com/image.png",
     link: "https://your-game-link.com",
     platform: "roblox" | "mobile",
     universeId: 123456789, // For Roblox games
     createdAt: "2025-10-02T12:00:00Z",
     // ... other properties
   }
   ```

2. **Update thumbnails** in the `public` folder or use external URLs

3. **Test locally** before deploying

### Platform Support

- **Roblox Games**: Full integration with universe IDs and Roblox links
- **Mobile Games**: Support for Play Store, App Store, and direct download links
- **Coming Soon**: Placeholder system for unreleased games

## 📊 Analytics Setup

### Google Analytics 4 Configuration

1. **Create GA4 Property** in Google Analytics
2. **Update Measurement ID** in `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID"></script>
   ```
3. **Configure tracking** in `src/utils/analytics.ts`

### Tracked Events
- **Page Views**: Automatic tracking of all page visits
- **Tab Changes**: Monitor navigation between game categories
- **Search Queries**: Track user search behavior
- **Social Clicks**: Monitor social media engagement
- **Game Interactions**: Track plays, likes, and shares

## 🎨 Customization

### Theme Configuration

- **Colors**: Modify in `src/index.css` and component files
- **Animations**: Customize in individual components
- **Background**: Edit `AnimatedBackground.tsx` for different effects

### Styling Guidelines

- **Mobile-First**: Start with mobile styles, then add larger breakpoints
- **Consistent Spacing**: Use Tailwind's spacing scale
- **Accessibility**: Maintain proper contrast ratios and focus states

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines

- **TypeScript**: Maintain strict type safety
- **Components**: Keep components small and focused
- **Performance**: Optimize for mobile devices
- **Testing**: Test across different browsers and devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Email**: [support@mattcoshx@gmail.com](mailto:support@mattcoshx@gmail.com)
- **GitHub**: [@TheUnknown550](https://github.com/TheUnknown550)
- **Website**: [MCX Studios](https://mcx-studios.vercel.app)

### Social Media
- **YouTube**: [@MCX_Studios24](https://www.youtube.com/channel/UCxC1ElkY9iWoBBpnSxFRhKw)
- **TikTok**: [@mcx_studios24](https://www.tiktok.com/@mcx_studios24)
- **Instagram**: [@mcxstudios24](https://www.instagram.com/mcxstudios24/)

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Vite Team** - For the incredibly fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Vercel** - For seamless deployment and hosting
- **Google Analytics** - For comprehensive user tracking

---

<div align="center">
  <img src="public/Logo.png" alt="MCX Studios" width="100">
  
  **Built with ❤️ by MCX Studios**
  
  ⭐ Star this repository if you found it helpful!
</div>