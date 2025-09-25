import Button from "../../../components/atoms/Button";

const Hero = () => {
  return (
    <div className="grid justify-items-center rounded-[10px] py-16 sm:pt-20.5 sm:pb-16 px-5 sm:px-35 gap-6 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('/Hero_bg.jpg')] bg-center bg-cover  text-center text-light-primary">
      <div className="grid gap-3">
        <h1 className="font-bold text-2xl leading-[110%] sm:text-5xl text-">
          Revolusi Pembelajaran: Temukan Ilmu Baru melalui PLatform Video
          Interaktif!
        </h1>
        <p className="font-medium leading-[140%] tracking-[0.2px] text-sm sm:text-base">
          Temukan ilmu baru yang menarik dan mendalam melalui koleksi video
          pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat
          berpartisipasi dalam latihan interaktif yang akan meningkatkan
          pemahaman Anda.
        </p>
      </div>

      {/* Button */}
      <Button href="#main">Temukan Video Course untuk Dipelajari!</Button>
    </div>
  );
};

export default Hero;
