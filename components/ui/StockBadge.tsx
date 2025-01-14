interface StockBadgeProps {
  stock: number;
}

export const StockBadge = ({ stock }: StockBadgeProps) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium h-fit
      ${stock > 10 
          ? 'bg-green-100 text-green-800' 
          : stock > 0 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-red-100 text-red-800'}`}>
      Stock: {stock}
  </span>
);