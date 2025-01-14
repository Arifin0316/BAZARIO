import { formatDate, formatPrice } from "@/lib/utils";
import { ProductImage } from './ProductImage';
import { StockBadge } from './StockBadge';
import { ActionButtons } from './ActionButtons';
import { ProdakInterface } from '@/types/index';

interface ProductCardProps {
    product: ProdakInterface;
    onEdit: string;
    onDelete: (id: string) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex">
        <ProductImage image={product.image} name={product.name} />
        
        <div className="p-4 flex-grow flex flex-col justify-between">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                    <p className="text-sm text-gray-600">Created by: {product.user.name || 'Unknown'}</p>
                    <p className="text-sm text-gray-600">Created at: {formatDate(product.createdAt.toString())}</p>
                </div>
                <StockBadge stock={product.stock} />
            </div>
            
            <div className="flex items-center justify-between mt-4">
                <ActionButtons 
                    onEdit={onEdit}
                    onDelete={() => onDelete(product.id)}
                />
                <span className="text-green-600 font-semibold">
                    {formatPrice(product.price)}
                </span>
            </div>
        </div>
    </div>
);

// components/Pagination.tsx
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center space-x-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
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
                        onClick={() => onPageChange(number)}
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
                onClick={() => onPageChange(currentPage + 1)}
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
    );
};
