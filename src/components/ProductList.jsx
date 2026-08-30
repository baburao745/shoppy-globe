import useProducts from "../hooks/useProducts";
import ProductItem from "./ProductItem";

function ProductList() {
  const { products, loading, error } = useProducts();

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
        <span>{products.length} products available</span>
      </section>

      <section className="product-grid">
        {products.map((product) => (
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