'use client';

import { useState, useEffect } from 'react';
import { GetProdakByUser, deleteProdakAction } from "@/lib/data";
import { ProductCard } from './ProductCard';
import { Pagination } from './Pagination';
import { ProdakInterface } from '@/types';


const ProductList = () => {
   
    const [prodaks, setProdaks] = useState<ProdakInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    useEffect(() => {
        const fetchProdaks = async () => {
            const data = await GetProdakByUser();
            setProdaks(data as ProdakInterface[]);
        };

        fetchProdaks();
    }, []);

    const handleDelete = async (id: string) => {
        const result = await deleteProdakAction(id);
        if (result.success) {
            setProdaks(prodaks.filter(prodak => prodak.id !== id));
        } else {
            console.error("Failed to delete product:", result.error);
        }
    };

    
    if(!prodaks?.length) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <h1 className="text-2xl text-gray-500 font-medium">No products found</h1>
            </div>
        );
    }

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = prodaks.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(prodaks.length / productsPerPage);
    
    return (
        <div className="space-y-4 p-4">
            {currentProducts.map((prodak) => (
                <ProductCard
                    key={prodak.id}
                    product={prodak}
                    onEdit={prodak.id}
                    onDelete={handleDelete}
                />
            ))}

            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default ProductList;