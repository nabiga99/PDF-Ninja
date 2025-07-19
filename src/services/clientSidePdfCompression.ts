import { PDFDocument } from 'pdf-lib';

export interface ClientCompressionOptions {
  // Currently no options, but can be extended
}

class ClientSidePDFCompressor {
  async compressPDF(file: File, options?: ClientCompressionOptions): Promise<Blob> {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      // Skips parsing of objects that are not required for many operations
      updateMetadata: false 
    });

    // This is a basic form of optimization. pdf-lib doesn't have advanced
    // image re-sampling or object stream optimization like server-based tools.
    // The main benefit comes from restructuring the PDF and removing unused objects.

    // Attempt to remove metadata if it exists, which can reduce size.
    try {
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('');
        pdfDoc.setCreator('');
        pdfDoc.setCreationDate(new Date(0));
        pdfDoc.setModificationDate(new Date(0));
    } catch (e) {
        console.warn('Could not clear all metadata fields.', e);
    }

    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true, // Group objects into streams, which can be compressed.
      addDefaultPage: false,
    });
    
    return new Blob([pdfBytes], { type: 'application/pdf' });
  }
}

export const clientSidePdfCompressor = new ClientSidePDFCompressor();
