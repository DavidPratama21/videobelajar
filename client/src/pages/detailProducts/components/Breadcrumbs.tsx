import { Link, useLocation } from "react-router";

type BreadcrumbsProps = {
  product: string;
  studyField: string;
};

const Breadcrumbs = ({ product, studyField }: BreadcrumbsProps) => {
  const { pathname } = useLocation();
  const pathNames = pathname.split("/").filter((x) => x);

  console.log(pathNames);

  return (
    <div className="flex gap-0.5 leading-[140%] tracking-[0.2px]">
      {/* Beranda */}
      <Link to="/" className="text-dark-secondary">
        Beranda
      </Link>
      <p className="text-dark-secondary">/</p>

      <Link
        to={`/kategori?studyField=${encodeURIComponent(studyField)}`}
        className="text-dark-secondary"
      >
        {studyField}
      </Link>
      <p className="text-dark-secondary">/</p>

      {/* Nama Product */}
      <p>{product}</p>
    </div>
  );
};

export default Breadcrumbs;
