export const CLOUDCONVERT_CONFIG = {
  BASE_URL: 'https://api.cloudconvert.com/v2',
  API_KEY: import.meta.env.VITE_CLOUDCONVERT_API_KEY,
};

export const CONVERSION_FORMATS = {
  // PDF to Office
  PDF_TO_DOCX: { from: 'pdf', to: 'docx', name: 'PDF to Word' },
  PDF_TO_XLSX: { from: 'pdf', to: 'xlsx', name: 'PDF to Excel' },
  PDF_TO_PPTX: { from: 'pdf', to: 'pptx', name: 'PDF to PowerPoint' },
  
  // Office to PDF
  DOCX_TO_PDF: { from: 'docx', to: 'pdf', name: 'Word to PDF' },
  XLSX_TO_PDF: { from: 'xlsx', to: 'pdf', name: 'Excel to PDF' },
  PPTX_TO_PDF: { from: 'pptx', to: 'pdf', name: 'PowerPoint to PDF' },
} as const;
