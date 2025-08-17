import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Contact, ContactData, contactSchema, ContactFormData } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import UploadImageGrid from '../common/UploadImageGrid';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

interface ContactFormProps {
  contact?: Contact | null;
  onSubmit: (data: ContactData) => void;
  onClose: () => void;
  isLoading: boolean;
  isOpen: boolean;
}

const defaultFormValues: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  photo: null,
};

const ContactForm: React.FC<ContactFormProps> = ({ 
  contact, 
  onSubmit, 
  onClose, 
  isLoading, 
  isOpen 
}) => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultFormValues,
  });

  // Update form data when contact changes
  useEffect(() => {
    if (contact) {
      form.reset({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        address: contact.address || '',
        photo: contact.photo || null,
      });
    }
  }, [contact]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      form.reset(defaultFormValues);
    }
  }, [isOpen]);

  const handleSubmit = (data: ContactFormData) => {
    const submitData = {
      ...data,
      photo: data.photo || undefined,
    };
    onSubmit(submitData);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {contact ? 'Edit Contact' : 'Add New Contact'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter contact name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Enter phone number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <UploadImageGrid
                      value={field.value}
                      onChange={field.onChange}
                      uploadUrl="/file/upload"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter address"
                      rows={3}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : (contact ? 'Update' : 'Create')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
