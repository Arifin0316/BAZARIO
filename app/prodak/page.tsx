import ProductCard from '@/components/product/ProductCard';
import { allProdak } from '@/lib/data';
import { ProdakInterface1 } from '@/types';
import SearchBar from '@/components/SearchBar';

// app/prodak/page.tsx
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  // Tunggu searchParams resolved
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : undefined;
  
  const products = await allProdak(search) as unknown as ProdakInterface1[];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <SearchBar defaultValue={search} />
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
          {search && (
            <p className="text-sm text-gray-400 mt-2">
              Try different keywords or browse all products
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}