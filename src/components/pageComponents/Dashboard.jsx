import React, { useState } from "react";
import ContentLoader from "react-content-loader";
import CardModel from "./CardModel";

export default function Dashboard({
  handleAddToCart,
  handleFilter,
  handleSort,
  cart,
  filteredProducts,
  loading,
  sortOption,
}) {
  const [showCart, setShowCart] = useState(false);
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <header className="header pb-5">
        <h1 style={{ fontSize: "20px" }} className="pb-4">
          E-commerce List
        </h1>
        <div className="controls">
          <button onClick={() => handleFilter("")}>All</button>
          <button onClick={() => handleFilter("Electronics")} className="mx-1">
            Electronics
          </button>
          <button onClick={() => handleFilter("Clothing")}>Clothing</button>
          <button onClick={() => handleFilter("Accessories")} className="mx-1">
            Accessories
          </button>

          <select
            style={{ height: "34px" }}
            onChange={(e) => handleSort(e.target.value)}
            value={sortOption}
          >
            <option value="">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>

          <button
            className="mx-2 cart-button"
            onClick={() => setShowCart(!showCart)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            {cart.length > 0 && (
              <span className="cart-count-badge">{cart.length}</span>
            )}
          </button>
        </div>
      </header>

      <CardModel
        show={showCart}
        cart={cart}
        totalAmount={totalAmount}
        onClose={() => setShowCart(false)}
      />
      <main>
        {loading ? (
          <div className="container">
            <div className="row g-3">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="col-6 col-md-3"
                  style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.075)" }}
                >
                  <ContentLoader
                    speed={2}
                    width="100%"
                    height={250}
                    viewBox="0 0 300 250"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect
                      x="20"
                      y="10"
                      rx="10"
                      ry="10"
                      width="260"
                      height="150"
                    />
                    <rect
                      x="20"
                      y="170"
                      rx="5"
                      ry="5"
                      width="180"
                      height="20"
                    />
                    <rect
                      x="20"
                      y="200"
                      rx="5"
                      ry="5"
                      width="100"
                      height="20"
                    />
                  </ContentLoader>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row g-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="col-6 col-md-3 my-3"
                  style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.075)" }}
                >
                  <div className="h-100 text-center img-wrapper">
                    <img
                      data-aos="zoom-in"
                      src={product.image}
                      className="card-img-top mx-auto inner-img"
                      alt={product.name}
                      style={{
                        width: "80%",
                        height: "150px",
                        objectFit: "contain",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: "15px" }}>
                        {product.name}
                      </h5>
                      <p className="card-text">${product.price.toFixed(2)}</p>
                      <button
                        className="buttons ripple"
                        onClick={() => handleAddToCart(product)}
                        style={{ fontSize: "10px" }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer mt-4 text-end">
        <button
          className=""
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-up-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
            />
          </svg>
        </button>
      </footer>
    </>
  );
}
