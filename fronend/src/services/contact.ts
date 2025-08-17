import { api } from './api';
import { Contact, ContactData, ContactResponse, ContactDetailResponse, SortState } from '../types';

export const contactService = {
  async getContacts(params: {
    page: number;
    pageSize: number;
    filtersKeyWord?: string;
    sortBy?: SortState;
  }): Promise<{
    status: number;
    code: string;
    message: string | null;
    data: ContactResponse;
  }> {
    const response = await api.get('/contacts', { params });
    return response.data;
  },

  async getContact(id: string): Promise<ContactDetailResponse> {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  async createContact(data: ContactData): Promise<Contact> {
    const response = await api.post('/contacts', data);
    return response.data;
  },

  async updateContact(id: string, data: ContactData): Promise<Contact> {
    const response = await api.put(`/contacts/${id}`, data);
    return response.data;
  },

  async deleteContact(id: string): Promise<void> {
    await api.delete(`/contacts/${id}`);
  },
};
