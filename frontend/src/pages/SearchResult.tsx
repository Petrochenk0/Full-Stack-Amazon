import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import ProductDetails from '../widgets/ProductDetails';

import { callData } from '../utils/CallApi';
import { GB_CURRENCY } from '../utils/constans';

import { IProduct } from '../types';

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = React.useState<IProduct[] | null>(null);

  // function receives data from the server and further filters by categories
  const getSearchResult = () => {
    const searchTerm = searchParams.get('searchTerm');
    const categorySearch = searchParams.get('categorySearch');

    callData(`data/search.json`).then((searchResults) => {
      try {
        const categoryResult = categorySearch !== null && searchResults[categorySearch];

        if (searchTerm) {
          const result = categoryResult.filter((product: { id: number; title: string }) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()),
          );
          setProducts(result);
        } else {
          setProducts(categoryResult);
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  React.useEffect(() => {
    getSearchResult();
  }, [searchParams]);

  return (
    <div className="min-w-[1200px] max-w-[1300px] mx-auto">
      {products &&
        products.map((product) => {
          return (
            <Link key={product.title} to={`/product/${product.id}`}>
              <div className="text-black h-[250px] grid grid-cols-12 rounded-xl mt-3 mb-3">
                <div className="col-span-2 p-7 bg-gray-200">
                  <img src={product.image_small} className="m-auto" alt="product" />
                </div>
                <div className="col-span-10 bg-gray-50 border border-gray-100 hover:bg-gray-100">
                  <div className="pl-10 pt-5 font-medium text-black p-2">
                    <ProductDetails product={product} ratingsIs={true} />
                    <div className="text-xl xl:text-2xl pt-1">
                      {GB_CURRENCY.format(product.price)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
