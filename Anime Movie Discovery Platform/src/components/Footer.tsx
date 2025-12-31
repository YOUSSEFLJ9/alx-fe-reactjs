import { Film, Github, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Film className="h-6 w-6" />
              <span>AnimeFlix</span>
            </div>
            <p className="text-muted-foreground">
              Discover the best anime and movies. Your personal entertainment guide.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4>Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Jikan API
                </a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  TMDB API
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4>Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/YOUSSEFLJ9" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://x.com/yousseflj9" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>© {currentYear} AnimeFlix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
