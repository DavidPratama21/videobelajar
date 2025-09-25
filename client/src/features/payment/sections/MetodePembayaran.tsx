import { useState } from "react";
import { ChevronDown, ChevronUp, CircleCheck } from "lucide-react";
import Button from "../../../components/atoms/Button";
import { kRupiahFormat, priceWithDiscount } from "../../../utils/product";
import { usePaymentStore } from "../../../store/PaymentStore";

interface MetodePembayaranProps {
  id: number;
  name: string;
  price: number;
}

const discount = 50;
const adminCost = 7000;

const MetodePembayaran = ({ id, name, price }: MetodePembayaranProps) => {
  const [openSections, setOpenSections] = useState({
    bank: true,
    ewallet: true,
    kartu: true,
  });
  const { banks, eWallets, kartuKreditOrDebit } = usePaymentStore();
  const { selectedMethod, setSelectedMethod } = usePaymentStore();

  const totalPrice = priceWithDiscount(price, discount);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="grid gap-6 sm:gap-9 md:w-full">
      <div className="grid gap-5 sm:gap-6 p-5 sm:p-6 bg-other-primary rounded-[10px] border border-other-border">
        <p className="font-semibold text-lg sm:text-xl text-dark-primary">
          Metode Pembayaran
        </p>

        {/* Transfer Bank */}
        <div>
          <div
            onClick={() => toggleSection("bank")}
            className="flex items-center justify-between py-4 px-5 border border-other-border rounded-[10px] cursor-pointer"
          >
            <p className="font-bold">Transfer Bank</p>
            {openSections.bank ? <ChevronUp /> : <ChevronDown />}
          </div>
          {openSections.bank && (
            <div className="grid gap-2.5 mt-2">
              {banks.map((bank) => (
                <div
                  key={bank.name}
                  onClick={() =>
                    setSelectedMethod({
                      name: bank.name,
                      logo: `banks/${bank.logo}`,
                      type: "bank",
                    })
                  }
                  className={`flex justify-between items-center py-4 px-5 border rounded-[10px] cursor-pointer ${
                    selectedMethod?.name === bank.name
                      ? "border-primary bg-primary/5"
                      : "border-other-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`/assets/images/banks/${bank.logo}`}
                      alt={bank.name}
                      className="w-6 h-6 object-contain"
                    />
                    <p>Bank {bank.name}</p>
                  </div>
                  {selectedMethod?.name === bank.name && (
                    <CircleCheck className="text-primary" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* E-Wallet */}
        <div>
          <div
            onClick={() => toggleSection("ewallet")}
            className="flex items-center justify-between py-4 px-5 border border-other-border rounded-[10px] cursor-pointer"
          >
            <p className="font-bold">E-Wallet</p>
            {openSections.ewallet ? <ChevronUp /> : <ChevronDown />}
          </div>
          {openSections.ewallet && (
            <div className="grid gap-2.5 mt-2">
              {eWallets.map((wallet) => (
                <div
                  key={wallet.name}
                  onClick={() =>
                    setSelectedMethod({
                      name: wallet.name,
                      logo: `e-wallet/${wallet.logo}`,
                      type: "eWallet",
                    })
                  }
                  className={`flex justify-between items-center py-4 px-5 border rounded-[10px] cursor-pointer ${
                    selectedMethod?.name === wallet.name
                      ? "border-primary bg-primary/5"
                      : "border-other-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`/assets/images/e-wallet/${wallet.logo}`}
                      alt={wallet.name}
                      className="w-6 h-6 object-contain"
                    />
                    <p>{wallet.name}</p>
                  </div>
                  {selectedMethod?.name === wallet.name && (
                    <CircleCheck className="text-primary" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Kartu Kredit/Debit */}
        <div>
          <div
            onClick={() => toggleSection("kartu")}
            className="flex items-center justify-between py-4 px-5 border border-other-border rounded-[10px] cursor-pointer"
          >
            <p className="font-bold">Kartu Kredit/Debit</p>
            {openSections.kartu ? <ChevronUp /> : <ChevronDown />}
          </div>
          {openSections.kartu && (
            <div className="grid gap-2.5 mt-2">
              {kartuKreditOrDebit.map((card) => (
                <div
                  key={card.name}
                  onClick={() =>
                    setSelectedMethod({
                      name: card.name,
                      logo: `banks/${card.logo}`,
                      type: "card",
                    })
                  }
                  className={`flex justify-between items-center py-4 px-5 border rounded-[10px] cursor-pointer ${
                    selectedMethod?.name === card.name
                      ? "border-primary bg-primary/5"
                      : "border-other-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`/assets/images/banks/${card.logo}`}
                      alt={card.name}
                      className="h-5"
                    />
                    <p>{card.name}</p>
                  </div>
                  {selectedMethod?.name === card.name && (
                    <CircleCheck className="text-primary" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ringkasan */}
      <div className="grid gap-5 sm:gap-6 p-5 sm:p-6 rounded-[10px] border border-other-border bg-other-primary">
        <p className="font-semibold text-lg sm:text-xl text-dark-primary">
          Ringkasan Pesanan
        </p>
        <div className="flex justify-between">
          <p>{name}</p>
          <p className="line-through text-gray-400">{kRupiahFormat(price)}</p>
        </div>
        <div className="flex justify-between">
          <p>Diskon {discount}%</p>
          <p>{totalPrice}</p>
        </div>
        <div className="flex justify-between">
          <p>Biaya Admin</p>
          <p>{kRupiahFormat(adminCost)}</p>
        </div>
        <span className="w-full h-px bg-other-border" />
        <div className="flex justify-between font-bold">
          <p>Total Pembayaran</p>
          <p className="text-primary">
            {kRupiahFormat((price * (100 - discount)) / 100 + adminCost)}
          </p>
        </div>
        <Button
          to={`/pembayaran/${id}`}
          disabled={!selectedMethod}
        >
          Beli Sekarang
        </Button>
      </div>
    </div>
  );
};

export default MetodePembayaran;
