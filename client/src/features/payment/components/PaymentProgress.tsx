import { useLocation } from "react-router";
import { Check } from "lucide-react";
type PaymentProgressProps = {
  className?: string;
};

const PaymentProgress = ({ className }: PaymentProgressProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const progress = [
    { path: "/metodePembayaran", label: "Pilih Metode" },
    { path: "/pembayaran", label: "Bayar" },
    { path: "/pembayaranBerhasil", label: "Selesai" },
  ];
  const normalizePath = (path: string) => {
    if (path.startsWith("/metodePembayaran")) return "/metodePembayaran";
    if (path.startsWith("/pembayaranBerhasil")) return "/pembayaranBerhasil";
    if (path.startsWith("/pembayaran")) return "/pembayaran";
    return path;
  };
  const currentStep = progress.findIndex(
    (p) => p.path === normalizePath(currentPath)
  );

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {progress.map((p, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        console.log(currentStep);

        return (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center size-8 rounded-full border-3 ${
                isActive
                  ? "border-success-default"
                  : isCompleted
                  ? "border-success-default"
                  : "border-other-border"
              }`}
            >
              {isCompleted ? (
                <Check className="size-5 text-success-default" />
              ) : (
                <div
                  className={`size-5 rounded-full
                    ${isActive ? "bg-success-default" : "bg-other-border"}
                  `}
                />
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                isActive
                  ? "text-success-default"
                  : isCompleted
                  ? "text-gray-500"
                  : "text-gray-400"
              }`}
            >
              {p.label}
            </span>
            {i < progress.length - 1 && (
              <div className="w-10 h-0.5 bg-other-border" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PaymentProgress;
