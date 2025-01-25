import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

export const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart());

  // Almacenar el carrito desde el localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const MAX_ITEMS = 5;

  function addToCart(item) {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      if (cart[existingItemIndex].quantity >= MAX_ITEMS) {
        return;
      }
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity++;
      setCart(updatedCart);
    } else {
      // Si el ítem no existe, lo agrega con cantidad 1
      item.quantity = 1;
      setCart((prevCart) => [...prevCart, item]);
    }
    saveLocalStorage();
  }

  function removeItemFromCart(guitarId) {
    const updatedCart = cart.filter((guitar) => guitar.id !== guitarId);
    setCart(updatedCart);
  }

  function increaseQuantity(guitarId) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === guitarId) {
        if (guitar.quantity >= MAX_ITEMS) {
          return guitar;
        }
        guitar.quantity++;
      }
      return guitar;
    });
    // Imprimir por consola el valor del carrito
    setCart(updatedCart);
  }

  function reduceQuantity(guitarId) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === guitarId) {
        guitar.quantity--;
      }
      return guitar;
    });
    // Elimina el ítem si la cantidad es igual o menor a 0
    setCart(updatedCart.filter((guitar) => guitar.quantity > 0));
  }

  function clearCart() {
    setCart([]);
  }

  function saveLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // State Derivado + useMemo
  const isEmpyCart = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);

  return {
    data,
    cart,
    addToCart,
    removeItemFromCart,
    increaseQuantity,
    reduceQuantity,
    clearCart,
    isEmpyCart,
    cartTotal,
  };
};
