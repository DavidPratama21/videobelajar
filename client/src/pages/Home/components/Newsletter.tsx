import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Email mu apa atuh?");
      return;
    }
    try {
      const res = await axios.post<{ message: string }>(
        `${import.meta.env.VITE_API_URL}/subscribe`,
        { to: email }
      );
      toast.success(res.data.message);
      setEmail("");
    } catch (error: unknown) {
      const err = error as AxiosError<{ error?: string }>;
      toast.error(
        "Gagal nih :" + (err.response?.data?.error || err.message)
      );
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="grid h-[400px] px-5 rounded drop-shadow-[0_12px_45px_-10px_rgba(0,59,222,0.2)] bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('/CTA_bg.jpg')] bg-center bg-cover place-content-center">
      {/* 3756, Konten */}
      <div className="grid gap-10">
        {/* Newsletter */}
        <div className="text-center grid gap-1">
          <h3 className="text-base text-light-secondary font-medium leading-[140%] tracking-[0.2px] sm:text-lg">
            NEWSLETTER
          </h3>
          {/* Desc */}
          <div className="grid gap-2.5">
            <h2 className="text-2xl font-semibold leading-[110%] text-light-primary sm:text-[32px]">
              Mau Belajar Lebih Banyak?
            </h2>
            <p className="text-other-base-background text-sm leading-[140%] tracking-[0.2px] sm:w-[525px] sm:text-base">
              Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran
              spesial dari program-program terbaik hariesok.id
            </p>
          </div>
        </div>

        {/* 4812, Input Email */}
        <div className="grid gap-4 sm:flex sm:justify-between sm:bg-white sm:gap-5 sm:py-2 sm:pr-2 sm:pl-8 sm:rounded-[10px]">
          {/* 3794 */}
          <input
            type="text"
            value={email}
            placeholder="Masukkan Emailmu"
            onChange={handleChange}
            className="rounded-[10px] text-center py-2.5 pl-3 pr-2 bg-other-primary text-sm font-normal leading-[140%] tracking-[0.2px] placeholder-dark-secondary text-dark-secondary sm:p-0 sm:text-base sm:text-left sm:outline-none"
          />
          <button
            onClick={handleSubscribe}
            className="rounded-[10px] py-2.5 bg-secondary text-sm font-bold leading-[140%] tracking-[0.2px] text-light-primary sm:px-6.5 sm:text-base"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
