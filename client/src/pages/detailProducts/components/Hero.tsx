type HeroProps = {
  name: string;
  image: string;
};

const Hero = ({ name, image }: HeroProps) => {
  return (
    // Nama gambar hero nya gambar card yg di klik ya
    <div
      className={`max-h-100 md:w-fit lg:w-full grid place-content-center gap-6 p-5 sm:pt-20.5 sm:pb-16 sm:px-25 rounded-[10px] bg-center bg-cover`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('/assets/images/products/${image}')`,
      }}
    >
      <div className="grid gap-3 text-light-primary">
        <h1 className="font-semibold text-2xl sm:text-[40px] leading-[140%] tracking-[0.2px]">
          {name}
        </h1>
        <p className="text-sm font-medium sm:text-base">
          Belajar bersama tutor profesional di Video Course. Kapanpun, di
          manapun.
        </p>
        {/* rating bintang */}
      </div>
    </div>
  );
};

export default Hero;
