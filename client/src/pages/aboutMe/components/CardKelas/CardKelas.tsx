import { Link } from "react-router";
import { Clock, NotebookText } from "lucide-react";
import Button from "../../../../components/atoms/Button";
import ProgressBar from "./components/ProgressBar";

interface CardKelasProps {
  description: string;
  classImage: string;
  tutorName: string;
  tutorRole: string;
  workPlace: string;
  tutorImage: string;
  title: string;
  progress: number;
}

const CardKelas = ({
  description,
  classImage,
  title,
  tutorImage,
  tutorName,
  tutorRole,
  workPlace,
  progress,
}: CardKelasProps) => {
  return (
    <div className="grid rounded-[10px] border border-other-border">
      {/* Moduls & Status*/}
      <div className="flex items-center justify-between gap-3 py-3 sm:py-4 px-4.5 sm:px-5 border-b border-other-border bg-[#E2FCD9]/20 leading-[140%] tracking-[0.2px]">
        <div className="flex gap-1 text-dark-primary">
          <p className="font-medium text-xs sm:text-base">
            {/* //!buat selaras sama data asli & progress bar */}
            {progress === 100 ? "12 / 12 Modul" : "2 / 12 Modul"}
          </p>
          <p className="hidden sm:inline">Terselesaikan</p>
        </div>
        <span
          className={`w-fit py-1 px-2.5 rounded-[10px] text-sm sm:text-base ${
            progress === 100
              ? "bg-success-background text-success-default "
              : "bg-secondary-100 text-secondary"
          } `}
        >
          {progress === 100 ? "Selesai" : "Sedang Berjalan"}
        </span>
      </div>
      {/* Details */}
      <div className="grid sm:flex gap-2 sm:gap-9 py-3 px-4.5 sm:p-5 border-b border-other-border bg-other-primary">
        <img
          src={`./assets/images/products/${classImage}`}
          alt="Gambar Kelas"
          className="sm:size-43 object-cover rounded-[10px] aspect-video sm:aspect-square"
        />
        <div className="grid gap-2 sm:gap-4">
          <div className="grid gap-2">
            <p className="font-semibold sm:text-lg text-dark-primary leading-[120%]">
              {title}
            </p>
            <p className="hidden sm:inline text-dark-secondary leading-[140%] tracking-[0.2px]">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <img
              src={`./assets/images/tutors/${tutorImage}`}
              alt="Profile Image"
              className="h-9 aspect-square rounded-xl"
            />
            <div className="leading-[140%] tracking-[0.2px]">
              <p className="font-medium text-sm sm:text-base text-dark-primary">
                {tutorName}
              </p>
              <div className="flex gap-1 text-xs sm:text-sm text-dark-secondary">
                <p>{tutorRole}</p>
                <span>di</span>
                <span className="font-bold">{workPlace}</span>
              </div>
            </div>
          </div>
          {/* //! Selarasin sama DB */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-dark-secondary">
              <NotebookText />
              <p className="text-sm sm:text-base leading-[140%] tracking-[0.2px]">
                12 Modul
              </p>
            </div>
            <div className="flex gap-2 text-dark-secondary items-center">
              <Clock />
              <p className="text-sm leading-[140%] tracking-[0.2px] sm:text-base">
                360 Menit
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid sm:flex gap-3 sm:gap-9 py-3 sm:py-4 px-4.5 sm:px-5 bg-[#E2FCD9]/20">
        <div className="sm:w-1/2 flex items-center justify-between gap-3">
          <div className="flex gap-1 text-sm sm:text-base leading-[140%] tracking-[0.2px]">
            <p className="text-dark-secondary text-nowrap">Progres Kelas:</p>
            <p className="text-dark-primary font-medium">{progress}%</p>
          </div>
          <ProgressBar value={progress} />
        </div>
        <div className="sm:w-1/2 grid sm:flex gap-4">
          {progress === 100 ? (
            <Link
              to="/"
              className="sm:w-full sm:flex sm:place-items-center py-[7px] sm:py-2.5 px-5.5 sm:px-6.5 text-center text-primary font-bold text-sm sm:text-base border border-primary rounded-[10px] leading-[140%] tracking-[0.2px]"
            >
              Unduh Sertifikat
            </Link>
          ) : (
            ""
          )}
          <Link to="/video" className="w-full">
            <Button>
              {progress === 100
                ? "Lihat Detail Kelas"
                : "Lanjutkan Pembelajaran"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardKelas;
