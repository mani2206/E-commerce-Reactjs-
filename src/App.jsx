import React, { useState, useEffect } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

import productsData from "./api/products.json";
import Dashboard from "./components/pageComponents/Dashboard";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setProducts(productsData);
      setFilteredProducts(productsData);
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleFilter = (category) => {
    const filtered = category
      ? products.filter((p) => p.category === category)
      : products;
    setFilteredProducts(filtered);
  };

  const handleSort = (option) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (option === "lowToHigh") return a.price - b.price;
      if (option === "highToLow") return b.price - a.price;
      return 0;
    });
    setFilteredProducts(sorted);
    setSortOption(option);
  };

  return (
    <div className="app">
      <Dashboard
        handleAddToCart={handleAddToCart}
        handleFilter={handleFilter}
        handleSort={handleSort}
        cart={cart}
        filteredProducts={filteredProducts}
        loading={loading}
        sortOption={sortOption}
      />
    </div>
  );
};

export default App;
