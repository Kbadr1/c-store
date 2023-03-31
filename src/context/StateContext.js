import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StateContext = createContext();

const StateContextProvider = (props) => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find((item) => product.id === item.id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const setQuantity = (product, amount) => {
    const newCart = [...cart];
    newCart.find((item) => item.id === product.id).quantity = amount;
    setCart(newCart);
  };

  return (
    <StateContext.Provider
      value={{ addToCart, cart, setQuantity, removeFromCart }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
