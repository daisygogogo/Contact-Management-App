import { api } from './api';

export interface UploadedFileInfo {
  path: string;
  name: string;
  ctrlType: string;
  size: number;
}

export const uploadService = {
  async uploadFile(file: File, uploadUrl: string): Promise<UploadedFileInfo> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // Map backend response to UploadedFileInfo interface
    const backendData = response.data.data;
    return {
      path: backendData.path,
      name: backendData.filename,
      ctrlType: backendData.mimetype,
      size: backendData.size
    };
  },
};
