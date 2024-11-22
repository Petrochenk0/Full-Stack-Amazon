import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Search from '../features/Search';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { logout } from '../redux/authSlice';
import { useEffect } from 'react';

export default function NavBar() {
  const cartProductsCount = useSelector((state: any) => state.cartSlice.productsNumber);
  const user = useSelector((state: any) => state.authSlice.username);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    console.log('Имя пользователя изменилось:', user);
  }, [user]);

  return (
    <header className="min-w-[1000px]">
      <div className="flex bg-amazonColors text-white">
        {/* left */}
        <div className="flex items-center mr-4">
          <Link to={`/`}>
            <div className="h-[55px] border  border-amazonColors hover:border-white m-2 cursor-pointer">
              <img
                className="h-[30px] w-[100px] object-contain m-3 "
                src={'../images/amazon.png'}
              />
            </div>
          </Link>

          <div className="cursor-pointer pl-4 pr-4 h-[55px] border  border-amazonColors hover:border-white">
            <div className="text-xs xl:text-sm  text-gray-300 mt-2">Deliver to</div>
            <div className="text-sm xl:text-base font-bold -mt-2">United Kingdom</div>
          </div>
        </div>
        {/* middle */}
        <div className="flex relative grow items-center">
          <Search />
        </div>
        {/* right */}
        <div className="flex items-center">
          <Link to="/login">
            <div className="cursor-pointer ml-4 pl-4 pr-4 h-[55px] border  border-amazonColors hover:border-white">
              <div className="text-xs xl:text-sm  text-gray-300 mt-2">
                Hello {user || ', sign in'}
              </div>
              <div className="text-sm xl:text-base font-bold -mt-2">Account & Lists</div>
            </div>
          </Link>
          <div className="cursor-pointer pl-4 pr-4 h-[55px] border  border-amazonColors hover:border-white">
            <div className="text-xs xl:text-sm  text-gray-300 mt-2">Returns</div>
            <div className="text-sm xl:text-base font-bold -mt-2">& Orders</div>
          </div>
          <Link to={'/cart'}>
            <div className="flex h-[55px] pr-3 pl-3 cursor-pointer border  border-amazonColors hover:border-white mr-3">
              <ShoppingCartIcon className="h-[48px]" />
              <div className="relative">
                <div className="absolute right-[10px] font-bold m-2 text-orange-400">
                  {cartProductsCount}
                </div>
              </div>
              <div className="font-bold mt-6">Cart</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex bg-amazonColors-light_blue text-white space-x-3 pl-5 items-center">
        <div className="cursor-pointer border border-amazonColors-light_blue hover:border-white p-2">
          Today's Deals
        </div>
        <div className="cursor-pointer border  border border-amazonColors-light_blue hover:border-white p-2">
          Costimer Service
        </div>
        <div className="cursor-pointer border  border border-amazonColors-light_blue hover:border-white p-2">
          <Link to="/registry">Registry</Link>
        </div>
        <div className="cursor-pointer border  border border-amazonColors-light_blue hover:border-white p-2">
          Gift Cards
        </div>
        <div className="cursor-pointer border  border border-amazonColors-light_blue hover:border-white p-2">
          Sell
        </div>
        <div
          onClick={handleLogout}
          className="cursor-pointer border  border border-amazonColors-light_blue hover:border-white p-2">
          Logout
        </div>
      </div>
    </header>
  );
}
