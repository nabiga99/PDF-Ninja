import { ArrowRight, Zap, Shield, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import heroImage from '../../assets/hero-ninja.jpg';

export const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-ninja-gradient opacity-90" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground">
              PDF<span className="text-primary-glow">Ninja</span>
            </h1>
            <p className="text-xl lg:text-2xl text-primary-foreground/90">
              Professional PDF Processing Tools
            </p>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Compress, extract text with OCR, extract pages, and delete pages from your PDFs. 
              All processing happens in your browser for maximum privacy and speed.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary-foreground/20 rounded-full">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                  Privacy First
                </h3>
                <p className="text-primary-foreground/80 text-sm">
                  Your files never leave your device. All processing happens locally in your browser.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary-foreground/20 rounded-full">
                    <Zap className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                  Lightning Fast
                </h3>
                <p className="text-primary-foreground/80 text-sm">
                  Client-side processing for instant results without waiting for server uploads.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary-foreground/20 rounded-full">
                    <Heart className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                  Always Free
                </h3>
                <p className="text-primary-foreground/80 text-sm">
                  Professional-grade PDF tools available to everyone, completely free forever.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Button 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-ninja-glow text-lg px-8 py-6"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};