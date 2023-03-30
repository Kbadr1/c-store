import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="border border-gray-100 p-5 rounded-md"
    >
      <img
        src={product.attributes.images[0]}
        className="w-full"
        alt="product"
      />
      <p className="font-medium my-2">{product.attributes.name}</p>
      <p>${product.attributes.price}</p>
    </Link>
  );
};

export default Product;
