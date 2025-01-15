'use client';

import { ProductCardSkeleton } from '@/components/sceleton/prodakCartScaleton';
import { PaginationSkeleton } from '@/components/sceleton/PaginationSkeleton';

const ProductListSkeleton = () => {
  const productsPerPage = 5;

  return (
    <div className="space-y-4 p-4">
      {/* Skeleton for product cards */}
      {Array.from({ length: productsPerPage }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}

      {/* Skeleton for pagination */}
      <PaginationSkeleton />
    </div>
  );
};

export default ProductListSkeleton;
