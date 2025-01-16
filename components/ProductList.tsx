'use client';

import { useState, useEffect } from 'react';
import { GetProdakByUser, deleteProdakAction } from "@/lib/data";
import { ProductCard } from './ui/ProductCard';
import { Pagination } from './ui/Pagination';
import { ProdakInterface } from '@/types';
import ProductListSkeleton from '@/components/sceleton/ProductListSkeleton';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import Swal from 'sweetalert2';

const ProductList = () => {
    const [prodaks, setProdaks] = useState<ProdakInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const productsPerPage = 5;

    useEffect(() => {
        const fetchProdaks = async () => {
            try {
                const data = await GetProdakByUser();
                setProdaks(data as ProdakInterface[]);
            } catch (error) {
                console.error('Error fetching products:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Gagal memuat data produk',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false,
                    position: 'top',
                    toast: true
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProdaks();
    }, []);

    const openDeleteModal = (id: string) => {
        setProductToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setProductToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleDelete = async () => {
        if (!productToDelete) return;

        try {
            const result = await deleteProdakAction(productToDelete);
            if (result.success) {
                setProdaks(prevProdaks => 
                    prevProdaks.filter(prodak => prodak.id !== productToDelete)
                );
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Produk berhasil dihapus',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    position: 'top',
                    toast: true
                });
            } else {
                throw new Error(result.error || 'Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Gagal menghapus produk',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
                position: 'top',
                toast: true
            });
        } finally {
            closeDeleteModal();
        }
    };

    if (isLoading) {
        return <ProductListSkeleton />;
    }

    if (!prodaks?.length) {
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
                    onDelete={() => openDeleteModal(prodak.id)}
                />
            ))}

            {totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

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