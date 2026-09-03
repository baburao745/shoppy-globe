import { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setSelectedCategory,
} from "../store/searchSlice";

function ProductList() {
  // Fetch products and track loading/error states
  const { products, loading, error } = useProducts();

  // Get Redux dispatch function
  const dispatch = useDispatch();

  // Get search and category values from Redux store
  const { searchTerm, selectedCategory } = useSelector(
    (state) => state.search
  );

  // Store products after applying search and category filters
  const [displayProducts, setDisplayProducts] = useState([]);

  // Filter products whenever products or filter values change
  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      // Check whether product title matches search text
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Check whether product belongs to selected category
      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      // Product must satisfy both conditions
      return matchesSearch && matchesCategory;
    });

    // Update the products displayed on the page
    setDisplayProducts(filteredProducts);
  }, [products, searchTerm, selectedCategory]);

  // Create category list from available products
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // Display loading message while products are being fetched
  if (loading) {
    return (
      <main className="products-page loading-page">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <h2>Loading products...</h2>
          <p>Getting the latest products for you.</p>
        </div>
      </main>
    );
  }

  // Display error message if API request fails
  if (error) {
    return (
      <main className="products-page">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="products-page">
      {/* Page heading */}
      <section className="products-heading">
        <p>EXPLORE OUR STORE</p>
        <h1>All Products</h1>
        <span>{displayProducts.length} products available</span>
      </section>

      {/* Search input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) =>
            dispatch(setSearchTerm(e.target.value))
          }
        />
      </div>

      {/* Category filter buttons */}
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              dispatch(setSelectedCategory(category))
            }
            className={
              selectedCategory === category
                ? "active-category"
                : ""
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display filtered products */}
      <section className="product-grid">
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
            />
          ))
        ) : (
          // Message when no product matches the filter
          <p className="no-products">No products found.</p>
        )}
      </section>
    </main>
  );
}

export default ProductList;