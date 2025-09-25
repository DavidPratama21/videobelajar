const PaymentTimer = () => {
  const time = ["00", "50", "55"]; // jam, menit, detik

  return (
    <div className="flex place-content-center py-3 gap-2 sm:gap-4 bg-tertiary-100">
      <p className="flex items-center font-medium text-sm sm:text-lg text-dark-secondary leading-[140%] tracking-[0.2px]">
        Selesaikan pemesanan dalam
      </p>
      <div className="flex items-center gap-1 sm:gap-2.5 font-bold leading-[140%] tracking-[0.2px]">
        {time.map((t, i) => (
          <span key={i} className="flex items-center gap-1 sm:gap-2.5">
            <span className="p-1 text-xs sm:text-base text-white rounded bg-tertiary">
              {t}
            </span>
            {i < time.length - 1 && (
              <p className="text-dark-secondary">:</p>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PaymentTimer;
