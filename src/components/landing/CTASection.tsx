
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-0 shadow-xl">
          <CardContent className="text-center py-16 px-8">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4">
              Ready to Process Your PDFs?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust PDFNinja for their document processing needs. 
              Start with any of our powerful tools today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/compress">
                  Compress PDF
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/ocr">
                  Extract Text
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              No sign-up required • 100% free • Privacy guaranteed
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
