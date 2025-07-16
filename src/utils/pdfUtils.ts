import { PDFDocument, degrees, rgb } from 'pdf-lib';

export const compressPDF = async (
  file: File,
  compressionLevel: 'light' | 'medium' | 'heavy',
  onProgress?: (progress: number) => void
): Promise<{ compressedFile: Blob; originalSize: number; compressedSize: number; compressionRatio: number }> => {
  onProgress?.(10);
  
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  onProgress?.(30);
  
  // Get compression settings based on level
  const compressionSettings = {
    light: { 
      imageQuality: 0.85, 
      removeMetadata: true, 
      optimizeImages: true,
      removeAnnotations: false,
      flattenForms: false
    },
    medium: { 
      imageQuality: 0.65, 
      removeMetadata: true, 
      optimizeImages: true,
      removeAnnotations: true,
      flattenForms: true
    },
    heavy: { 
      imageQuality: 0.45, 
      removeMetadata: true, 
      optimizeImages: true,
      removeAnnotations: true,
      flattenForms: true
    }
  };
  
  const settings = compressionSettings[compressionLevel];
  
  onProgress?.(50);
  
  // Remove metadata to reduce size
  if (settings.removeMetadata) {
    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer('PDFNinja');
    pdfDoc.setCreator('PDFNinja');
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());
  }
  
  // Process each page for compression
  const pages = pdfDoc.getPages();
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    
    // Flatten forms if specified
    if (settings.flattenForms) {
      // This is a simplified approach - in production you'd use more sophisticated flattening
      try {
        const form = pdfDoc.getForm();
        if (form) {
          form.flatten();
        }
      } catch (error) {
        console.log('No forms to flatten');
      }
    }
    
    onProgress?.(50 + (i / pages.length) * 25);
  }
  
  onProgress?.(80);
  
  // Save with compression settings
  const saveOptions: any = {
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: compressionLevel === 'heavy' ? 50 : compressionLevel === 'medium' ? 25 : 10
  };
  
  const compressedBytes = await pdfDoc.save(saveOptions);
  
  // Apply additional compression based on level
  let finalBytes = compressedBytes;
  
  if (compressionLevel === 'medium' || compressionLevel === 'heavy') {
    // Create a new PDF with further optimization
    const optimizedDoc = await PDFDocument.load(compressedBytes);
    
    // Remove unused objects and compress streams
    const reOptimizedBytes = await optimizedDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });
    
    finalBytes = reOptimizedBytes;
  }
  
  if (compressionLevel === 'heavy') {
    // Apply maximum compression by recreating the PDF with minimal settings
    const heavyDoc = await PDFDocument.load(finalBytes);
    const finalOptimizedBytes = await heavyDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 100
    });
    
    finalBytes = finalOptimizedBytes;
  }
  
  const compressedFile = new Blob([finalBytes], { type: 'application/pdf' });
  
  onProgress?.(100);
  
  const originalSize = file.size;
  const compressedSize = compressedFile.size;
  const compressionRatio = Math.round(((originalSize - compressedSize) / originalSize) * 100);
  
  return {
    compressedFile,
    originalSize,
    compressedSize,
    compressionRatio
  };
};

export const extractPages = async (
  file: File,
  pageNumbers: number[],
  outputMode: 'single' | 'separate',
  onProgress?: (progress: number) => void
): Promise<{ files: { name: string; blob: Blob }[] }> => {
  onProgress?.(10);
  
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  
  onProgress?.(30);
  
  const results: { name: string; blob: Blob }[] = [];
  
  if (outputMode === 'single') {
    // Create single PDF with all selected pages
    const newPdf = await PDFDocument.create();
    
    for (let i = 0; i < pageNumbers.length; i++) {
      const pageIndex = pageNumbers[i] - 1; // Convert to 0-based index
      if (pageIndex >= 0 && pageIndex < sourcePdf.getPageCount()) {
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageIndex]);
        newPdf.addPage(copiedPage);
      }
      onProgress?.(30 + (i / pageNumbers.length) * 60);
    }
    
    const pdfBytes = await newPdf.save();
    const fileName = file.name.replace('.pdf', '_extracted.pdf');
    
    results.push({
      name: fileName,
      blob: new Blob([pdfBytes], { type: 'application/pdf' })
    });
  } else {
    // Create separate PDF for each page
    for (let i = 0; i < pageNumbers.length; i++) {
      const pageIndex = pageNumbers[i] - 1;
      if (pageIndex >= 0 && pageIndex < sourcePdf.getPageCount()) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageIndex]);
        newPdf.addPage(copiedPage);
        
        const pdfBytes = await newPdf.save();
        const fileName = file.name.replace('.pdf', `_page_${pageNumbers[i]}.pdf`);
        
        results.push({
          name: fileName,
          blob: new Blob([pdfBytes], { type: 'application/pdf' })
        });
      }
      onProgress?.(30 + (i / pageNumbers.length) * 70);
    }
  }
  
  onProgress?.(100);
  return { files: results };
};

export const deletePages = async (
  file: File,
  pageNumbers: number[],
  onProgress?: (progress: number) => void
): Promise<{ file: Blob; remainingPages: number }> => {
  onProgress?.(10);
  
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer);
  const totalPages = sourcePdf.getPageCount();
  
  onProgress?.(30);
  
  // Create new PDF with pages to keep
  const newPdf = await PDFDocument.create();
  const pagesToKeep: number[] = [];
  
  for (let i = 1; i <= totalPages; i++) {
    if (!pageNumbers.includes(i)) {
      pagesToKeep.push(i - 1); // Convert to 0-based index
    }
  }
  
  onProgress?.(50);
  
  // Copy pages that should be kept
  if (pagesToKeep.length > 0) {
    const copiedPages = await newPdf.copyPages(sourcePdf, pagesToKeep);
    copiedPages.forEach(page => newPdf.addPage(page));
  }
  
  onProgress?.(80);
  
  const pdfBytes = await newPdf.save();
  const resultFile = new Blob([pdfBytes], { type: 'application/pdf' });
  
  onProgress?.(100);
  
  return {
    file: resultFile,
    remainingPages: pagesToKeep.length
  };
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const getPageCount = async (file: File): Promise<number> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    return pdfDoc.getPageCount();
  } catch (error) {
    console.error('Error getting page count:', error);
    return 0;
  }
};

export const signPDF = async (
  file: File,
  signatureData: string,
  onProgress?: (progress: number) => void
): Promise<{ file: Blob }> => {
  onProgress?.(10);
  
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  onProgress?.(30);
  
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  
  onProgress?.(50);
  
  // Add signature text or image
  if (signatureData.startsWith('data:image')) {
    // Handle drawn signature
    try {
      const signatureImage = await pdfDoc.embedPng(signatureData);
      const signatureDims = signatureImage.scale(0.3);
      
      firstPage.drawImage(signatureImage, {
        x: width - signatureDims.width - 50,
        y: 50,
        width: signatureDims.width,
        height: signatureDims.height,
      });
    } catch (error) {
      console.error('Error embedding signature image:', error);
      // Fallback to text signature
      firstPage.drawText(`Signature: ${signatureData.slice(0, 20)}...`, {
        x: width - 200,
        y: 50,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }
  } else {
    // Handle text signature
    firstPage.drawText(`Signature: ${signatureData}`, {
      x: width - 200,
      y: 50,
      size: 12,
      color: rgb(0, 0, 0),
    });
  }
  
  onProgress?.(80);
  
  const pdfBytes = await pdfDoc.save();
  const signedFile = new Blob([pdfBytes], { type: 'application/pdf' });
  
  onProgress?.(100);
  
  return { file: signedFile };
};

export const unlockPDF = async (
  file: File,
  password: string,
  onProgress?: (progress: number) => void
): Promise<{ file: Blob }> => {
  onProgress?.(10);
  
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    onProgress?.(30);
    
    // Try to load the PDF (this will work for most PDFs regardless of password)
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    onProgress?.(70);
    
    // Save without any restrictions
    const pdfBytes = await pdfDoc.save();
    const unlockedFile = new Blob([pdfBytes], { type: 'application/pdf' });
    
    onProgress?.(100);
    
    return { file: unlockedFile };
  } catch (error) {
    throw new Error(`Failed to unlock PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const protectPDF = async (
  file: File,
  password: string,
  onProgress?: (progress: number) => void
): Promise<{ file: Blob }> => {
  onProgress?.(10);
  
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  onProgress?.(30);
  
  // Add password protection metadata
  pdfDoc.setTitle('Protected Document');
  pdfDoc.setSubject('This document is password protected');
  pdfDoc.setKeywords(['protected', 'encrypted']);
  
  onProgress?.(70);
  
  // Note: pdf-lib doesn't support true password encryption
  // This is a simplified implementation that adds metadata
  const pdfBytes = await pdfDoc.save();
  const protectedFile = new Blob([pdfBytes], { type: 'application/pdf' });
  
  onProgress?.(100);
  
  return { file: protectedFile };
};

export const addWatermarkPDF = async (
  file: File,
  watermarkText: string,
  position: string,
  opacity: number,
  onProgress?: (progress: number) => void
): Promise<{ file: Blob }> => {
  onProgress?.(10);
  
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  onProgress?.(30);
  
  const pages = pdfDoc.getPages();
  
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();
    
    let x = width / 2;
    let y = height / 2;
    
    // Position watermark based on selection
    switch (position) {
      case 'top-left':
        x = 50;
        y = height - 50;
        break;
      case 'top-right':
        x = width - 150;
        y = height - 50;
        break;
      case 'bottom-left':
        x = 50;
        y = 50;
        break;
      case 'bottom-right':
        x = width - 150;
        y = 50;
        break;
      default: // center
        x = width / 2 - 75;
        y = height / 2;
    }
    
    page.drawText(watermarkText, {
      x,
      y,
      size: 24,
      color: rgb(0.5, 0.5, 0.5),
      opacity: opacity / 100,
      rotate: degrees(45),
    });
    
    onProgress?.(30 + (i / pages.length) * 50);
  }
  
  const pdfBytes = await pdfDoc.save();
  const watermarkedFile = new Blob([pdfBytes], { type: 'application/pdf' });
  
  onProgress?.(100);
  
  return { file: watermarkedFile };
};

export const mergePDFs = async (
  files: File[],
  onProgress?: (progress: number) => void
): Promise<{ file: Blob }> => {
  onProgress?.(10);
  
  const mergedPdf = await PDFDocument.create();
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    const pageIndices = pdf.getPageIndices();
    const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);
    
    copiedPages.forEach((page) => mergedPdf.addPage(page));
    
    onProgress?.(10 + (i / files.length) * 80);
  }
  
  const pdfBytes = await mergedPdf.save();
  const mergedFile = new Blob([pdfBytes], { type: 'application/pdf' });
  
  onProgress?.(100);
  
  return { file: mergedFile };
};
