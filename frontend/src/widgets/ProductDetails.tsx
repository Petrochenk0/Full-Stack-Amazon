import { IProduct } from '../types';
import ProductBadge from '../entities/ProductBadge';
import ProductRatings from '../entities/ProductRatings';

interface IProductDetails {
  product: IProduct;
  ratingsIs: boolean;
}

export default function ProductDetails({ product, ratingsIs }: IProductDetails) {
  return (
    <div className="mt-1 mb-1">
      <div className="text-2xl font-medium mb-1">{product.title}</div>
      <div className="text-base font-medium mb-1">
        by <span className="text-blue-500 cursor-pointer">{product.brand}</span>
      </div>
      {ratingsIs && (
        <div className="text-base font-medium mb-1">
          <ProductRatings ratings={product.ratings} avgRatings={product.avgRating} />
        </div>
      )}
      <div className="text-sm font-bold mb-3">{product.attribute}</div>
      <div className="pb-1">
        <ProductBadge badge={product.badge} />
      </div>
    </div>
  );
}
