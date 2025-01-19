import Link from "next/link";
import { Pencil, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onEdit: string;
  onDelete: () => void;
}

export const ActionButtons = ({ onEdit, onDelete }: ActionButtonsProps) => (
  <div className="flex items-center gap-2">
    <Link 
      href={`/dashboard/edit/${onEdit}`}
      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 
                rounded-lg hover:bg-blue-100 transition-all duration-200 group"
    >
      <Pencil className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform" />
      Edit
    </Link>

    <button 
      onClick={onDelete}
      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 
                rounded-lg hover:bg-red-100 transition-all duration-200 group"
      aria-label="Delete product"
    >
      <Trash2 className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform" />
      Delete
    </button>
  </div>
);