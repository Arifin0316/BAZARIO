
import ProdakList from "@/components/ProductList";
import { IoMdAdd } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";


const ProdakPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-screen-xl mx-auto p-6 space-y-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Your Products</h1>
                        <p className="text-sm text-gray-600 mt-1">Manage and track your product inventory</p>
                    </div>
                    
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <button 
                            className="inline-flex items-center justify-center px-4 py-2 
                                     bg-white text-blue-600 border border-blue-600 
                                     rounded-lg hover:bg-blue-50 transition-colors duration-200"
                        >
                            <FiDownload className="mr-2 text-xl" />
                            <Link href="/dashboard/catagory">
                               Add Category
                            </Link>
                            
                        </button>
                        
                        {/* Update button untuk membuka modal */}
                        <button 
                            className="inline-flex items-center justify-center px-4 py-2 
                                     bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                                     transition-colors duration-200"
                        >
                            <IoMdAdd className="mr-2 text-xl" />
                            <Link href="/dashboard/addProdak">
                               Add Product
                            </Link>
                            
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6">
                        <ProdakList />
                    </div>
                </div>
            </div>
        </div>

     );
}
 
export default ProdakPage;