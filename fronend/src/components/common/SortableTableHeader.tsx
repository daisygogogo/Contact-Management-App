import React from 'react';
import { TableHead, TableHeader, TableRow } from '../ui/table';
import { ChevronUp, ChevronDown } from 'lucide-react';

export interface SortableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

interface SortableTableHeaderProps {
  columns: SortableColumn[];
  onSort?: (field: string) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  columns,
  onSort,
  sortField,
  sortDirection,
}) => {
  const renderSortIcons = (field: string) => {
    const isActive = sortField === field;
    const isAsc = sortDirection === 'asc';
    
    return (
      <div className="flex flex-col ml-2">
        <ChevronUp 
          className={`h-3 w-3 ${isActive && isAsc ? 'text-primary' : 'text-muted-foreground'}`} 
        />
        <ChevronDown 
          className={`h-3 w-3 ${isActive && !isAsc ? 'text-primary' : 'text-muted-foreground'}`} 
        />
      </div>
    );
  };

  const handleSort = (column: SortableColumn) => {
    if (onSort && column.sortable !== false) {
      onSort(column.key);
    }
  };

  return (
    <TableHeader>
      <TableRow>
        {columns.map((column) => (
          <TableHead 
            key={column.key}
            className={`p-3 ${column.align === 'right' ? 'text-right' : column.align === 'center' ? 'text-center' : 'text-left'} ${
              column.sortable !== false && onSort 
                ? 'cursor-pointer hover:bg-muted/50 transition-colors' 
                : ''
            }`}
            onClick={() => handleSort(column)}
          >
            {column.sortable !== false && onSort ? (
              <div className={`flex items-center ${column.align === 'right' ? 'justify-end' : column.align === 'center' ? 'justify-center' : 'justify-start'}`}>
                {column.label}
                {renderSortIcons(column.key)}
              </div>
            ) : (
              column.label
            )}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default SortableTableHeader;
