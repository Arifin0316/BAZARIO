import Link from "next/link";

interface ActionButtonsProps {
  onEdit: string;
  onDelete: () => void;
}

export const ActionButtons = ({ onEdit, onDelete }: ActionButtonsProps) => (
  <div className="space-x-2">
      <button 
          className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200"
           
      >
        <Link href={`/cek/${onEdit}`}>
          Edit
        </Link>
         
      </button>
      <button 
          className="px-4 py-1.5 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors duration-200"
          onClick={onDelete}
      >
          Delete
      </button>
  </div>
);