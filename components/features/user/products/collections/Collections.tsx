"use client";
import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useCollections } from "@/lib/api/hooks/useProducts";
import CollectionsHeader from "./CollectionsHeader";
import CollectionCardGrid from "./CollectionsGrid";

export default function Collections() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data, isLoading } = useCollections({
    page: currentPage,
    limit: rowsPerPage,
    search: debouncedSearchTerm,
  });

  const collections = (data as any)?.collections || [];
  const totalCount = (data as any)?.total || 0;

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  return (
    <div className="space-y-4">
      <CollectionsHeader
        data={data as any}
        loading={isLoading}
        onSearch={handleSearch}
        searchValue={searchTerm}
      />
      <CollectionCardGrid
        collections={collections}
        loading={isLoading}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        searchValue={searchTerm}
      />
    </div>
  );
}
