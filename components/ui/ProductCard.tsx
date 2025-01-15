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
