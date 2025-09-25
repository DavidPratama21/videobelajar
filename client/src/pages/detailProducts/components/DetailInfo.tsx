import {
  BookCheck,
  FileBadge,
  FileText,
  FilePenLine,
  Globe,
  Video,
} from "lucide-react";
import Button from "../../../components/atoms/Button";
import { kRupiahFormat, priceWithDiscount } from "../../../utils/product";

type DetailInfoProps = {
  id: number;
  name: string;
  price: number;
};

const DetailInfo = ({ id, name, price }: DetailInfoProps) => {
  // Edit able
  const discount = 50;

  return (
    // Buat sementara aja, sampai data nya sinkron
    <div className="sm:h-fit grid md:order-1 gap-5 sm:gap-6 p-5 sm:p-6 bg-other-primary rounded-[10px] border border-other-border">
      <div className="grid gap-3 sm:gap-4">
        <h2 className="font-semibold text-lg leading-[120%] text-dark-primary">
          {name}
        </h2>
        {/* Price & Discount */}
        <div className="flex justify-between items-end">
          {/* Price */}
          <div className="flex gap-2">
            <p className="font-semibold text-lg leading-[120%] text-primary">
              {priceWithDiscount(price, discount)}
            </p>
            <p className="font-medium leading-[140%] tracking-[0.2px] text-dark-disabled line-through">
              {kRupiahFormat(price)}
            </p>
          </div>
          {/* Discount */}
          <span className="px-2.5 py-1 text-xs text-light-primary leading-[140%] tracking-[0.2px] bg-secondary rounded-[10px]">
            Diskon {discount}%
          </span>
        </div>
        <p className="font-medium text-sm text-info-default eading-[140%] tracking-[0.2px]">
          Penawaran spesial tersisa 2 hari lagi!
        </p>
      </div>
      {/* To payment, kalo user belum login, login dulu */}
      <Button to={`/metodePembayaran/${id}`}>Beli Sekarang</Button>
      {/* //? === lebar mungkin bisa fleksibel === */}
      <div className="grid gap-4 w-72">
        <p className="font-semibold text-sm text-dark-primary leading-[21px]">
          Kelas Ini Sudah Termasuk
        </p>
        {/* //? === lebar mungkin bisa fleksibel === */}
        <div className="flex gap-4 sm:gap-0 w-72">
          {/* Left */}
          <div className="grid gap-4 w-35 text-sm text-dark-secondary leading-[140%] tracking-[0.2px]">
            <div className="flex items-center gap-2">
              <BookCheck size={24} />
              <p>Ujian Akhir</p>
            </div>
            <div className="flex items-center gap-2">
              <FileText size={24} />
              <p>7 Dokumen</p>
            </div>
            <div className="flex items-center gap-2">
              <FilePenLine size={24} />
              <p>Pretest</p>
            </div>
          </div>
          {/* Right */}
          {/* //? === lebar mungkin bisa fleksibel === */}
          <div className="h-fit w-35 grid gap-4 text-sm text-dark-secondary leading-[140%] tracking-[0.2px]">
            <div className="flex items-center gap-2">
              <Video size={24} />
              <p>49 Video</p>
            </div>
            <div className="flex items-center gap-2">
              <FileBadge size={24} />
              <p>Sertifikat</p>
            </div>
          </div>
        </div>
      </div>
      {/* Language */}
      <div className="grid gap-3">
        <p className="font-semibold text-sm leading-[21px] text-dark-primary">
          Bahasa Pengantar
        </p>
        <div className="flex gap-2 text-dark-secondary items-center">
          <Globe size={24} />
          <p className="text-sm leading-[140%] tracking-[0.2px]">
            Bahasa Indonesia
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
