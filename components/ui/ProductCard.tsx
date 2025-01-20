import { formatDate, formatPrice } from "@/lib/utils";
import { ProductImage } from './ProductImage';
import { StockBadge } from './StockBadge';
import { ActionButtons } from './ActionButtons';
import { ProdakInterface } from '@/types/index';
import { Tag, Clock, User, Package } from 'lucide-react';

interface ProductCardProps {
    product: ProdakInterface;
    onEdit: string;
    onDelete: (id: string) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-xl overflow-hidden hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row">
                {/* Image Section */}
                <div className="sm:w-48 lg:w-56">
                    <div className="relative h-48 sm:h-full">
                        <ProductImage image={product.image} name={product.name} />
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow p-4 sm:p-6">
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    {product.name}
                                </h2>
                                <div className="space-y-1">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <User className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                                        <span>Created by: {product.user.name || 'Unknown'}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <Clock className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                                        <span>{formatDate(product.createdAt.toString())}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <Tag className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                                        <span>Category: {product.category?.name || 'Uncategorized'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <StockBadge stock={product.stock} />
                                <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                                    {formatPrice(product.price)}
                                </span>
                            </div>
                        </div>

                        {/* Description if available */}
                        {product.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 line-clamp-2">
                                {product.description}
                            </p>
                        )}

                        {/* Footer */}
                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
                            <ActionButtons 
                                onEdit={onEdit}
                                onDelete={() => onDelete(product.id)}
                            />
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Package className="w-4 h-4 mr-1 text-gray-400 dark:text-gray-500" />
                                <span>ID: {product.id.slice(-6)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};