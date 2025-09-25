// store/paymentStore.ts
import { create } from "zustand";

export interface PaymentMethod {
  logo: string;
  name: string;
  type: "bank" | "eWallet" | "card";
}

interface PaymentState {
  banks: PaymentMethod[];
  eWallets: PaymentMethod[];
  kartuKreditOrDebit: PaymentMethod[];
  selectedMethod: PaymentMethod | null;
  setSelectedMethod: (method: PaymentMethod) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  banks: [
    { logo: "bca.png", name: "BCA", type: "bank" },
    { logo: "bni.png", name: "BNI", type: "bank" },
    { logo: "bri.png", name: "BRI", type: "bank" },
    { logo: "mandiri.png", name: "Mandiri", type: "bank" },
  ],
  eWallets: [
    { logo: "dana.png", name: "Dana", type: "eWallet" },
    { logo: "ovo.png", name: "OVO", type: "eWallet" },
    { logo: "linkAja.png", name: "LinkAja", type: "eWallet" },
    { logo: "shopeePay.png", name: "Shopee Pay", type: "eWallet" },
  ],
  kartuKreditOrDebit: [
    { logo: "master.png", name: "Master Card", type: "card" },
    { logo: "visa.png", name: "Visa", type: "card" },
    { logo: "jcb.png", name: "JCB", type: "card" },
  ],
  selectedMethod: null,
  setSelectedMethod: (method) => set({ selectedMethod: method }),
}));
