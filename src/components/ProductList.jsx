import useProducts from "../hooks/useProducts";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setSelectedCategory,
} from "../store/searchSlice";

function ProductList() {
  const { products, loading, error } = useProducts();

  const dispatch = useDispatch();

  const { searchTerm, selectedCategory } = useSelector(
    (state) => state.search
  );

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <main className="products-page">
        <h2>Loading products...</h2>
      </main>
    );
  }

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
      <section className="products-heading">
        <p>EXPLORE OUR STORE</p>
        <h1>All Products</h1>
        <span>{filteredProducts.length} products available</span>
      </section>

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

      <section className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p className="no-products">
            No products found.
          </p>
        )}
      </section>
    </main>
  );
}

export default ProductList;