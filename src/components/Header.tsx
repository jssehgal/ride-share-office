import { Car, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
          <Car className="h-6 w-6" />
          <span>CarPool Connect</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link 
            to="/dashboard" 
            className={`transition-colors hover:text-primary ${isActive('/dashboard') ? 'text-primary font-medium' : 'text-muted-foreground'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/create-ride" 
            className={`transition-colors hover:text-primary ${isActive('/create-ride') ? 'text-primary font-medium' : 'text-muted-foreground'}`}
          >
            Offer Ride
          </Link>
          <Link 
            to="/find-ride" 
            className={`transition-colors hover:text-primary ${isActive('/find-ride') ? 'text-primary font-medium' : 'text-muted-foreground'}`}
          >
            Find Ride
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <User className="h-4 w-4" />
                <span className="text-foreground">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <div className="flex space-x-2">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;