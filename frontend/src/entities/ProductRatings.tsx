import { StarIcon } from '@heroicons/react/24/outline';

interface ProductRatingsProps {
  avgRatings: number;
  ratings: number;
}

export default function ProductRatings(props: ProductRatingsProps) {
  const starNumber = props.avgRatings;
  const ratingNumber = props.ratings;

  return (
    <div className="flex">
      {Array.from({ length: starNumber }, (_, i) => (
        <StarIcon key={i} className="stroke-[#F1B51F] fill-[#F1B51F] h-[20px]" />
      ))}
      {Array.from({ length: 5 - starNumber }, (_, i) => (
        <StarIcon key={i} className="stroke-[#F1B51F] h-[20px]" />
      ))}
      <span className="ml-2 text-teal-950 cursor-pointer hover:text-orange-600">
        {ratingNumber} ratings
      </span>
    </div>
  );
}
