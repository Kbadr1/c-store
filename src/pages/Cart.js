import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import plusIcon from "../assets/plus.svg";
import minusIcon from "../assets/minus.svg";

const Cart = () => {
  const { cart, setQuantity, removeFromCart } = useContext(StateContext);

  return (
    <div className="container mx-auto  px-3 xl:px-28 my-10 ">
      {cart.length ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            {cart.map((product) => (
              <div key={product.id} className="grid grid-cols-3 gap-6">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={`http://localhost:1337${product.attributes.imgs.data[0].attributes.url}`}
                    alt="product"
                    className="col-span-1 border border-gray-200 "
                  />{" "}
                </Link>
                <div className="col-span-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="hover:text-[#e21836] transition-all duration-500"
                  >
                    <p className="font-semibold  mb-2">
                      {product.attributes.name}
                    </p>
                  </Link>
                  <p className="mb-4">${product.attributes.price}</p>
                  <div className="flex flex-row justify-between items-center">
                    <div className="border border-gray-300 rounded-sm flex flex-row justify-between items-center">
                      <button
                        disabled={product.quantity === 1 ? true : false}
                        className={`font-bold px-2 py-2 border-r border-gray-300 ${
                          product.quantity === 1
                            ? "cursor-not-allowed bg-gray-200 text-gray-500"
                            : "cursor-pointer"
                        }`}
                        onClick={
                          product.quantity >= 2
                            ? () => setQuantity(product, product.quantity - 1)
                            : null
                        }
                      >
                        <img src={minusIcon} className="w-4 " alt="-" />
                      </button>
                      <input
                        className="text-center w-10"
                        disabled
                        value={product.quantity}
                        onChange={(e) =>
                          setQuantity(product, parseInt(e.target.value))
                        }
                      />
                      <button
                        className="px-2 py-2 border-l border-gray-300 font-bold"
                        onClick={() =>
                          setQuantity(product, product.quantity + 1)
                        }
                      >
                        <img src={plusIcon} className="w-4" alt="+" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(product)}
                      className="border border-gray-200 p-2 rounded-sm hover:text-[#e21836] transition-all duration-500"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-end p-2 mt-20">
            <p className="font-orbitron text-lg">
              Total Sum:{" "}
              <span className="font-bold ">
                $
                {cart
                  .reduce(
                    (total, item) =>
                      total + item.attributes.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </p>
          </div>
        </>
      ) : (
        <div className={`flex justify-center items-center flex-col h-screen`}>
          <h1 className="text-xl font-medium mb-5">
            You don't have any products added to cart yet.
          </h1>
          <button className="bg-[#e21836] text-white rounded-sm py-2 px-4">
            <Link to="/">Continue shopping</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
