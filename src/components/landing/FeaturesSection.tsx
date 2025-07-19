
import { Zap, FileText, Trash2, PenTool, Unlock, Shield, EyeOff, FileX, Droplets, Combine, Clock, Heart, FileSpreadsheet, Presentation, File as FileIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: FileText,
    title: 'PDF to Word',
    description: 'Convert your PDFs to editable Word documents (DOCX).',
    link: '/convert/pdf-to-word',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: FileIcon,
    title: 'Word to PDF',
    description: 'Convert Word documents (DOCX) to professional PDFs.',
    link: '/convert/word-to-pdf',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: FileSpreadsheet,
    title: 'PDF to Excel',
    description: 'Extract data from your PDFs into Excel spreadsheets (XLSX).',
    link: '/convert/pdf-to-excel',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: FileIcon,
    title: 'Excel to PDF',
    description: 'Turn your Excel spreadsheets (XLSX) into shareable PDFs.',
    link: '/convert/excel-to-pdf',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Presentation,
    title: 'PDF to PowerPoint',
    description: 'Transform your PDFs into editable PowerPoint presentations (PPTX).',
    link: '/convert/pdf-to-powerpoint',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: FileIcon,
    title: 'PowerPoint to PDF',
    description: 'Convert PowerPoint presentations (PPTX) to high-quality PDFs.',
    link: '/convert/powerpoint-to-pdf',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Zap,
    title: 'Compress PDFs',
    description: 'Reduce file sizes by up to 80% while maintaining quality. Three compression levels available.',
    link: '/compress',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: PenTool,
    title: 'eSign PDF',
    description: 'Create electronic signatures and sign your documents digitally with legal validity.',
    link: '/esign',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: FileText,
    title: 'Extract Pages',
    description: 'Select and extract specific pages or ranges. Export as single or separate files.',
    link: '/extract',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Trash2,
    title: 'Delete Pages',
    description: 'Remove unwanted pages easily. Supports individual, range, and pattern deletion.',
    link: '/delete',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Unlock,
    title: 'Unlock PDF',
    description: 'Remove passwords, encryption, and permissions from protected PDF documents.',
    link: '/unlock',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Shield,
    title: 'Protect PDF',
    description: 'Add password protection and encryption to secure your sensitive documents.',
    link: '/protect',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  },
  {
    icon: EyeOff,
    title: 'Redact PDF',
    description: 'Remove sensitive information permanently with professional redaction tools.',
    link: '/redact',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  },
  {
    icon: FileX,
    title: 'Make Uneditable',
    description: 'Convert your PDF to a read-only format to prevent unauthorized modifications.',
    link: '/uneditable',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: Droplets,
    title: 'Add Watermark',
    description: 'Add custom watermarks to protect your documents and establish ownership.',
    link: '/watermark',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50'
  },
  {
    icon: Combine,
    title: 'Merge PDFs',
    description: 'Combine multiple PDF files into one unified document with custom ordering.',
    link: '/merge',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  }
];

const benefits = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your files never leave your device. All processing happens locally in your browser.'
  },
  {
    icon: Clock,
    title: 'Lightning Fast',
    description: 'Client-side processing for instant results without waiting for server uploads.'
  },
  {
    icon: Heart,
    title: 'Always Free',
    description: 'Professional-grade PDF tools available to everyone, completely free forever.'
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Tools Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Comprehensive PDF Tools</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to work with PDFs, all in one place
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className={`inline-flex p-4 rounded-full ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  {feature.description}
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={feature.link}>
                    Try Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose PDFNinja?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with privacy, speed, and user experience in mind
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border-0 shadow-md">
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-6">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
