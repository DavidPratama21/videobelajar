import { useState } from "react";
import { Link } from "react-router";
import RatingStars from "./Rating_stars";

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
}: CardProps) => {
  const [interactiveRating, setInteractiveRating] = useState(0);
  return (
    <Link
      to="#"
      className="grid sm:w-[384px] p-4 sm:p-5 gap-2 bg-other-primary border border-other-border rounded-[10px]"
    >
      {/* Images, Name & Desc, Tutor */}
      <div className="flex sm:grid gap-3 items-center">
        <img
          src={image}
          alt="Image Class"
          className="h-[82px] sm:h-[193px] object-cover aspect-square sm:aspect-video rounded-[10px]"
        />
        {/* Name & description / Tutor */}
        <div className="grid gap-2 sm:gap-3">
          {/* Name */}
          <div className="grid gap-2">
            <h6 className="text-dark-primary font-semibold text-base leading-[120%] sm:text-lg">
              {name}
            </h6>
            <p className="hidden sm:block font-medium leading-[140%] tracking-[0.2px] text-dark-secondary">
              {description}
            </p>
          </div>

          {/* Tutor */}
          <div className="flex gap-2 items-center sm:gap-2.5">
            {/* Foto Profile */}
            <img
              src={avatar}
              alt="Profile Image"
              className="h-9 aspect-square rounded-xl"
            />
            {/* Title */}
            <div>
              <p className="font-medium text-dark-primary leading-[140%] tracking-[0.2px] text-sm sm:text-base">
                {tutor_name}
              </p>
              {/* 4497 */}
              <div className="flex gap-1 sm:text-sm">
                <p className="text-xs font-normal text-dark-secondary leading-[140%] tracking-[0.2px] sm:text-sm">
                  {tutor_role}
                </p>
                <span className="hidden text-dark-secondary sm:inline">di</span>
                <span className="hidden font-bold text-dark-secondary sm:inline">
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
          onRatingChange={setInteractiveRating}
          displayOnly={true}
          amountRated={reviewers}
        />
        <p className="font-semibold text-xl sm:text-2xl text-primary leading-[120%]">
          Rp. {price}
        </p>
      </div>
    </Link>
  );
};

export default Card;
