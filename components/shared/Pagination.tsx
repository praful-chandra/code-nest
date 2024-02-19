"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn, getUrlQuery } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

type PaginationCompProps = {
  className?: string;
  totalPages?: number;
};

const PaginationComp = ({ className, totalPages = 1 }: PaginationCompProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageQuery = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(
    pageQuery ? Number(pageQuery) : 1
  );
  const [toShowPages, setToShowPages] = useState(0);
  const totalSetOfPages = Math.ceil(totalPages / 5);

  const handlePageChange = useMemo(
    () => (value: string) => {
      const newUrl = getUrlQuery({
        searchParams: searchParams.toString(),
        key: "page",
        value,
      });
      router.push(newUrl, { scroll: false });
    },
    [router, searchParams]
  );

  useEffect(() => {
    handlePageChange(String(currentPage));
    const currentShowPage = Math.ceil(currentPage / 5);
    setToShowPages(currentShowPage - 1);
  }, [currentPage, handlePageChange]);

  const handleShowNextSetOfPages = () => {
    setToShowPages((v) => {
      if (v + 1 <= totalSetOfPages) {
        return v + 1;
      }

      return v;
    });
  };

  const handleShowPrevSetOfPages = () => {
    setToShowPages((v) => {
      if (v - 1 >= 0) {
        return v - 1;
      }

      return v;
    });
  };

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              setCurrentPage((p) => p - 1);
            }}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        {toShowPages > 0 && (
          <PaginationItem>
            <PaginationEllipsis onClick={handleShowPrevSetOfPages} />
          </PaginationItem>
        )}
        {Array.from(Array(totalPages), (x, i) => i + 1)
          .splice(toShowPages * 5, 5)
          .map((indVal) => (
            <PaginationItem key={`pagination number ${indVal}`}>
              <PaginationLink
                isActive={currentPage === indVal}
                onClick={() => {
                  setCurrentPage(indVal);
                }}
              >
                {indVal}
              </PaginationLink>
            </PaginationItem>
          ))}

        {toShowPages < totalSetOfPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis onClick={handleShowNextSetOfPages} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              setCurrentPage((p) => p + 1);
            }}
            disabled={Number(pageQuery) === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
