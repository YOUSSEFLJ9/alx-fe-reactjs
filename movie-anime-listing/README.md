# Movie & Anime Listing Project

A modern React application for browsing and discovering movies and anime. Built with React, Vite, TailwindCSS, and React Router.

## Features

- 📺 Browse a collection of movies and anime
- 🔍 Search functionality to find specific titles
- 🎯 Filter by type (Movies, Anime, or All)
- 📱 Responsive design with TailwindCSS
- 🎨 Beautiful UI with gradient backgrounds and hover effects
- 📄 Detailed view pages for each movie/anime
- ⭐ Rating display and genre tags

## Tech Stack

- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool and dev server
- **TailwindCSS** 4.1.18 - Utility-first CSS framework
- **React Router DOM** 7.11.0 - Client-side routing

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

### Lint

Run ESLint:

```bash
npm run lint
```

## Project Structure

```
movie-anime-listing/
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx      # Card component for displaying movie/anime
│   │   ├── SearchBar.jsx      # Search input component
│   │   └── FilterButtons.jsx  # Filter buttons component
│   ├── pages/
│   │   ├── HomePage.jsx       # Main listing page
│   │   └── DetailPage.jsx     # Detail view page
│   ├── data/
│   │   └── mockData.js        # Mock data for movies and anime
│   ├── App.jsx                # Main App component with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles with Tailwind
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## Usage

- **Browse**: View all movies and anime on the home page
- **Search**: Use the search bar to find specific titles
- **Filter**: Click on "Movies", "Anime", or "All" to filter the content
- **View Details**: Click on any card to see detailed information

## License

MIT
