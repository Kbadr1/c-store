import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import cartIcon from "../assets/cart.svg";
import closeIcon from "../assets/close.svg";
import menuIcon from "../assets/menu.svg";
import { StateContext } from "../context/StateContext";

const Navbar = () => {
  const { cart } = useContext(StateContext);
  const cartTotal = cart.reduce((sum, { quantity }) => sum + quantity, 0);
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
    <nav className="w-full  navbar py-6 px-3 md:px-0 border-b border-gray-200">
      <div className="container mx-auto flex flex-row items-center justify-between">
        <div className="flex md:hidden">
          <img
            src={toggle ? closeIcon : menuIcon}
            alt="menu"
            className="w-6"
            onClick={() => setToggle(!toggle)}
          />
        </div>
        <div>
          <Link to="/">
            <span className="font-orbitron font-extrabold text-xl text-[#E21836]">
              C-Store
            </span>
          </Link>
        </div>
        <ul className="list-none flex-row items-center hidden md:flex">
          {categories.length &&
            categories.map((category) => (
              <li
                key={category.id}
                className="mr-6 capitalize font-orbitron tracking-wide hover:text-[#e21836] transition-all duration-300"
              >
                <NavLink
                  to={`/category/${category.id}`}
                  style={({ isActive }) =>
                    isActive ? { color: "#E21836" } : {}
                  }
                >
                  {category.attributes.name}
                </NavLink>
              </li>
            ))}
        </ul>
        <Link to={`/cart`} className="hidden md:flex">
          <img src={cartIcon} alt="cart" className="w-6 ml-12" />
          {cart.length ? (
            <div className="bg-[#e21836] rounded-full w-3 h-3 ml-[-8px] border border-white"></div>
          ) : null}
        </Link>
        <div className="flex md:hidden">
          <Link to={`/cart`} className="flex">
            <img src={cartIcon} alt="cart" className="w-6" />
            {cart.length ? (
              <div className="bg-[#e21836] ml-[-10px] rounded-full w-3 h-3  border border-white"></div>
            ) : null}
          </Link>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } absolute left-2 top-20 bg-white p-4 rounded-lg`}
          >
            <ul className="list-none ">
              {categories.length &&
                categories.map((category, index) => (
                  <li
                    key={category.id}
                    className={`font-orbitron  capitalize ${
                      categories.length - 1 === index ? "mb-0" : "mb-3"
                    }`}
                  >
                    <Link to={`/category/${category.id}`}>
                      {category.attributes.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
