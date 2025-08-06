
import { NavLink } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <div className="mt-3 flex justify-between items-center">
                    <span className="text-gray-800 font-bold">${product.price}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${product.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
                <div className="mt-4">
                    <NavLink
                        to={`/products/${product.id}`}
                        className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300"
                    >
                        View Details
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
