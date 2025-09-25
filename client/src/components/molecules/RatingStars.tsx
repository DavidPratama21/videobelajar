import { useState, useEffect } from "react";
import Star from "../atoms/Star";

type RatingStarsProps = {
  rating?: number;
  showText?: boolean;
  displayOnly?: boolean;
  amountRated: number;
};

const RatingStars = ({
  rating = 0,
  showText = true,
  displayOnly = false,
  amountRated,
}: RatingStarsProps) => {
  const [hover, setHover] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(
    Math.round(rating)
  );

  useEffect(() => {
    setCurrentRating(Math.round(rating));
  }, [rating]);
  return (
    <div
      className={`inline-flex items-center gap-1 ${
        displayOnly ? "cursor-default!" : ""
      }`}
    >
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isSelected = starValue <= currentRating;
        const isHovered = hover !== null && starValue <= hover;

        return (
          <span
            key={index}
            className={`cursor-pointer transition-all text-dark-secondary hover:transform hover:scale-110 text-base ${
              isSelected ? "text-warning-default" : ""
            } ${isHovered && !displayOnly ? "text-yellow-400" : ""}`}
            onMouseEnter={() => !displayOnly && setHover(starValue)}
            onMouseLeave={() => !displayOnly && setHover(null)}
            aria-label={`${starValue} star${starValue !== 1 ? "s" : ""}`}
            role={displayOnly ? "img" : "button"}
            tabIndex={displayOnly ? -1 : 0}
          >
            {isSelected ? <Star color="#FCE91B" /> : <Star color="#9D9EA1" />}
          </span>
        );
      })}
      {showText && (
        <span className="ml-2 font-medium text-xs text-dark-secondary">
          {currentRating} ({amountRated})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
