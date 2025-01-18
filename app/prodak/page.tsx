import ProductCard from '@/components/product/ProductCard';
import { allProdak } from '@/lib/data';
import { ProdakInterface1 } from '@/types';

export default async function ProductsPage() {
  const products = await allProdak() as unknown as ProdakInterface1[];

  if (!products) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Failed to load products</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Our Products</h1>
        <p className="text-center text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-20 py-8">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}