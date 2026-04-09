export async function uploadToR2(file: File, fileName: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', fileName);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  const data = await response.json();
  return data.url; // Public URL from Cloudflare R2
}

export function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${random}.${extension}`;
}
