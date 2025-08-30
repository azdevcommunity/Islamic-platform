import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ({ clientPage, totalPages, buildPageLink, onPageChange }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than or equal to maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include first page
      pageNumbers.push(1)

      // Calculate start and end of page range
      let startPage = Math.max(2, clientPage - 1)
      let endPage = Math.min(totalPages - 1, clientPage + 1)

      // Adjust if we're at the beginning
      if (clientPage <= 2) {
        // endPage = 4
        endPage = 3
      }

      // Adjust if we're at the end
      if (clientPage >= totalPages - 1) {
        startPage = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...")
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...")
      }

      // Always include last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  if (totalPages <= 1) {
    return null
  }

  // Handle click for callback-based navigation
  const handlePageClick = (page) => {
    if (onPageChange && typeof page === 'number') {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {/* Previous Page Button */}
      <PaginationButton
        disabled={clientPage <= 1}
        onClick={() => handlePageClick(clientPage - 1)}
        href={buildPageLink ? (clientPage > 1 ? buildPageLink(clientPage - 1) : "#") : undefined}
        className="p-3 rounded-xl text-sm font-semibold flex items-center justify-center transition-all duration-300"
        aria-label="Əvvəlki səhifə"
      >
        <ChevronLeft className="h-5 w-5" />
      </PaginationButton>

      {/* First page link */}
      {pageNumbers[0] > 1 && (
        <PaginationButton
          onClick={() => handlePageClick(1)}
          href={buildPageLink ? buildPageLink(1) : undefined}
          className="px-4 py-3 rounded-xl text-sm font-semibold min-w-[44px] transition-all duration-300"
          aria-label="Birinci səhifə"
        >
          1
        </PaginationButton>
      )}

      {/* Ellipsis at the start */}
      {pageNumbers[0] > 2 && (
        <span className="px-2 py-3 text-sm font-medium text-gray-500">...</span>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => (
        <span key={index}>
          {page === "..." ? (
            <span className="px-2 py-3 text-sm font-medium text-gray-500">...</span>
          ) : (
            <PaginationButton
              onClick={() => handlePageClick(page)}
              href={buildPageLink ? buildPageLink(page) : undefined}
              className={`px-4 py-3 rounded-xl text-sm font-semibold min-w-[44px] transition-all duration-300 shadow-sm hover:shadow-md ${
                clientPage === page
                  ? "bg-gradient-to-r from-[#43b365] to-[#2d7a47] text-white scale-105"
                  : "bg-white text-gray-600 hover:bg-[#43b365] hover:text-white border border-gray-200 hover:scale-105"
              }`}
              aria-current={clientPage === page ? 'page' : undefined}
              aria-label={`Səhifə ${page}`}
            >
              {page}
            </PaginationButton>
          )}
        </span>
      ))}

      {/* Ellipsis at the end */}
      {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
        <span className="px-2 py-3 text-sm font-medium text-gray-500">...</span>
      )}

      {/* Last page link */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <PaginationButton
          onClick={() => handlePageClick(totalPages)}
          href={buildPageLink ? buildPageLink(totalPages) : undefined}
          className="px-4 py-3 rounded-xl text-sm font-semibold min-w-[44px] transition-all duration-300"
          aria-label="Sonuncu səhifə"
        >
          {totalPages}
        </PaginationButton>
      )}

      {/* Next Page Button */}
      <PaginationButton
        disabled={clientPage >= totalPages}
        onClick={() => handlePageClick(clientPage + 1)}
        href={buildPageLink ? (clientPage < totalPages ? buildPageLink(clientPage + 1) : "#") : undefined}
        className="p-3 rounded-xl text-sm font-semibold flex items-center justify-center transition-all duration-300"
        aria-label="Növbəti səhifə"
      >
        <ChevronRight className="h-5 w-5" />
      </PaginationButton>
    </div>
  )
}

// Helper component to handle both Link and button rendering
const PaginationButton = ({ children, onClick, href, disabled, className, ...props }) => {
  const baseClassName = `${className} ${
    disabled
      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
      : "bg-white text-gray-600 hover:bg-[#43b365] hover:text-white border border-gray-200 shadow-sm hover:shadow-md hover:scale-105"
  }`;

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={baseClassName}
      {...props}
    >
      {children}
    </button>
  );
};

export default Pagination

