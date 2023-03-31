import React, { useState, useEffect } from "react";
import axios from "axios";
import MiceImage from "../assets/home-mice.webp";
import KeyboardImage from "../assets/home-keyboard.webp";
import { Link } from "react-router-dom";
import Product from "../components/Product";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchCategories = () => {
    axios
      .get("http://localhost:1337/api/categories?populate=*")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  };
  const fetchAllProducts = () => {
    axios
      .get(`http://localhost:1337/api/products?populate=*`)
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
  }, []);

  return (
    <div>
      <section className="hero-banner flex justify-end items-center bg-cover w-full h-[680px] ">
        <div className="bg-white custom-clip p-14">
          <h6 className="font-extrabold font-orbitron uppercase text-4xl mb-3">
            your space, <br /> your way
          </h6>
          <p>
            grab some deals on computer accessories <br /> before they're gone!
          </p>
        </div>
      </section>
      <section className="container mx-auto px-3 xl:px-28 my-20">
        <h4 className="text-center font-bold mb-10 text-3xl font-orbitron">
          Categories
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.length &&
            categories.map((category) => (
              <Link
                key={category.id}
                className="hover:text-[#E21836] transition-all duration-300"
                to={`/category/${category.id}`}
              >
                <img
                  src={`http://localhost:1337${category?.attributes?.img?.data[0]?.attributes?.url}`}
                  alt="category"
                  className="w-full"
                />
                <p className="flex items-center justify-center mt-3 font-orbitron tracking-widest font-medium">
                  {category.attributes.name}
                </p>
              </Link>
            ))}
        </div>
      </section>
      <section className="bg-[#F5F6F7] py-20 mt-20 mb-60">
        <div className="container mx-auto px-3 xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-36 ">
            <div>
              <div className="lg:p-10 ">
                <h6 className="font-orbitron font-extrabold text-4xl mb-2">
                  Unleash Your <br /> Creativity
                </h6>
                <p className="mb-4 text-lg">With HyperX RGB Products</p>
              </div>
              <Link to={`/product/9`}>
                <div className="overflow-hidden lg:h-full relative">
                  <img
                    src={KeyboardImage}
                    className="h-full  scale-105  hover:scale-110 transition-all duration-700 brightness-75"
                    alt="keyboard"
                  />
                  <div className="absolute bottom-10 left-10">
                    <p className="text-white text-sm mb-4">
                      Petite 60% form factort
                    </p>
                    <p className="text-white font-orbitron font-medium text-xl">
                      Alloy Origins 60
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <Link to={`/product/5`}>
                <div className="overflow-hidden lg:h-full relative">
                  <img
                    src={MiceImage}
                    className="h-full scale-105 hover:scale-110  transition-all duration-700 brightness-75"
                    alt="mice"
                  />
                  <div className="absolute bottom-10 left-10">
                    <p className="text-white text-sm mb-4">360° RGB Lighting</p>
                    <p className="text-white font-orbitron font-medium text-xl">
                      Pulsfire Surge
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="container  mx-auto px-3 xl:px-28 my-20">
        <h4 className="text-center font-bold mb-10 text-3xl font-orbitron">
          Best Seller Products
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length &&
            products
              .slice(0, 8)
              .map((product) => <Product product={product} key={product.id} />)}
        </div>
      </section>
    </div>
  );
}

export default Home;
