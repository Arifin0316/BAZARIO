'use client';

import { useState, useEffect } from 'react';
import { GetProdakByUser, deleteProdakAction } from "@/lib/data";
import { ProductCard } from './ui/ProductCard';
import { Pagination } from './ui/Pagination';
import { ProdakInterface } from '@/types';
import ProductListSkeleton from '@/components/sceleton/ProductListSkeleton';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import { Search, Filter } from 'lucide-react';
import Swal from 'sweetalert2';

const ProductList = () => {
    const [prodaks, setProdaks] = useState<ProdakInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');
    const productsPerPage = 5;

    useEffect(() => {
        const fetchProdaks = async () => {
            try {
                const data = await GetProdakByUser();
                setProdaks(data as ProdakInterface[]);
            } catch (error) {
                console.error('Error fetching products:', error);
                showToast('error', 'Gagal memuat data produk');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProdaks();
    }, []);

    const showToast = (icon: 'success' | 'error', text: string) => {
        Swal.fire({
            title: icon === 'success' ? 'Success!' : 'Error!',
            text,
            icon,
            timer: 1500,
            showConfirmButton: false,
            position: 'top',
            toast: true
        });
    };

    const openDeleteModal = (id: string) => {
        setProductToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setProductToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleDelete = async () => {
        if (!productToDelete) {
            showToast('error', 'No product selected for deletion');
            return;
        }

        try {
            const result = await deleteProdakAction(productToDelete);

            if (result.success) {
                setProdaks(prevProdaks => 
                    prevProdaks.filter(prodak => prodak.id !== productToDelete)
                );
                showToast('success', result.message || 'Product deleted successfully');
            } else {
                showToast('error', result.error || 'Failed to delete product');
            }
        } catch (error) {
            showToast('error', 'An unexpected error occurred');
            console.error('Delete operation error:', error);
        } finally {
            closeDeleteModal();
        }
    };

    const filteredProducts = prodaks
        .filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price':
                    return a.price - b.price;
                case 'stock':
                    return a.stock - b.stock;
                default:
                    return 0;
            }
        });

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (isLoading) {
        return <ProductListSkeleton />;
    }

    return (
        <div className="space-y-6">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-xl">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-700 rounded-lg 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                   focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                                   focus:border-blue-500 dark:focus:border-blue-400 
                                   transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400 dark:text-gray-500 h-5 w-5" />
                    <select
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 
                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                   focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                                   focus:border-blue-500 dark:focus:border-blue-400"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'stock')}
                    >
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                        <option value="stock">Sort by Stock</option>
                    </select>
                </div>
            </div>

            {/* Products List */}
            {!filteredProducts.length ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-xl p-8 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <Search className="h-12 w-12 text-gray-400 dark:text-gray-600" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            {searchTerm ? 
                                `No products match "${searchTerm}"` : 
                                'Start by adding your first product'
                            }
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {currentProducts.map((prodak) => (
                        <div key={prodak.id} className="transform transition duration-200 hover:scale-[1.01]">
                            <ProductCard
                                product={prodak}
                                onEdit={prodak.id}
                                onDelete={() => openDeleteModal(prodak.id)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                title="Konfirmasi Penghapusan"
                message="Apakah Anda yakin ingin menghapus produk ini?"
                confirmText="Hapus"
                cancelText="Batal"
                size="sm"
                confirmButtonClassName="bg-red-500 hover:bg-red-600 text-white"
                cancelButtonClassName="bg-gray-300 hover:bg-gray-400 text-gray-800"
            />
        </div>
    );
};

export default ProductList;