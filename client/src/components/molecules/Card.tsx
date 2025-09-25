import { Link } from "react-router";
import RatingStars from "./RatingStars";
import { rupiahFormat } from "../../utils/product";

type CardProps = {
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviewers: number;
  tutor_name: string;
  tutor_role: string;
  avatar: string;
  work_place: string;
  to: number;
};

const Card = ({
  name,
  description,
  image,
  price,
  rating,
  reviewers,
  tutor_name,
  tutor_role,
  avatar,
  work_place,
  to,
}: CardProps) => {
  return (
    <Link
      to={`/detail/${to}`}
      className="grid md:w-[384px] p-4 md:p-5 gap-2 bg-other-primary border border-other-border rounded-[10px]"
    >
      {/* Images, Name & Desc, Tutor */}
      <div className="flex md:grid gap-3 items-center">
        <img
          src={`/assets/images/products/${image}`}
          alt="Image Class"
          className="h-[82px] md:h-[193px] object-cover aspect-square md:aspect-video rounded-[10px]"
        />
        {/* Name & description / Tutor */}
        <div className="grid gap-2 md:gap-3">
          {/* Name */}
          <div className="grid gap-2">
            <h6 className="text-dark-primary font-semibold text-base leading-[120%] md:text-lg">
              {name}
            </h6>
            <p className="hidden md:block font-medium leading-[140%] tracking-[0.2px] text-dark-secondary">
              {description}
            </p>
          </div>

          {/* Tutor */}
          <div className="flex gap-2 items-center md:gap-2.5">
            {/* Foto Profile */}
            <img
              src={avatar}
              alt="Profile Image"
              className="h-9 aspect-square rounded-xl"
            />
            {/* Title */}
            <div>
              <p className="font-medium text-dark-primary leading-[140%] tracking-[0.2px] text-sm md:text-base">
                {tutor_name}
              </p>
              <div className="flex gap-1 md:text-sm">
                <p className="text-xs font-normal text-dark-secondary leading-[140%] tracking-[0.2px] md:text-sm">
                  {tutor_role}
                </p>
                <span className="hidden text-dark-secondary md:inline">di</span>
                <span className="hidden font-bold text-dark-secondary md:inline">
                  {work_place}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Rating & Price */}
      <div className="flex justify-between items-center">
        <RatingStars
          rating={rating}
          displayOnly={true}
          amountRated={reviewers}
          // showText={false}
        />
        <p className="font-semibold text-xl md:text-2xl text-primary leading-[120%]">
          {rupiahFormat(price)}
        </p>
      </div>
    </Link>
  );
};

export default Card;
