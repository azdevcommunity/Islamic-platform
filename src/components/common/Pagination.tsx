import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  clientPage: number;
  totalPages: number;
  buildPageLink?: (page: number) => string;
  onPageChange?: (page: number) => void;
}

const Pagination = ({ clientPage, totalPages, buildPageLink, onPageChange }: PaginationProps) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)

      let startPage = Math.max(2, clientPage - 1)
      let endPage = Math.min(totalPages - 1, clientPage + 1)

      if (clientPage <= 2) {
        endPage = 3
      }

      if (clientPage >= totalPages - 1) {
        startPage = totalPages - 3
      }

      if (startPage > 2) {
        pageNumbers.push("...")
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...")
      }

      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  if (totalPages <= 1) {
    return null
  }

  const handlePageClick = (page: number | string) => {
    if (onPageChange && typeof page === 'number') {
      onPageChange(page)
    }
  }

  return (
    <nav 
    style={{
      backgroundColor:"transparent"
    }}
      className="flex justify-center items-center gap-1 sm:gap-2 py-8 px-4 rounded-xl"
      aria-label="Səhifə naviqasiyası"
    >
      {/* Previous Page Button */}
      <PaginationButton
        disabled={clientPage <= 1}
        onClick={() => handlePageClick(clientPage - 1)}
        href={buildPageLink ? (clientPage > 1 ? buildPageLink(clientPage - 1) : undefined) : undefined}
        className="p-2.5 sm:p-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-300 flex items-center justify-center"
        aria-label="Əvvəlki səhifə"
      >
        <ChevronLeft className="h-5 w-5" />
      </PaginationButton>

      {/* First page link */}
      {pageNumbers[0] > 1 && (
        <PaginationButton
          onClick={() => handlePageClick(1)}
          href={buildPageLink ? buildPageLink(1) : undefined}
          className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300"
          aria-label="Birinci səhifə"
        >
          1
        </PaginationButton>
      )}

      {/* Ellipsis at the start */}
      {pageNumbers[0] > 2 && (
        <span className="px-2 py-2.5 text-sm font-medium text-gray-400">...</span>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => (
        <span key={index}>
          {page === "..." ? (
            <span className="px-2 py-2.5 text-sm font-medium text-gray-400">...</span>
          ) : (
            <PaginationButton
              onClick={() => handlePageClick(page)}
              href={buildPageLink ? buildPageLink(page) : undefined}
              className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                clientPage === page
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/20 scale-105 hover:bg-primary-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
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
        <span className="px-2 py-2.5 text-sm font-medium text-gray-400">...</span>
      )}

      {/* Last page link */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <PaginationButton
          onClick={() => handlePageClick(totalPages)}
          href={buildPageLink ? buildPageLink(totalPages) : undefined}
          className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300"
          aria-label="Sonuncu səhifə"
        >
          {totalPages}
        </PaginationButton>
      )}

      {/* Next Page Button */}
      <PaginationButton
        disabled={clientPage >= totalPages}
        onClick={() => handlePageClick(clientPage + 1)}
        href={buildPageLink ? (clientPage < totalPages ? buildPageLink(clientPage + 1) : undefined) : undefined}
        className="p-2.5 sm:p-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-300 flex items-center justify-center"
        aria-label="Növbəti səhifə"
      >
        <ChevronRight className="h-5 w-5" />
      </PaginationButton>
    </nav>
  )
}

// Helper component to handle both Link and button rendering
interface PaginationButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  [key: string]: any;
}

const PaginationButton = ({ children, onClick, href, disabled = false, className = '', ...props }: PaginationButtonProps) => {
  const baseClassName = `${className} ${
    disabled
      ? "bg-gray-50 text-gray-300 cursor-not-allowed opacity-50"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  }`

  if (href && !disabled) {
    return (
      <Link 
        href={href} 
        className={baseClassName} 
        onClick={(e) => {
          if (onClick) {
            onClick();
          }
        }}
        scroll={false}
        {...props}
      >
        {children}
      </Link>
    )
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
  )
}

export default Pagination

