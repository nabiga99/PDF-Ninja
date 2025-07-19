export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const validateFile = (file: File, allowedTypes: string[]): string | null => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return 'File size must be less than 100MB';
  }

  // Check file type
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!allowedTypes.includes(fileExtension)) {
    return `File type not supported. Allowed types: ${allowedTypes.join(', ')}`;
  }

  return null;
};
