import useProducts from "../hooks/useProducts";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../store/searchSlice";

function ProductList() {
  const { products, loading, error } = useProducts();

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      <section className="product-grid">
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </section>
    </main>
  );
}

export default ProductList;