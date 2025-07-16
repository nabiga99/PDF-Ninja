
# PDF Ninja - Complete PDF Processing Suite

A comprehensive web application for all your PDF processing needs, featuring 10 powerful tools including compression, page management, digital signatures, security features, and more.

## 🚀 Features

### 📄 PDF Compression
- **Smart Compression**: Reduce PDF file sizes using advanced algorithms
- **Quality Preservation**: Maintain document quality while optimizing file size
- **Multiple Levels**: Light, medium, and heavy compression options
- **Real-time Progress**: Monitor compression progress with visual indicators

### ✂️ Page Management
- **Page Extraction**: Select and extract specific pages from PDF documents
- **Page Deletion**: Remove unwanted pages from your PDFs
- **Visual Preview**: See page thumbnails before processing
- **Range Selection**: Support for individual pages or page ranges

### ✍️ Digital Signatures (eSign)
- **Electronic Signatures**: Create legally valid digital signatures
- **Text Signatures**: Type your signature for quick signing
- **Hand-drawn Signatures**: Draw your signature with mouse or touch
- **Professional Results**: Add signatures to any PDF document

### 🔐 Security Features
- **Unlock PDF**: Remove passwords, encryption, and permissions from protected PDFs
- **Protect PDF**: Add password protection and encryption to secure documents
- **Redact PDF**: Permanently remove sensitive information (Coming Soon)
- **Make Uneditable**: Convert PDFs to read-only format (Coming Soon)

### 🎨 Document Enhancement
- **Add Watermark**: Add custom watermarks with adjustable opacity and positioning (Coming Soon)
- **Merge PDFs**: Combine multiple PDF files into one unified document (Coming Soon)

### 🎯 User Experience
- **Drag & Drop Upload**: Intuitive file upload with visual feedback
- **Real-time Processing**: Live progress indicators and status updates
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Privacy First**: All processing happens locally in your browser

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with excellent IDE support
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first CSS framework for rapid styling

### UI Components
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Primitive components for complex interactions
- **Lucide React** - Beautiful, customizable icons
- **Recharts** - Responsive chart library for data visualization

### PDF Processing
- **pdf-lib** - Create and modify PDF documents
- **Canvas API** - For signature drawing and image processing
- **File API** - Handle file uploads and downloads

### State Management & Utilities
- **Zustand** - Lightweight state management
- **React Query** - Server state management and caching
- **React Hook Form** - Performant forms with easy validation
- **React Dropzone** - File upload with drag and drop support

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📱 Usage Guide

### Uploading Files
1. Navigate to any tool page
2. Drag and drop PDF files into the upload area, or click to browse
3. Multiple files can be uploaded simultaneously
4. Files are validated for type and size (max 100MB per file)

### Compressing PDFs
1. Upload your PDF files
2. Select a file from the uploaded files list
3. Choose compression level (Light/Medium/Heavy)
4. Click "Compress PDF" to start processing
5. Download the compressed file when complete

### Digital Signatures (eSign)
1. Upload the PDF document you want to sign
2. Choose your signature method:
   - **Text Signature**: Type your name in the text field
   - **Hand-drawn**: Use the canvas to draw your signature
3. Click "Sign PDF" to add the signature
4. Download your signed document

### Security Operations

#### Unlocking PDFs
1. Upload a password-protected PDF
2. Enter the password if known (leave blank to attempt unlock)
3. Click "Unlock PDF" to remove restrictions
4. Download the unlocked document

#### Protecting PDFs
1. Upload your PDF file
2. Enter a strong password
3. Confirm the password
4. Click "Protect PDF" to add encryption
5. Download the protected document

### Page Management

#### Extracting Pages
1. Upload your PDF file
2. Select specific pages or enter page ranges
3. Choose output format (single file or separate files)
4. Click "Extract Pages" and download results

#### Deleting Pages
1. Upload your PDF file
2. Select pages you want to remove
3. Click "Delete Pages" to process
4. Download the modified document

## 🎨 Customization

### Theming
The application supports both light and dark themes. Users can toggle between themes using the theme switcher in the header.

### Styling
- All components use Tailwind CSS for consistent styling
- Custom design tokens are defined in `src/index.css`
- Component variants are managed through `class-variance-authority`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=PDF Ninja
```

### File Limits
- Maximum file size: 100MB per file
- Supported format: PDF only
- Multiple file upload supported for merge operations

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── landing/        # Landing page components
│   ├── upload/         # File upload components
│   └── tools/          # PDF processing tool components
├── pages/              # Page components
├── store/              # State management (Zustand)
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

## 🔒 Privacy & Security

- **Client-side Processing**: All PDF operations happen in your browser
- **No Server Upload**: Your files never leave your device
- **No Data Collection**: We don't collect or store any personal information
- **Secure by Design**: No external API calls for document processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 Roadmap

### Current Features ✅
- PDF Compression (3 levels)
- Page Extraction & Deletion
- Digital Signatures (eSign)
- PDF Unlock & Protection

### Coming Soon 🚧
- PDF Redaction
- Make PDF Uneditable
- Watermark Addition
- PDF Merging
- Batch Processing
- Advanced OCR Text Extraction

### Future Enhancements 🔮
- PDF Form Filling
- Document Annotation
- PDF to Image Conversion
- Image to PDF Conversion
- Advanced Security Options

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- **Live Demo**: [PDF Ninja](https://lovable.dev/projects/c6d01aa6-3bd8-4445-bd43-f092a590e83d)
- **Documentation**: [Lovable Docs](https://docs.lovable.dev)
- **Support**: [GitHub Issues](https://github.com/your-repo/issues)

## 🙏 Acknowledgments

- [pdf-lib](https://pdf-lib.js.org/) for PDF manipulation capabilities
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling framework
- [Lucide](https://lucide.dev/) for comprehensive icon library
- [React](https://reactjs.org/) for the component framework

---

Built with ❤️ using [Lovable](https://lovable.dev)

**Experience the power of professional PDF processing, completely free and private.**
