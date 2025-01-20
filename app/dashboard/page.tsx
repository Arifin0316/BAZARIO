import ProdakList from "@/components/ProductList";
import { IoMdAdd } from "react-icons/io";
import { FiDownload, FiPackage, FiShoppingBag } from "react-icons/fi";
import Link from "next/link";
import { Prodak } from "@/lib/data";

const ProdakPage = async () => {
  const prodak = await Prodak()
  const totalProdak = prodak?.length
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <FiPackage className="text-blue-600 dark:text-blue-400" />
              Your Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Manage and track your product inventory</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/orders">
              <button className="inline-flex items-center justify-center px-4 py-2.5 
                              bg-white dark:bg-gray-800 
                              text-gray-700 dark:text-gray-200 
                              border border-gray-300 dark:border-gray-600 
                              rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                              hover:border-gray-400 dark:hover:border-gray-500
                              shadow-sm transition-all duration-200 group">
                <FiShoppingBag className="mr-2 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-100" />
                Orders
              </button>
            </Link>

            <Link href="/dashboard/addProdak">
              <button className="inline-flex items-center justify-center px-4 py-2.5 
                              bg-blue-600 dark:bg-blue-500 
                              text-white rounded-lg 
                              hover:bg-blue-700 dark:hover:bg-blue-600 
                              shadow-sm transition-all duration-200 transform hover:translate-y-[-1px]">
                <IoMdAdd className="mr-2 text-xl" />
                Add Product
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalProdak}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <FiPackage className="text-xl text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Products</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalProdak}</h3>
              </div>
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <FiShoppingBag className="text-xl text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">5</h3>
              </div>
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <FiDownload className="text-xl text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-6">
            <ProdakList />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default ProdakPage;