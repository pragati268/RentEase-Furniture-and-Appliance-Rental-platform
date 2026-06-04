import ProductCard from "./ProductCard";

const ProductsGrid = ({ products }) => {
  return (
    <section className="bg-amber-100 px-5 md:px-10 lg:px-20 pb-20">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
};

export default ProductsGrid;