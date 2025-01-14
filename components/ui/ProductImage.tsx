import Image from "next/image";

interface ProductImageProps {
    image?: string;
    name: string;
}

export const ProductImage = ({ image, name }: ProductImageProps) => (
    <div className="relative h-32 w-32 flex-shrink-0 bg-gray-100">
        {image ? (
            <Image 
                src={image} 
                alt={name}
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
);
