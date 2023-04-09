import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { StateContext } from "../context/StateContext";

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useContext(StateContext);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const getProductById = () => {
    axios
      .get(`http://localhost:1337/api/products/${id}?populate=*`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  return (
    <>
      {product && (
        <div className="container mx-auto py-20 px-3 md:px-0">
          <div className="grid grid-cols-3 gap-8">
            <div className=" md:col-span-1 col-span-3">
              <div>
                <img
                  src={`http://localhost:1337${product?.attributes.imgs.data[activeImage].attributes.url}`}
                  alt="product"
                  className="w-full"
                />
              </div>
              <div className="flex flex-row justify-start items-center">
                {product.attributes.imgs.data.map((img, index) => (
                  <div
                    key={img.id}
                    className={`cursor-pointer rounded-md border ${
                      index === activeImage
                        ? "border-[#e218364d]"
                        : "border-gray-100"
                    } mr-2`}
                  >
                    <img
                      src={`http://localhost:1337${img.attributes.url}`}
                      alt="product"
                      className="w-full rounded-md"
                      onClick={() => setActiveImage(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-3 md:col-span-2">
              <h1 className="font-orbitron text-xl font-bold mb-8">
                {product.attributes.name}
              </h1>
              <p className="font-bold text-lg mb-4">Details:</p>
              <p className="leading-relaxed mb-8">
                {product.attributes.description}
              </p>
              <p className="font-extrabold text-[#E21836] text-lg mb-8">
                ${product.attributes.price}
              </p>
              <button
                className="text-white bg-[#E21836] px-8 py-3 uppercase hover:bg-[#c41933] transition-all duration-300"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
