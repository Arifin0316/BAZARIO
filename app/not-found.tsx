"use client"

import Link from 'next/link';
import { Home, RefreshCw } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center bg-white shadow-2xl rounded-xl p-8 border border-blue-100">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
          <p className="text-2xl font-semibold text-gray-800 mb-4">Halaman Tidak Ditemukan</p>
          <p className="text-gray-600 mb-6">
            Ups! Sepertinya Anda tersesat di ruang maya. Halaman yang Anda cari tidak dapat ditemukan.
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Link 
            href="/" 
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <Home className="mr-2" size={20} />
            Kembali ke Beranda
          </Link>
          
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <RefreshCw className="mr-2" size={20} />
            Muat Ulang
          </button>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Mungkin link yang Anda kunjungi sudah dipindahkan atau tidak tersedia lagi.
          </p>
        </div>
      </div>
    </div>
  );
}