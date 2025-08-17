import React, { forwardRef, useEffect, useState } from 'react';
import { Contact } from '../../types';
import { CustomDialog, CustomDialogRef } from '../common/CustomDialog';
import { contactService } from '../../services/contact';
import { LoadingSpinner } from '../ui/loading';
import { formatDateTime } from '@/lib/utils';
import Avatar from '../ui/avatar';

interface ContactsDetailDialogProps {
  contactId?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

const ContactsDetailDialog = forwardRef<CustomDialogRef, ContactsDetailDialogProps>(
  ({ contactId, onOpen, onClose }, ref) => {
    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchContactDetails = async (id: string) => {
      setLoading(true);
      setContact(null); // Reset contact when starting new fetch
      
      try {
        const detailedContact = await contactService.getContact(id);
        setContact(detailedContact.data);
      } catch (err) {
        console.error('Failed to fetch contact details:', err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (contactId) {
        fetchContactDetails(contactId);
      }
    }, [contactId]);

    const handleOpen = () => {
      if (contactId) {
        fetchContactDetails(contactId);
      }
      onOpen?.();
    };

    const handleClose = () => {
      setContact(null);
      onClose?.();
    };

    return (
      <CustomDialog
        ref={ref}
        title="Contact Details"
        size="xl"
        onOpen={handleOpen}
        onClose={handleClose}
      >
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : contact && contact.name ? (
          <div className="space-y-6">
            {/* Header with avatar and basic info */}
            <div className="flex items-center space-x-4">
              <Avatar
                src={contact.photo}
                alt={contact.name}
                fallback={contact.name.charAt(0).toUpperCase()}
                size="xl"
              />
              <div>
                <h3 className="text-2xl font-semibold">{contact.name}</h3>
                <p className="text-muted-foreground text-lg">
                  {contact.email || 'No email provided'}
                </p>
              </div>
            </div>
            
            {/* Contact details grid */}
            <div className="space-y-4">
            <div className="flex items-center">
                <label className="text-sm font-medium text-muted-foreground w-32 flex-shrink-0">
                  Contact ID
                </label>
                <p className="text-sm font-mono text-muted-foreground px-2 py-1 rounded">
                  {contact.id}
                </p>
              </div>

              <div className="flex items-center">
                <label className="text-sm font-medium text-muted-foreground w-32 flex-shrink-0">
                  Phone Number
                </label>
                <p className="text-base">
                  {contact.phone}
                </p>
              </div>  


              <div className="flex items-center">
                <label className="text-sm font-medium text-muted-foreground w-32 flex-shrink-0">
                  Address
                </label>
                <p className="text-base">
                  {contact.address || '-'}
                </p>
              </div>  
              
              <div className="flex items-center">
                <label className="text-sm font-medium text-muted-foreground w-32 flex-shrink-0">
                  Created Date
                </label>
                <p className="text-base">
                  {formatDateTime(contact.createdAt)}
                </p>
              </div>
              
              <div className="flex items-center">
                <label className="text-sm font-medium text-muted-foreground w-32 flex-shrink-0">
                  Last Updated
                </label>
                <p className="text-base">
                  {formatDateTime(contact.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No contact data available
          </div>
        )}
      </CustomDialog>
    );
  }
);

ContactsDetailDialog.displayName = 'ContactsDetailDialog';

export default ContactsDetailDialog;
