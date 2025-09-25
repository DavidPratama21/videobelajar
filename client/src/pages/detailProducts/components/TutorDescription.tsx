const TutorDescription = () => {
  return (
    // Ambil data2 dari tutor + desc pekerjaannya
    <div className="grid gap-5 sm:gap-6 p-5 sm:p-6 bg-other-primary rounded-[10px] border border-other-border">
      <p className="font-semibold text-lg sm:text-[20px] text-dark-primary leading-[120%]">
        Belajar bersama Tutor Profesional
      </p>
      <div className="grid sm:flex gap-4">
        {/* Tutor 1 */}
        <div className="grid p-4 sm:p-5 gap-3 sm:gap-4 bg-other-primary leading-[140%] tracking-[0.2px] border border-other-border rounded-[10px]">
          <div className="flex gap-2.5">
            <img
              src="./assets/images/tutors/1.png"
              alt="Avatar"
              className="size-10 rounded-[10px]"
            />
            <div className="">
              <p className="font-medium text-dark-primary">
                Gregorius Edrik Lawanto
              </p>
              <div className="flex gap-1 text-sm text-dark-secondary">
                <p>Senior Talent Acquisition</p>
                <p className="hidden sm:inline ">di</p>
                <p className="hidden sm:inline font-bold">WingsGroup</p>
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-dark-primary">
            Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja
            sebagai Senior Talent Acquisition Specialist di Wings Group
            Indonesia (Sayap Mas Utama) selama hampir 1 tahun.
          </p>
        </div>
        {/* Tutor 2 */}
        <div className="grid rounded-[10px] border p-4 gap-3 border-other-border bg-other-primary sm:p-5 sm:gap-4">
          <div className="flex gap-2.5">
            <img
              src="./assets/images/tutors/1.png"
              alt="Avatar"
              className="size-10 rounded-[10px]"
            />
            <div>
              <p className="font-medium leading-[140%] tracking-[0.2px] text-dark-primary">
                Gregorius Edrik Lawanto
              </p>
              <div className="flex gap-1 leading-[140%] text-sm tracking-[0.2px] text-dark-secondary">
                <p>Senior Talent Acquisition</p>
                <p className="hidden sm:inline ">di</p>
                <p className="hidden sm:inline font-bold">WingsGroup</p>
              </div>
            </div>
          </div>
          <p className="text-sm leading-[140%] tracking-[0.2px] text-dark-primary sm:text-base">
            Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja
            sebagai Senior Talent Acquisition Specialist di Wings Group
            Indonesia (Sayap Mas Utama) selama hampir 1 tahun.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorDescription;
