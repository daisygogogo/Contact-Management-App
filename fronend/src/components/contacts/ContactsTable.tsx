import React, { useState, useRef } from "react";
import { Contact, PaginationState, SortState } from '../../types';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import DataPagination from '../ui/DataPagination';
import SortableTableHeader, { SortableColumn } from '../common/SortableTableHeader';
import {formatDateTime} from '@/lib/utils'
import { Edit, Trash2, Eye } from "lucide-react";
import { ConfirmDialog } from "../common/ConfirmDialog";
import ContactsDetailDialog from "./ContactsDetailDialog";
import { CustomDialogRef } from "../common/CustomDialog";
import Avatar from '../ui/avatar';

interface ContactsTableProps {
  contacts: Contact[];
  isLoading: boolean;
  totalContacts: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onSort: (field: string) => void;
  sortState: SortState;
}

const ContactsTable: React.FC<ContactsTableProps> = ({
  contacts,
  totalContacts,
  pagination,
  onPaginationChange,
  onEdit,
  onDelete,
  onSort,
  sortState,
}) => {
  const detailDialogRef = useRef<CustomDialogRef>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const handleDetailClick = (contact: Contact) => {
    setSelectedContactId(contact.id);
    detailDialogRef.current?.open();
  };

  const columns: SortableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'createdAt', label: 'Created Time', sortable: true },
    { key: 'updatedAt', label: 'Updated Time', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false, align: 'right' }
  ];

  return (
    <>
      {/* Contacts Table */}
      <Card className="bg-secondary/30 border-secondary/50 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Contact List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <SortableTableHeader
              columns={columns}
              onSort={onSort}
              sortField={sortState.field}
              sortDirection={sortState.direction}
            />
            <TableBody>
              {contacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No contacts found
                  </TableCell>
                </TableRow>
              ) : (
                contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar
                          src={contact.photo}
                          alt={contact.name}
                          fallback={contact.name.charAt(0).toUpperCase()}
                          size="sm"
                          className="mr-3 flex-shrink-0"
                        />
                        <div className="text-sm font-medium">
                          {contact.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {contact.email || '-'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {contact.phone || '-'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDateTime(contact.createdAt)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDateTime(contact.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          onClick={() => handleDetailClick(contact)}
                          variant="ghost"
                          size="sm"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                        </Button>
                        <Button
                          onClick={() => onEdit(contact)}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                        </Button>
                        <ConfirmDialog
                          title="Delete Contact"
                          description={`Are you sure you want to delete '${contact.name}'? This action cannot be undone.`}
                          onConfirm={() => onDelete(contact)}
                          confirmText="Delete"
                          cancelText="Cancel"
                          variant="destructive"
                          trigger={
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                            </Button>
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <ContactsDetailDialog
        ref={detailDialogRef}
        contactId={selectedContactId || undefined}
        onClose={() => setSelectedContactId(null)}
      />

      {/* Pagination */}
      <DataPagination
        totalItems={totalContacts}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />
    </>
  );
};

export default ContactsTable;
