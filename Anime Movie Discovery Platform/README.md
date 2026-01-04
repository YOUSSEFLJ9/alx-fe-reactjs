
# 🎬 Anime Movie Discovery Platform

A modern, feature-rich web application for discovering, searching, and managing your favorite anime, manga, movies, and TV series. Built with React and powered by the Jikan Anime API and The Movie Database (TMDB) API.

## ✨ Features

- **Comprehensive Search**: Search across anime, manga, movies, and TV series from a massive database
- **Curated Collections**: Browse trending anime, top-rated manga, popular movies, and trending TV shows
- **Detailed Information**: Access comprehensive details including plots, ratings, genres, episode counts, and cast information
- **Favorites Management**: Save your favorite titles to a personalized favorites list
- **Advanced Filtering**: Filter results by genre, rating, release date, and sort by popularity or rating
- **Dark/Light Theme**: Toggle between dark and light modes for comfortable viewing
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Lightning Fast**: Optimized performance with intelligent caching powered by React Query

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Anime Movie Discovery Platform"
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your API keys:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

You can get your TMDB API key from [The Movie Database](https://www.themoviedb.org/settings/api)

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

This creates an optimized build in the `dist` directory.

### Preview Production Build
```bash
npm run preview
```

### Full Production Setup
```bash
npm start
```

This builds and previews the production version.

## 🛠️ Technology Stack

### Frontend Framework
- **React** 18.3.1 - UI library
- **React Router** - Client-side routing
- **TypeScript** - Type-safe development

### State Management & Data Fetching
- **React Query** (@tanstack/react-query) - Powerful data fetching and caching
- **React Hook Form** - Efficient form handling

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component library
- **Lucide React** - Beautiful icon library
- **Motion (Framer Motion alternative)** - Smooth animations

### API & Utilities
- **Axios** - HTTP client for API requests
- **Jikan API** - Free anime/manga data provider
- **TMDB API** - Movie and TV series database

### Development Tools
- **Vite** - Next-generation build tool
- **TypeScript** - Type safety
- **ESLint** - Code quality

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Radix UI component wrappers
│   ├── Navbar.tsx      # Navigation bar
│   ├── SearchBar.tsx   # Search input component
│   ├── FilterPanel.tsx # Filtering options
│   ├── MediaCard.tsx   # Content card display
│   ├── CardList.tsx    # Grid of media cards
│   └── ...
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page with trending content
│   ├── SearchPage.tsx  # Search and filter interface
│   ├── DetailsPage.tsx # Individual item details
│   └── FavoritesPage.tsx # User's saved favorites
├── styles/            # CSS files
├── types/             # TypeScript type definitions
├── api.tsx            # API endpoint configuration
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## 🔌 API Integration

### Jikan API (Anime & Manga)
- Provides free access to MyAnimeList data
- No authentication required
- Rate limits: 60 requests per minute

### TMDB API (Movies & TV)
- Requires API key for authentication
- Comprehensive movie and TV series database
- Register at [themoviedb.org](https://www.themoviedb.org/)

## 🎨 UI Components

The application features a comprehensive set of reusable components built with Radix UI:

- **Buttons** - Interactive action elements
- **Dialogs** - Modal windows for detailed information
- **Tabs** - Organized content sections
- **Select** - Dropdown menus for filtering
- **Cards** - Content containers
- **Loading States** - Skeleton screens and spinners
- **Error Boundaries** - Graceful error handling
- **Theme Toggle** - Dark/light mode switcher

## 🔄 Data Flow

1. **API Requests** - Axios makes requests to external APIs
2. **React Query** - Caches responses and manages loading/error states
3. **Type Conversion** - API responses are converted to unified MediaItem format
4. **Component Rendering** - Components display data and handle user interactions
5. **Local Storage** - Favorites are persisted in browser storage

## 🎯 Key Features Explained

### Search & Filter
- Real-time search across multiple content types
- Filter by genre, release year, and rating
- Sort results by popularity or rating
- Separate search categories for anime, manga, movies, and TV

### Favorites System
- Save titles to personal favorites list
- Persistent storage using browser's local storage
- Quick access from the favorites page

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface
- Optimized performance on slower connections

### Performance Optimization
- React Query caching strategy (5-30 minute cache)
- Code splitting with React Router
- Lazy loading of images
- Optimized bundle size with Vite

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

### API Key Issues
- Ensure `VITE_TMDB_API_KEY` is set in `.env.local`
- Verify the key is valid and has necessary permissions

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Development Server Issues
```bash
# Kill any existing processes because ist only one port assined if its still busy its going to fail in runing
npx kill-port 5173

# Restart development server
npm run dev
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

## 🙏 Acknowledgments

- [Jikan](https://jikan.moe/) - Anime/Manga API
- [The Movie Database](https://www.themoviedb.org/) - Movie/TV API
- [Radix UI](https://www.radix-ui.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Query](https://tanstack.com/query/latest) - Data management

---

**Happy discovering! Enjoy exploring your favorite anime and movies! 🎥✨**
