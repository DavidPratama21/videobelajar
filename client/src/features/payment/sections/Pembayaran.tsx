import { usePaymentStore } from "../../../store/PaymentStore";
import Button from "../../../components/atoms/Button";
import { ChevronDown } from "lucide-react";
const Pembayaran = () => {
  const { selectedMethod } = usePaymentStore();
  if (!selectedMethod) {
    return <p>Belum pilih metode pembayaran</p>;
  }
  const id = 1;
  return (
    <div className="grid gap-6 sm:gap-9 md:w-full">
      {/* Masih ada yg belum di edit */}
      <div className="grid p-5 gap-5 bg-other-primary rounded-[10px] border border-other-border sm:gap-9 sm:p-6">
        <div className="grid gap-6">
          <h5 className="font-semibold text-lg leading-[120%] text-dark-primary sm:text-xl">
            Metode Pembayaran
          </h5>
          <div className="grid place-items-center py-9 px-4.5 gap-3 bg-light-primary rounded-xl border border-other-border leading-[140%] tracking-[0.2px]">
            <img
              src={`/assets/images/${selectedMethod.logo}`}
              alt={`${selectedMethod.name} Logo`}
              className="w-29.5"
            />
            {selectedMethod.type === "bank" && (
              <p className="font-medium sm:text-lg text-dark-primary">
                Bayar Melalui Virtual Account {selectedMethod.name}
              </p>
            )}
            {selectedMethod.type === "eWallet" && (
              <p className="font-medium sm:text-lg text-dark-primary">
                Bayar Melalui {selectedMethod.name}
              </p>
            )}
            {/* //? kalo mau improve lagi bole */}
            {selectedMethod.type === "card" && (
              <p className="font-medium sm:text-lg text-dark-primary">
                Bayar Melalui Kartu {selectedMethod.name}
              </p>
            )}
            <div className="flex items-center gap-3 font-bold">
              <p className="text-dark-secondary sm:text-lg">
                11739 081234567890
              </p>
              <p className="text-sm sm:text-base text-tertiary">Salin</p>
            </div>
          </div>
        </div>
        {/* Belum edit lagi */}
        <div className="grid gap-5 sm:gap-6">
          <p className="font-semibold text-lg leading-[120%] text-dark-primary sm:text-xl">
            Ringkasan Pesanan
          </p>
          {/* Frame 3884 */}
          <div className="flex justify-between leading-[140%] tracking-[0.2px] text-dark-secondary sm:text-lg">
            <p className="sm:hidden">Total Harga (3 Barang)</p>
            <p className="hidden sm:inline">
              Video Learning: Gapai Karier Impianmu sebagai Seorang <br /> UI/UX
              Designer & Product Manager.{" "}
            </p>
            <p className="font-bold">Rp 767.500</p>
          </div>
          {/* Frame 3885 */}
          <div className="flex justify-between leading-[140%] tracking-[0.2px] text-dark-secondary sm:text-lg">
            <p>Biaya Admin</p>
            <p className="font-bold">Rp 7.000</p>
          </div>
          <span className="w-full h-px bg-other-border"></span>
          {/* Frame 42250 */}
          <div className="flex justify-between">
            <p className="font-bold leading-[140%] tracking-[0.2px] text-dark-primary sm:text-lg">
              Total Pembayaran
            </p>
            <p className="font-semibold text-lg leading-[120%] text-primary sm:text-xl">
              Rp 7.000
            </p>
          </div>
        </div>
        {/* Belum Edit lagi */}
        <div className="grid gap-4 md:grid-cols-2 md:items-center">
          {/* Ganti Metode */}
          <Button
            to={`/metodePembayaran/${id}`}
            style="reverse"
            className="border border-primary"
          >
            Ganti Metode Pembayaran
          </Button>
          {/* Beli skrg */}
          <Button to={`/pembayaranBerhasil/${id}`}>Beli Sekarang</Button>
        </div>
      </div>
      {/* Masih belum di edit */}
      <div className="grid gap-5 p-5 rounded-[10px] border border-other-border bg-other-primary sm:gap-6 sm:p-6">
        <p className="font-semibold text-xl leading-[120%] text-dark-primary">
          Tata Cara Pembayaran
        </p>
        {/* Frame 3838 */}
        <div className="grid gap-2.5">
          {/* Tranfer Bank */}
          <div className="border border-other-border rounded-xl py-4 px-5 gap-4">
            <div className="flex justify-between">
              <p className="text-dark-primary font-bold leading-[140%] tracking-[0.2px]">
                ATM BCA
              </p>
              <ChevronDown color="#333333AD" />
            </div>
            <ol className="list-decimal pl-5 sm:text-lg">
              <li>Masukkan kartu ATM dan PIN BCA Anda</li>
              <li>
                Di menu utama, pilih "Transaksi Lainnya". Pilih "Transfer".
                Pilih "Ke BCA Virtual Account"
              </li>
              <li>Masukkan nomor Virtual Account</li>
              <li>
                Pastikan data Virtual Account Anda benar, kemudian masukkan
                angka yang perlu Anda bayarkan, kemudian pilih "Benar"
              </li>
              <li>
                Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika
                sudah benar pilih "Ya", atau pilih "Tidak" jika data di layar
                masih salah
              </li>
              <li>
                Transaksi Anda sudah selesai. Pilih "Tidak" untuk tidak
                melanjutkan transaksi lain
              </li>
            </ol>
          </div>
          {/* E-wallet */}
          <div className="flex justify-between py-4 px-5 border border-other-border rounded-xl">
            <p className="text-dark-primary font-bold leading-[140%] tracking-[0.2px]">
              Mobile Banking BCA
            </p>
            <ChevronDown color="#333333AD" />
          </div>
          {/* Kartu Kredit/Debit */}
          <div className="flex justify-between py-4 px-5 border border-other-border rounded-xl">
            <p className="text-dark-primary font-bold leading-[140%] tracking-[0.2px]">
              Internet Banking BCA
            </p>
            <ChevronDown color="#333333AD" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pembayaran;
