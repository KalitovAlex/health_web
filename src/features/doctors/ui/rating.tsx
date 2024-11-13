import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

export const Rating = ({ value, size = "small" }: RatingProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const filled = index < value;
    
    const sizeClasses = {
      small: "w-4 h-4",
      medium: "w-5 h-5",
      large: "w-6 h-6"
    };

    return (
      <Star
        key={index}
        className={`${sizeClasses[size]} ${
          filled ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
        }`}
      />
    );
  });

  return <div className="flex gap-0.5">{stars}</div>;
}; 