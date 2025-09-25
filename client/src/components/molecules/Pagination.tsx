import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage , onPageChange, itemPerPage, totalItems}) => {

  const totalPages = Math.ceil(totalItems / itemPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex justify-between items-center gap-1.5 sm:justify-end">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="grid rounded p-2 bg-other-base-background text-dark-primary disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Render nomor halaman */}
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            disabled={isActive}
            className={`grid font-semibold text-sm leading-[140%] tracking-[0.2px] rounded p-2 size-10 place-content-center ${
              isActive
                ? "text-light-primary bg-secondary cursor-default"
                : "text-dark-secondary bg-other-base-background hover:bg-orange-100"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="grid rounded p-2 bg-other-base-background text-dark-primary disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;
