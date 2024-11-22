type BadgeType = string;

export default function ProductBadge({ badge }: { badge: BadgeType }) {
  if (badge === 'choice') {
    return (
      <span className="text-sm bg-slate-800 text-white p-2">
        Amazon's <span className="text-orange-500">Choice</span>
      </span>
    );
  } else if (badge === 'seller') {
    return <span className="text-sm bg-slate-500 text-white p-2">#1 Best Seller</span>;
  } else if (badge === 'limited') {
    return <span className="text-sm bg-red-500 text-white p-2">Limited Time Deal</span>;
  }

  return <div></div>;
}
