import React, { useState, useEffect } from 'react';
import { Plus, Download, Search } from 'lucide-react';
import { Contact, ContactData, PaginationState, SortState } from '../types';
import { contactService } from '../services/contact';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { LoadingWrapper } from '../components/ui/loading';
import ContactsTable from '../components/contacts/ContactsTable';
import ContactForm from '../components/contacts/ContactForm';
import { useDebounce } from '../hooks/useDebounce';
import { useNotification } from '../hooks/useNotification';


const Contacts: React.FC = () => {
  const { showSuccess } = useNotification();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalContacts, setTotalContacts] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortState, setSortState] = useState<SortState>({
    field: 'updatedAt',
    direction: 'desc'
  });
  
  // Use debounced search term for API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  
  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load contacts
  const loadContacts = async () => {
    try {
      setIsLoading(true);
      const response = await contactService.getContacts({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        filtersKeyWord: debouncedSearchTerm || undefined,
        sortBy: sortState,
      });
      
      if (response && response.data) {
        setContacts(response.data.data || []);
        setTotalContacts(response.data.total || 0);
      }
    } catch (error) {
      console.error('Failed to load contacts:', error);
      setContacts([]);
      setTotalContacts(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, [pagination, debouncedSearchTerm, sortState]);

  // Handle contact creation/update
  const handleSubmit = async (data: ContactData) => {
    try {
      setIsSubmitting(true);
      
      if (selectedContact) {
        await contactService.updateContact(selectedContact.id, data);
        showSuccess('Contact updated successfully');
      } else {
        await contactService.createContact(data as ContactData);
        showSuccess('Contact created successfully');
      }
      
      setIsFormOpen(false);
      setSelectedContact(null);
      loadContacts();
    } catch (error) {
      console.error('Failed to save contact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle contact deletion
  const handleDelete = async (contact: Contact) => {
    try {
      await contactService.deleteContact(contact.id);
      showSuccess('Contact deleted successfully');
      loadContacts();
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }  
  };

  // Handle sorting
  const handleSort = (field: string) => {
    setSortState(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Export contacts as CSV
  const handleExportCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Address', 'Created Date'],
      ...contacts.map(contact => [
        contact.name,
        contact.email || '',
        contact.phone || '',
        contact.address || '',
        new Date(contact.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.csv';
    window.URL.revokeObjectURL(url);
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground mt-2">
            Manage your contacts and stay organized
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleExportCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search contacts by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex-1"></div>
      </div>

      {/* Contacts Table with Loading Wrapper */}
      <LoadingWrapper isLoading={isLoading} text="Loading contacts...">
        <ContactsTable
          contacts={contacts}
          isLoading={false}
          totalContacts={totalContacts}
          pagination={pagination}
          onPaginationChange={setPagination}
          onEdit={(contact) => {
            setSelectedContact(contact);
            setIsFormOpen(true);
          }}
          onDelete={handleDelete}
          onSort={handleSort}
          sortState={sortState}
        />
      </LoadingWrapper>

      {/* Contact Form Dialog */}
      <ContactForm
        contact={selectedContact}
        onSubmit={handleSubmit}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedContact(null);
        }}
        isLoading={isSubmitting}
        isOpen={isFormOpen}
      />
    </div>
  );
};

export default Contacts;
