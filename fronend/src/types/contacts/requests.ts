import { Contact } from './models';

export interface ContactResponse {
  data: Contact[];
  total: number;
}

export interface ContactDetailResponse {
  status: number;
  code: string;
  message: string | null;
  data: Contact;
}
