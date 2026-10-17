import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";
import { getProductImageSource, unplugged } from "../utils/productImages";
import "./ProductCards.css";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastProduct, setToastProduct] = useState(null);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    console.log(data, 'data from home page');
  }, [data]);

  useEffect(() => {
    let toastTimer;
    if (showToast) {
      toastTimer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(toastTimer);
  }, [showToast]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
    setToastProduct(product);
    setShowToast(true);
  };

  const filteredProducts = selectedCategory
    ? data.filter((product) => product.category === selectedCategory)
    : data;

  if (isError) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <img src={unplugged} alt="Error" className="img-fluid" width="100" />
          <h4 className="mt-3">Something went wrong</h4>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {/* Toast Notification */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        <div 
          className={`toast ${showToast ? 'show' : 'hide'}`}
          role="alert" 
          aria-live="assertive" 
          aria-atomic="true"
        >
          <div className="toast-header bg-success text-white">
            <strong className="me-auto">Added to Cart</strong>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={() => setShowToast(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            {toastProduct && (
              <div className="d-flex align-items-center">
                <img 
                  src={getProductImageSource(toastProduct)} 
                  alt={toastProduct.name} 
                  className="me-2 rounded" 
                  width="40" 
                  height="40"
                  onError={(e) => {
                    e.target.src = unplugged; // Fallback image
                  }}
                />
                <div>
                  <div className="fw-bold">{toastProduct.name}</div>
                  <small>Successfully added to your cart!</small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container product-listing">
        <div className="product-listing__heading">
          <h1 className="product-listing__title">
            {selectedCategory || "Discover products"}
          </h1>
          <p className="product-listing__subtitle">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available
          </p>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {!filteredProducts || filteredProducts.length === 0 ? (
            <div className="col-12 text-center my-5">
              <h4>No Products Available</h4>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const { id, brand, name, price, productAvailable, stockQuantity } = product;
              
              return (
                <div className="col" key={id}>
                  <div className={`card h-100 shadow-sm product-card ${!productAvailable ? 'bg-light' : ''}`}>
                    <Link to={`/product/${id}`} className="product-card__image-wrap" aria-label={`View ${name}`}>
                      <img
                        src={getProductImageSource(product)} 
                        alt={name}
                        className="product-card__image"
                        onError={(e) => {
                          e.currentTarget.src = unplugged;
                        }}
                      />
                    </Link>
                    <div className="product-card__body">
                      <div className="d-flex align-items-start justify-content-between gap-2">
                        <h2 className="product-card__name">{name}</h2>
                        <span className="badge rounded-pill text-bg-light">{product.category}</span>
                      </div>
                      <p className="product-card__brand">{brand}</p>
                      <p className="product-card__price">
                        ₹{Number(price).toLocaleString("en-IN")}
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={!productAvailable || stockQuantity <= 0}
                      >
                        {productAvailable && stockQuantity > 0 ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Home;