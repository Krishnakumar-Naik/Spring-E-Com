import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProductImageSource, unplugged } from "../utils/productImages";
import "./ProductCards.css";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if search data is available in location state
    if (location.state && location.state.searchData) {
      setSearchData(location.state.searchData);
      setLoading(false);
    } else {
      // If no search data is found, redirect to home
      navigate("/");
    }
  }, [location, navigate]);

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (productId) => {
    toast.success(`Product with ID ${productId} added to cart!`);
  };

  if (loading) {
    return (
      <div className="container mt-5 pt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="container product-listing search-results">
      <header className="search-results__header">
        <div>
          <h1 className="product-listing__title">Search results</h1>
          <p className="product-listing__subtitle">
            {searchData.length} {searchData.length === 1 ? "product" : "products"} found
          </p>
        </div>
      </header>

      {searchData.length === 0 ? (
        <div className="alert search-results__empty">
          <i className="bi bi-info-circle-fill me-2" aria-hidden="true"></i>
          No products found matching your search criteria.
        </div>
      ) : (
        <section aria-label="Matching products">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {searchData.map((product) => {
              return (
                <div key={product.id} className="col">
                  <article className="card h-100 shadow-sm product-card search-result-card">
                    <button
                      type="button"
                      className="product-card__image-wrap search-result-card__image-wrap border-0"
                      onClick={() => handleViewProduct(product.id)}
                      aria-label={`View ${product.name}`}
                    >
                      <img
                        src={getProductImageSource(product)}
                        className="product-card__image"
                        alt={product.name}
                        onError={(e) => {
                          e.currentTarget.src = unplugged;
                        }}
                      />
                    </button>
                    <div className="product-card__body">
                      <div className="d-flex align-items-start justify-content-between gap-2">
                        <h2 className="product-card__name">{product.name}</h2>
                        <span className="badge rounded-pill search-result-card__category">
                          {product.category}
                        </span>
                      </div>
                      <p className="product-card__brand">{product.brand}</p>
                      <p className="product-card__description">
                        {product.description}
                      </p>
                      <p className="product-card__price">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>
                      <div className="product-card__actions">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleViewProduct(product.id)}
                        >
                          View Details
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleAddToCart(product.id)}
                          disabled={!product.productAvailable || product.stockQuantity <= 0}
                        >
                          {product.productAvailable && product.stockQuantity > 0
                            ? "Add to Cart"
                            : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default SearchResults;