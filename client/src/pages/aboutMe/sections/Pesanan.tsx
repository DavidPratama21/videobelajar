import { useState } from "react";
import Tabs from "../../../components/molecules/Tabs";
import SortSearch from "../../../components/molecules/SortSearch";
import CardPesanan from "../components/CardPesanan/CardPesanan";

const TabsList = ["Semua Pesanan", "Menunggu", "Berhasil", "Gagal"];

const Pesanan = () => {
  const [activeTab, setActiveTab] = useState<string>("Semua Pesanan");
  return (
    <div className="sm:w-full grid gap-6 p-5 rounded-[10px] border border-other-border bg-other-primary">
      <div className="grid sm:flex gap-6">
        <Tabs
          TabsList={TabsList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <SortSearch />
      </div>
      {/* List Card Order */}
      <CardPesanan
        noInvoice="HEL/VI/10062023"
        waktuPembayaran="10 Juni 2023, 14.17"
        namaProduk= "Belajar Microsoft Office dan Google Workspace untuk Pemula"
        status="berhasil"
        image="1.jpg"
        price={300000}
      />
      <CardPesanan
        noInvoice="HEL/VI/10062023"
        waktuPembayaran="10 Juni 2023, 14.17"
        namaProduk= "Belajar Microsoft Office dan Google Workspace untuk Pemula"
        status="gagal"
        image="1.jpg"
        price={50000}
      />
      <CardPesanan
        noInvoice="HEL/VI/10062023"
        waktuPembayaran="10 Juni 2023, 14.17"
        namaProduk= "Belajar Microsoft Office dan Google Workspace untuk Pemula"
        status="belum bayar"
        image="1.jpg"
        price={257000}
      />
      {/* <Pagination /> */}
    </div>
  );
};

export default Pesanan;
