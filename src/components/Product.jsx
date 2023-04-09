import React, { useState } from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [hover, setHover] = useState(null);

  let onHover = (id) => {
    setHover(id);
  };

  let onOut = () => {
    setHover(null);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="border border-gray-100  rounded-md "
      onMouseOver={() => onHover(product.id)}
      onMouseOut={onOut}
    >
      <div className="overflow-hidden">
        <img
          src={`http://localhost:1337${product.attributes.imgs.data[0].attributes.url}`}
          className={`w-full rounded-md ${
            hover ? "scale-105" : "scale-100"
          } transition-all duration-500`}
          alt="product"
        />
      </div>
      <div className="p-5">
        <p className="font-medium my-2">{product.attributes.name}</p>
        <p className="">${product.attributes.price}</p>
      </div>
    </Link>
  );
};

export default Product;
