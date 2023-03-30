import React, { useEffect, useState } from "react";
import "./navbar.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import cartIcon from "../assets/cart.svg";
import closeIcon from "../assets/close.svg";
import menuIcon from "../assets/menu.svg";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

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
    <nav className="container mx-auto w-full flex flex-row items-center justify-between navbar py-6 px-3 md:px-0">
      <div className="flex md:hidden">
        <img
          src={toggle ? closeIcon : menuIcon}
          alt="cart"
          className="w-6"
          onClick={() => setToggle(!toggle)}
        />
      </div>
      <div>
        <span className="font-orbitron font-extrabold text-xl text-[#E21836]">
          Compu Store
        </span>
      </div>
      <ul className="list-none flex-row items-center hidden md:flex">
        {categories.map((category) => (
          <li
            key={category.attributes.id}
            className="mr-6 capitalize font-orbitron tracking-wide hover:text-[#E21836] transition-all duration-300"
          >
            <a href="#">{category.attributes.name}</a>
          </li>
        ))}
      </ul>
      <a className="hidden md:flex" href="#">
        <img src={cartIcon} alt="cart" className="w-6" />
      </a>
      <div className="flex md:hidden">
        <a href="#">
          <img src={cartIcon} alt="cart" className="w-6" />
        </a>
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } absolute left-2 top-20 bg-white p-4 rounded-lg`}
        >
          <ul className="list-none">
            {categories.map((category, index) => (
              <li
                key={category.attributes.id}
                className={`font-orbitron  capitalize ${
                  categories.length - 1 === index ? "mb-0" : "mb-3"
                }`}
              >
                <a href="#">{category.attributes.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
