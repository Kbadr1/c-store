import React, { useState, useEffect } from "react";
import "./home.css";
import Hero from "../assets/hero.jpg";
import axios from "axios";
import MiceImage from "../assets/home-mice.webp";
import KeyboardImage from "../assets/home-keyboard.webp";
import { Link } from "react-router-dom";

function Home() {
  const [categories, setCategories] = useState([]);
  const fetchCategories = () => {
    axios
      .get("http://localhost:1337/api/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchCategories();
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
      <section className="container mx-auto px-3 md:px-0 my-20">
        <h4 className="text-center font-bold mb-10 text-3xl font-orbitron">
          Categories
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              className="hover:text-[#E21836] transition-all duration-300"
              to={`/category/${category.id}`}
            >
              <img
                src={category.attributes.image}
                alt="category"
                className="w-full"
              />
              <p className="text-center mt-3 font-orbitron tracking-widest font-medium">
                {category.attributes.name}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-[#F5F6F7] py-20">
        <div className="container mx-auto px-3 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
            <div>
              <div className="p-10">
                <h6 className="font-orbitron font-extrabold text-4xl mb-2">
                  Unleash Your <br /> Creativity
                </h6>
                <p className="mb-4 text-lg">With HyperX RGB Products</p>
              </div>
              <img src={KeyboardImage} className="h-full" alt="keyboard" />
            </div>
            <div>
              <img src={MiceImage} className="h-full" alt="mice" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
