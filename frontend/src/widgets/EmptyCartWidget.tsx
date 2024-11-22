import { Link } from 'react-router-dom';

const EmptyCartWidget = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md text-center">
        <img
          src="https://polytronofficial.com/assets/images/empty-cart.png"
          alt="Empty Cart Illustration"
          className="w-full mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">Your Amazon Cart is empty</h2>
        <p className="text-blue-600 mb-4">Shop today’s deals</p>

        <div className="flex justify-center space-x-4">
          <Link to="/login">
            <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600">
              Sign in to your account
            </button>
          </Link>
          <Link to="/register">
            <button className="border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-50">
              Sign up now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartWidget;
