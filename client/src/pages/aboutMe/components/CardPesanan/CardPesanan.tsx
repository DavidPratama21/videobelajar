import { rupiahFormat } from "../../../../utils/product";

interface CardPesananProps {
  noInvoice: string;
  waktuPembayaran: string;
  image: string;
  namaProduk: string;
  price: number;
  status: "belum bayar" | "gagal" | "berhasil";
}

const CardPesanan = ({
  noInvoice,
  waktuPembayaran,
  status,
  image,
  namaProduk,
  price,
}: CardPesananProps) => {
  return (
    <div className="grid rounded-[10px] border border-other-border">
      <div className="grid sm:flex sm:justify-between sm:items-center py-3 sm:py-4 px-4.5 sm:px-5 gap-3 border-b border-other-border bg-[#E2FCD9]/20 leading-[140%] tracking-[0.2px]">
        <div className="flex justify-between gap-2.5 sm:gap-6 font-medium">
          <div className="flex gap-2 items-center">
            <p className="hidden sm:inline text-lg text-dark-secondary">
              No. Invoice:
            </p>
            <p className="underline text-xs sm:text-lg text-info-default">
              {noInvoice}
            </p>
          </div>
          <div className="flex gap-2 items-center text-dark-secondary">
            <p className="hidden sm:inline text-lg">Waktu Pembayaran:</p>
            <p className="text-xs sm:text-lg">{waktuPembayaran}</p>
          </div>
        </div>
        <span
          className={`w-fit py-1 px-2.5 text-sm sm:text-base rounded-[10px] ${
            status === "gagal"
              ? "bg-error-background text-error-default"
              : status === "belum bayar"
              ? "bg-secondary-100 text-secondary"
              : "bg-success-background text-success-default "
          } `}
        >
          {status === "gagal"
            ? "Gagal"
            : status === "belum bayar"
            ? "Belum Bayar"
            : "Berhasil"}
        </span>
      </div>
      <div className="grid sm:flex py-3 px-4.5 sm:p-5 gap-2 sm:gap-9 border-b border-other-border bg-other-primary">
        <div className="flex gap-4 items-center">
          <img
            src={`./assets/images/products/${image}`}
            alt="Gambar Produk"
            className="size-13 rounded-[10px]"
          />
          <p className="font-medium text-lg leading-[140%] tracking-[0.2px] text-dark-primary">
            {namaProduk}
          </p>
        </div>
        {/* ----- */}
        <span className="hidden md:inline border border-other-border w-[1px] h-13"></span>
        <div className="grid gap-2">
          <p className="font-medium leading-[140%] tracking-[0.2px] text-dark-secondary">
            Harga
          </p>
          <p className="font-semibold text-lg leading-[120%] text-dark-primary">
            {rupiahFormat(price)}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center sm:gap-9 py-3 sm:py-4 px-4.5 sm:px-5 bg-[#E2FCD9]/20">
        <p className="font-medium text-xs sm:text-base text-dark-secondary leading-[140%] tracking-[0.2px]">
          Total Pembayaran
        </p>
        <p className="font-semibold sm:text-lg text-primary leading-[120%]">
          {rupiahFormat(price)}
        </p>
      </div>
    </div>
  );
};

export default CardPesanan;
