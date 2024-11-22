import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

import ProductDetails from '../widgets/ProductDetails';

import { callData } from '../utils/CallApi';
import { GB_CURRENCY } from '../utils/constans';

import { IProduct } from '../types';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantityProducts, setQuantityProducts] = useState<string | number>('1');

  const dispatch = useDispatch();

  const getProduct = () => {
    callData(`data/products.json`).then((productResults) => {
      if (id !== undefined) {
        setProduct(productResults[id]);
      }
    });
  };

  const addCountsToProduct = () => {
    if (product) {
      return {
        ...product,
        quantity: quantityProducts,
      };
    }
    return product;
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product?.title) return <h1>Loading Product ...</h1>;

  return (
    product && (
      <div className="h-screen bg-amazonColors-background">
        <div className="min-w-[1000px] max-w-[1500px] m-auto">
          <div className="grid grid-cols-12 gap-2 pt-10">
            {/* Left */}
            <div className="col-span-3 rounded m-auto bg-white p-10">
              <img src={`${product.image}`} />
            </div>
            {/* Middle */}
            <div className="col-span-6 bg-white p-4 rounded divide-y ">
              <div className="mb-3">
                <ProductDetails product={product} ratingsIs={true} />
              </div>
              <div className="text-base pt-2">{product.description}</div>
            </div>
            {/* Right */}
            <div className="col-span-3 p-4 rounded bg-white">
              <div className="text-2xl cursor-pointer text-red-500 font-semibold text-right">
                {GB_CURRENCY.format(product.price)}
              </div>
              <div className="text-lg cursor-pointer text-gray-400 font-semibold text-right line-through">
                {GB_CURRENCY.format(product.oldPrice)}
              </div>
              <div className="text-base text-teal-500 cursor-pointer font-semibold mt-3 hover:text-orange-500">
                FREE Returns
              </div>
              <div className="text-base cursor-pointer mt-2 text-teal-500 font-semibold hover:text-orange-500">
                FREE Delivery
              </div>
              <div className="text-lg font-semibold mt-2 cursor-pointer text-green-700">
                In Stock
              </div>
              <div className="text-lg font-semibold mt-2">
                Quantity:
                <select
                  onChange={(e) => setQuantityProducts(e.target.value)}
                  className="cursor-pointer p-1 ml-2 border rounded-lg focus:border-indigo-300">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <Link to={'/cart'}>
                <button
                  onClick={() => {
                    if (product) {
                      dispatch(addToCart(addCountsToProduct()));
                    }
                  }}
                  className="btn">
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductPage;
