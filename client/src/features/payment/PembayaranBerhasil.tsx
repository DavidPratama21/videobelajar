import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/atoms/Button";
import PaymentProgress from "./components/PaymentProgress";

const PembayaranBerhasil = () => {
  return (
    <MainLayout>
      <div className="sm:max-w-[1440px] grid justify-items-center sm:mx-auto py-7 sm:pt-16 sm:pb-32 px-5 sm:px-25 gap-6 sm:gap-13">
        <PaymentProgress className="md:hidden" />
        <div className="sm:w-152 sm:mx-auto grid pt-6 px-5 pb-9 rounded-xl border border-other-border bg-other-primary text-center">
          <img
            src="/assets/images/donePayment.svg"
            alt="Done Payment"
            className="justify-self-center"
          />
          <div className="grid gap-5">
            {/* Frame 4439 */}
            <div className="grid gap-2.5">
              <p className="font-semibold text-xl leading-[120%] text-dark-primary">
                Pembayaran Berhasil!
              </p>
              <p className="leading-[140%] tracking-[0.2px] text-dark-secondary">
                Silakan cek email kamu untuk informasi lebih lanjut. Hubungi
                kami jika ada kendala.
              </p>
            </div>
            <Button to="/pesanan">Lihat Detail Pesanan</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PembayaranBerhasil;
