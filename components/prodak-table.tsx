'use client';

import { useState, useEffect } from 'react';
import { GetProdakByUser, deleteProdakAction } from "@/lib/data";
import { formatDate, formatPrice } from "@/lib/utils";
import Image from "next/image";

interface ProdakInterface {
    id: string;
    name: string;
    stock: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: {
        name: string | null;
    };
    description: string;
    image?: string;
}

const ProdakList = () => {
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
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
    return (
        <div className="space-y-4 p-4">
            {currentProducts.map((prodak) => (
                <div 
                    key={prodak.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex"
                >
                    <div className="relative h-32 w-32 flex-shrink-0 bg-gray-100">
                        {prodak.image ? (
                            <Image 
                                src={prodak.image} 
                                alt={prodak.name}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <span className="text-gray-400 text-sm">No image</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="p-4 flex-grow flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{prodak.name}</h2>
                                <p className="text-sm text-gray-600">Created by: {prodak.user.name || 'Unknown'}</p>
                                <p className="text-sm text-gray-600">Created at: {formatDate(prodak.createdAt.toString())}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium h-fit
                                ${prodak.stock > 10 
                                    ? 'bg-green-100 text-green-800' 
                                    : prodak.stock > 0 
                                        ? 'bg-yellow-100 text-yellow-800' 
                                        : 'bg-red-100 text-red-800'}`}>
                                Stock: {prodak.stock}
                            </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                            <div className="space-x-2">
                                <button 
                                    className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200"
                                    onClick={() => {/* Add your edit handler here */}}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="px-4 py-1.5 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors duration-200"
                                    onClick={() => handleDelete(prodak.id)}
                                >
                                    Delete
                                </button>
                            </div>
                            <span className="text-green-600 font-semibold">
                                {formatPrice(prodak.price)}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-6">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 text-sm font-medium rounded ${
                            currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        Previous
                    </button>
                    <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`px-4 py-2 text-sm font-medium rounded ${
                                    currentPage === number
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 text-sm font-medium rounded ${
                            currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProdakList;