
export interface ContactData {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  photo?: string;
}

export interface Contact extends ContactData {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}