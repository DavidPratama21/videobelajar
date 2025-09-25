interface Props {
  desc: string;
}

const ProductDescription = ({ desc }: Props) => {
  return (
    <div className="grid gap-5 sm:gap-6 p-5 sm:p-6 bg-other-primary rounded-[10px] border border-other-border">
      <p className="font-semibold text-lg sm:text-[20px] text-dark-primary leading-[120%]">
        Deskripsi
      </p>
      <p className="text-sm sm:text-base text-dark-secondary leading-[140%] tracking-[0.2px]">
        {desc}
      </p>
    </div>
  );
};

export default ProductDescription;
