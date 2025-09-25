
const RatingAndReview = () => {
  return (
    //? bikin data dummy testimoni
    <div className="grid gap-5 sm:gap-6 p-5 sm:p-6 bg-other-primary rounded-[10px] border border-other-border">
      <p className="font-semibold text-lg leading-[120%] text-dark-primary sm:text-[20px]">
        Rating dan Review
      </p>
      <div className="grid gap-4 sm:flex">
        <div className="grid rounded-[10px] border p-4 gap-3 border-other-border bg-other-primary sm:p-5 sm:gap-4">
          <div className="flex gap-2.5">
            <img src="./assets/images/tutors/1.png" alt="Avatar" className="size-10 rounded-[10px]" />
            <div className="grid leading-[140%] tracking-[0.2px]">
              <p className="font-medium  text-dark-primary">
                Gregorius Edrik Lawanto
              </p>
              <p className="text-dark-secondary text-sm">Alumni Batch 2</p>
            </div>
          </div>
          <p className="text-sm leading-[140%] tracking-[0.2px] text-dark-primary sm:text-base">
            Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja
            sebagai Senior Talent Acquisition Specialist di Wings Group
            Indonesia (Sayap Mas Utama) selama hampir 1 tahun.
          </p>
          <div className="flex gap-2">
            {/* Rating Bintang*/}
            <p className="font-medium text-xs leading-[140%] tracking-[0.2px] text-dark-secondary sm:text-sm">
              3.5
            </p>
          </div>
        </div>
        <div className="grid rounded-[10px] border p-4 gap-3 border-other-border bg-other-primary sm:p-5 sm:gap-4">
          <div className="flex gap-2.5">
            <img src="./assets/images/tutors/1.png" alt="Avatar" className="size-10 rounded-[10px]" />
            <div className="grid leading-[140%] tracking-[0.2px]">
              <p className="font-medium  text-dark-primary">
                Gregorius Edrik Lawanto
              </p>
              <p className="text-dark-secondary text-sm">Alumni Batch 4</p>
            </div>
          </div>
          <p className="text-sm leading-[140%] tracking-[0.2px] text-dark-primary sm:text-base">
            Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja
            sebagai Senior Talent Acquisition Specialist di Wings Group
            Indonesia (Sayap Mas Utama) selama hampir 1 tahun.
          </p>
          <div className="flex gap-2">
            {/* Rating  bintang*/}
            <p className="font-medium text-xs leading-[140%] tracking-[0.2px] text-dark-secondary sm:text-sm">
              3.5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingAndReview;
