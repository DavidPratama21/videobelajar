import { useState } from "react";
import { Search } from "lucide-react";
import { productStore } from "../../../store/ProductStore";
import Tabs from "../../../components/molecules/Tabs";
import CardKelas from "../components/CardKelas/CardKelas";
import Pagination from "../../../components/molecules/Pagination";

const Kelas = () => {
  const [activeTab, setActiveTab] = useState<string>("All Class");
  const [currentPage, setcurrentPage] = useState(1);
  const { search, setSearch } = productStore();
  const TabsList = ["All Class", "Ongoing", "Done"];
  const ITEMS_PER_PAGE = 6;
  const filteredProducts = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="grid sm:w-full p-5 gap-6 sm:gap-8 bg-other-primary border border-other-border rounded-[10px]">
      <div className="grid sm:flex sm:justify-between sm:items-center gap-6 sm:gap-8">
        <Tabs
          TabsList={TabsList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="h-fit flex items-center sm:justify-between gap-2 pr-3 pl-[18px] py-3 rounded-[10px] border border-other-border bg-white text-dark-secondary">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari Kelas"
            className="flex-grow bg-transparent sm:max-w-48 outline-none text-base font-medium placeholder:text-dark-secondary"
            aria-label="Cari Kelas"
          />
          <Search size={20} />
        </div>
      </div>
      {/* //! nanti dibikin dengan map() ya, jadi selarasin user ada kelas apa aja */}
      {/* List Kelas */}
      <CardKelas
        title="Big 4 Auditor Financial Analyst"
        description="Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik"
        classImage="1.jpg"
        tutorImage="3.png"
        tutorName="John Cena"
        tutorRole="Manager"
        workPlace="Gojek"
        progress={100}
      />
      <CardKelas
        title="Big 4 Auditor Financial Analyst"
        description="Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik"
        classImage="2.jpg"
        tutorImage="2.png"
        tutorName="John Cena"
        tutorRole="Manager"
        workPlace="Gojek"
        progress={30}
      />
      <CardKelas
        title="Big 4 Auditor Financial Analyst"
        description="Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik"
        classImage="3.jpg"
        tutorImage="1.png"
        tutorName="John Cena"
        tutorRole="Manager"
        workPlace="Gojek"
        progress={70}
      />
      {/* //! ini selarasin, bikin jadi real */}
      <Pagination
        currentPage={currentPage}
        onPageChange={setcurrentPage}
        itemPerPage={ITEMS_PER_PAGE}
        totalItems={filteredProducts.length}
      />
    </div>
  );
};

export default Kelas;
