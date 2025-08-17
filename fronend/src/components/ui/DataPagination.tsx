import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './pagination';
import { PaginationState } from '../../types';

interface DataPaginationProps {
  totalItems: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  className?: string;
}

const DataPagination: React.FC<DataPaginationProps> = ({
  totalItems,
  pagination,
  onPaginationChange,
  className = "",
}) => {
  const totalPages = Math.ceil(totalItems / pagination.pageSize);
  
  const handlePageChange = (pageIndex: number) => {
    onPaginationChange({ ...pagination, pageIndex });
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    for (let i = 0; i < totalPages; i++) {
      // Show first page, last page, current page, and pages around current page
      const shouldShow = 
        i === 0 || 
        i === totalPages - 1 || 
        Math.abs(i - pagination.pageIndex) <= 1;
      
      if (!shouldShow) {
        // Show ellipsis for gaps
        if (i === 1 || i === totalPages - 2) {
          pages.push(
            <PaginationItem key={`ellipsis-${i}`}>
              <span className="px-4 py-2 text-sm text-muted-foreground">...</span>
            </PaginationItem>
          );
        }
        continue;
      }
      
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            isActive={i === pagination.pageIndex}
            size="default"
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pages;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(pagination.pageIndex - 1);
            }}
            className={pagination.pageIndex === 0 ? "pointer-events-none opacity-50" : ""}
            size="default"
          />
        </PaginationItem>
        
        {renderPageNumbers()}
        
        <PaginationItem>
          <PaginationNext 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(pagination.pageIndex + 1);
            }}
            className={pagination.pageIndex >= totalPages - 1 ? "pointer-events-none opacity-50" : ""}
            size="default"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DataPagination;
