import { Shield, Zap, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Privacy First */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold">Privacy First</h3>
            <p className="text-sm text-muted-foreground">
              All processing happens in your browser. Your files never leave your device.
            </p>
          </div>

          {/* Lightning Fast */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 bg-primary/10 rounded-full">
                <Zap className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Client-side processing for instant results without server delays.
            </p>
          </div>

          {/* Free Forever */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 bg-primary/10 rounded-full">
                <Heart className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold">Free Forever</h3>
            <p className="text-sm text-muted-foreground">
              Professional PDF tools available to everyone, completely free.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PDFNinja. Built with privacy and performance in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};