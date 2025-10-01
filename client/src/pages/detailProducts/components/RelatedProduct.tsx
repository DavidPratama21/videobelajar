import { productStore } from "../../../store/ProductStore";
import Card from "../../../components/molecules/Card";

interface RPProps {
  currentId: number;
  studyField: string;
}

const RelatedProduct = ({ studyField, currentId }: RPProps) => {
  const { products } = productStore();

  const RelatedProducts = products.filter(
    (p) => p.studyfield === studyField && p.productid !== currentId
  );

  return (
    <div className="grid gap-6 sm:gap-8">
      <div className="grid gap-2.5">
        <h1 className="font-semibold text-2xl sm:text-[32px] text-dark-primary leading-[110%]">
          Video Pembelajaran Terkait Lainnya
        </h1>
        <p className="text-sm sm:text-base text-dark-secondary leading-[140%] tracking-[0.2px]">
          Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!Ekspansi
          Pengetahuan Anda dengan Rekomendasi Spesial Kami!
        </p>
      </div>
      {/* List card products */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-5 sm:gap-6">
        {RelatedProducts.length > 0 ? (
          RelatedProducts.map((p) => (
            <Card
              key={p.productid}
              to={p.productid}
              name={p.productname}
              description={p.description}
              price={p.price}
              image={p.image}
              rating={p.avgrating ?? 0}
              reviewers={p.totalreviewers ?? 0}
              tutor_name={p.tutors?.[0]?.tutorname ?? "Unknown"}
              tutor_role={p.tutors?.[0]?.tutorrole ?? "Unknown"}
              avatar={`/assets/images/tutors/${p.tutors?.[0]?.tutorphoto} ?? Unknown`}
              work_place={p.tutors?.[0]?.tutorworkplace ?? "Unknown"}
            />
          ))
        ) : (
          <p className="text-dark-secondary">
            Belum ada produk terkait di bidang ini.
          </p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;
