import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/lib/supabaseClient';
import { Zap, FileText, Trash2, PenTool, Unlock, Shield, EyeOff, FileX, Droplets, Combine, Menu, FileSpreadsheet, Presentation, File as FileIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { ThemeToggle } from '../theme/ThemeToggle';

const organizeTools = [
  { name: 'Merge PDFs', path: '/merge', icon: Combine },
  { name: 'Compress PDF', path: '/compress', icon: Zap },
  { name: 'Extract Pages', path: '/extract', icon: FileText },
  { name: 'Delete Pages', path: '/delete', icon: Trash2 },
];

const securityTools = [
  { name: 'Protect PDF', path: '/protect', icon: Shield },
  { name: 'Unlock PDF', path: '/unlock', icon: Unlock },
  { name: 'eSign PDF', path: '/esign', icon: PenTool },
  { name: 'Redact PDF', path: '/redact', icon: EyeOff },
  { name: 'Add Watermark', path: '/watermark', icon: Droplets },
  { name: 'Make Uneditable', path: '/uneditable', icon: FileX },
];

const conversionTools = [
  { name: 'PDF to Word', path: '/convert/pdf-to-word', icon: FileText },
  { name: 'Word to PDF', path: '/convert/word-to-pdf', icon: FileIcon },
  { name: 'PDF to Excel', path: '/convert/pdf-to-excel', icon: FileSpreadsheet },
  { name: 'Excel to PDF', path: '/convert/excel-to-pdf', icon: FileIcon },
  { name: 'PDF to PowerPoint', path: '/convert/pdf-to-powerpoint', icon: Presentation },
  { name: 'PowerPoint to PDF', path: '/convert/powerpoint-to-pdf', icon: FileIcon },
];

const allTools = [...organizeTools, ...securityTools, ...conversionTools];



const NavMenu = ({ title, items, isActive }) => (
  <div className="relative group">
    <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
      {title}
    </Button>
    <div className="absolute top-full left-0 mt-1 w-56 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      {items.map((tool) => (
        <Link
          key={tool.path}
          to={tool.path}
          className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors hover:bg-accent w-full ${
            isActive(tool.path) ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''
          }`}
        >
          <tool.icon className="h-4 w-4" />
          <span>{tool.name}</span>
        </Link>
      ))}
    </div>
  </div>
);

const MobileNavGroup = ({ title, items, isActive }) => (
  <div>
    <h3 className="px-3 py-2 text-sm font-semibold text-muted-foreground">{title}</h3>
    <div className="flex flex-col space-y-1">
      {items.map((tool) => (
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
    </div>
  </div>
);

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

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
        <nav className="hidden lg:flex items-center space-x-1">
          <NavMenu title="Organize" items={organizeTools} isActive={isActive} />
          <NavMenu title="Security" items={securityTools} isActive={isActive} />
          <NavMenu title="Convert" items={conversionTools} isActive={isActive} />
        </nav>

        {/* Auth buttons and Theme Toggle */}
        <div className="flex items-center space-x-2">
                    {user ? (
            <>
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>Dashboard</Button>
              <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/sign-in')}>Sign In</Button>
              <Button onClick={() => navigate('/sign-up')}>Sign Up</Button>
            </>
          )}
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
                <div className="border-t pt-4 mt-4">
                  {user ? (
                    <>
                      <Link to="/dashboard" className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-accent">Dashboard</Link>
                      <button onClick={handleSignOut} className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-accent w-full text-left">Sign Out</button>
                    </>
                  ) : (
                    <>
                      <Link to="/sign-in" className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-accent">Sign In</Link>
                      <Link to="/sign-up" className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-accent">Sign Up</Link>
                    </>
                  )}
                </div>
                <nav className="flex flex-col space-y-2 border-t pt-4 mt-4">
                  <MobileNavGroup title="Organize" items={organizeTools} isActive={isActive} />
                  <MobileNavGroup title="Security" items={securityTools} isActive={isActive} />
                  <MobileNavGroup title="Convert" items={conversionTools} isActive={isActive} />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
