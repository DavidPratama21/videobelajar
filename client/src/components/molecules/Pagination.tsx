import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// interface Card {
//   id: number;
//   title: string;
// }

// const cardsData: Card[] = Array.from({ length: 30 }, (_, i) => ({
//   id: i + 1,
//   title: `Card ${i + 1}`,
// }));

const ITEMS_PER_PAGE = 4;

const Pagination = ({cardData= []}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cardData.length / ITEMS_PER_PAGE);

  // Hitung data yang akan ditampilkan di halaman sekarang
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCards = cardData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Tampilkan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        {currentCards.map((card) => (
          <div
            key={card.id}
            className="p-4 border rounded shadow text-center"
          >
            {card.name}
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center gap-1.5 sm:justify-end">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="grid rounded p-2 bg-other-base-background text-dark-primary disabled:opacity-50"
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
              className={`grid font-semibold text-sm leading-[140%] tracking-[0.2px] rounded p-2 size-10 place-content-center ${
                isActive
                  ? "text-light-primary bg-secondary"
                  : "text-dark-secondary bg-other-base-background"
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
          className="grid rounded p-2 bg-other-base-background text-dark-primary disabled:opacity-50"
          aria-label="Next page"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
