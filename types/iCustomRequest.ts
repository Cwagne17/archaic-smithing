export interface iCustomRequest {
  id: string;
  title: string;
  name: string;
  email: string;
  description: string;
  fileUrls?: string[];
  status: 'pending' | 'handled';
  createdAt: string;
  updatedAt: string;
}
