
import { ArrowRight, Zap, Shield, Users, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
            <Zap className="h-4 w-4 mr-2" />
            Professional PDF Tools - Always Free
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold">
              PDF<span className="text-primary">Ninja</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground font-medium">
              Professional PDF Processing Tools
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Compress, convert, extract pages, and delete pages from your PDFs. 
              All processing happens in your browser for maximum privacy and speed.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 shadow-lg">
              <Link to="/compress">
                Start Compressing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/sign-up">
                Sign Up Now
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>100% Privacy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Premium Features</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Always Free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
