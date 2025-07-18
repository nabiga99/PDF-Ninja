import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const WavyBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 800"
      >
        <defs>
          <pattern
            id="wavy-pattern"
            patternUnits="userSpaceOnUse"
            width="80"
            height="80"
            patternTransform="rotate(45)"
          >
            <path
              d="M 0,40 Q 20,0 40,40 Q 60,80 80,40"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wavy-pattern)" />
      </svg>
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground overflow-hidden">
      <WavyBackground />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-8xl md:text-9xl font-bold text-primary tracking-wider">
          404
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-md">
          Don't worry - your PDF hasn't been corrupted. It's just this page that couldn't be found.
        </p>
        <Button asChild className="mt-8">
          <Link to="/">Back to Home Page</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
