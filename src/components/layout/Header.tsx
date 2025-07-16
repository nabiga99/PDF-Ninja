
import { Link, useLocation } from 'react-router-dom';
import { Zap, FileText, Trash2, PenTool, Unlock, Shield, EyeOff, FileX, Droplets, Combine, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { ThemeToggle } from '../theme/ThemeToggle';

const tools = [
  { name: 'Compress', path: '/compress', icon: Zap },
  { name: 'Extract', path: '/extract', icon: FileText },
  { name: 'Delete', path: '/delete', icon: Trash2 },
  { name: 'eSign', path: '/esign', icon: PenTool },
  { name: 'Unlock', path: '/unlock', icon: Unlock },
  { name: 'Protect', path: '/protect', icon: Shield },
  { name: 'Redact', path: '/redact', icon: EyeOff },
  { name: 'Uneditable', path: '/uneditable', icon: FileX },
  { name: 'Watermark', path: '/watermark', icon: Droplets },
  { name: 'Merge', path: '/merge', icon: Combine },
];

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold">
            PDF<span className="text-primary">Ninja</span>
          </div>
        </Link>

        {/* Desktop Navigation - Show only first 4 tools */}
        <nav className="hidden lg:flex items-center space-x-4">
          {tools.slice(0, 4).map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(tool.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <tool.icon className="h-4 w-4" />
              <span>{tool.name}</span>
            </Link>
          ))}
          
          {/* Dropdown for remaining tools */}
          <div className="relative group">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              More Tools
            </Button>
            <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {tools.slice(4).map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors hover:bg-accent ${
                    isActive(tool.path) ? 'bg-primary text-primary-foreground' : ''
                  }`}
                >
                  <tool.icon className="h-4 w-4" />
                  <span>{tool.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Theme Toggle */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="text-lg font-semibold">
                  PDF<span className="text-primary">Ninja</span>
                </Link>
                <nav className="flex flex-col space-y-2">
                  {tools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                        isActive(tool.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      <tool.icon className="h-5 w-5" />
                      <span>{tool.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
