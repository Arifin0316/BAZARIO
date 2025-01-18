'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { handleSignOut } from '@/app/actions/auth';
import { Menu, X, ShoppingCart, Package, Home, LayoutDashboard, Users } from 'lucide-react';
import { useCart } from '../cartContext';

interface NavbarClientProps {
  session: { user: { name: string; role: string; image?: string } } | null;
}

const NavbarMenu = ({ session }: NavbarClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePath = (path: string) => pathname === path;

  const CartBadge = () => (
    <div className="flex items-center">
      <ShoppingCart className="w-4 h-4 mr-2" />
      Cart
      {totalItems > 0 && (
        <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
          {totalItems}
        </span>
      )}
    </div>
  );

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-2xl text-gray-800 hover:text-gray-600 transition">
              logo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-8">
            <div className="flex space-x-6">
              <Link 
                href="/" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition relative
                  ${isActivePath('/') 
                    ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600' 
                    : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
              <Link 
                href="/profile" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition relative
                  ${isActivePath('/profile') 
                    ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600' 
                    : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Home className="w-4 h-4 mr-2" />
                profile
              </Link>
              <Link 
                href="/cart" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition relative
                  ${isActivePath('/cart') 
                    ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600' 
                    : 'text-gray-600 hover:text-gray-900'}`}
              >
                <CartBadge />
              </Link>
              <Link 
                href="/orders" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition relative
                  ${isActivePath('/orders') 
                    ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600' 
                    : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Package className="w-4 h-4 mr-2" />
                Orders
              </Link>
              {session && (
                <>
                  <Link 
                    href="/prodak" 
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition relative
                      ${isActivePath('/prodak') 
                        ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600' 
                        : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Products
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition relative
                      ${isActivePath('/dashboard') 
                        ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600' 
                        : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  {session.user.role === 'admin' && (
                    <Link 
                      href="/user" 
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition relative
                        ${isActivePath('/user') 
                          ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600' 
                          : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Users
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* User Profile & Auth Buttons */}
            <div className="flex items-center space-x-4">
              {session ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 pr-4 border-r border-gray-200">
                    <Image 
                      src={session.user.image || '/avatar.svg'} 
                      alt="avatar" 
                      width={32} 
                      height={32} 
                      className="rounded-full ring-2 ring-gray-100"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {session.user.name}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {session.user.role}
                      </span>
                    </div>
                  </div>
                  <form action={handleSignOut}>
                    <button 
                      type="submit" 
                      className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Sign Out
                    </button>
                  </form>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex z-20 items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Now positioned on the left */}
      <div 
  className={`md:hidden fixed inset-y-0 right-0 transform ${
    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
  } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-30`}
>
  <div className="h-full overflow-y-auto">
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="font-bold text-xl">Menu</div>
        <button
          onClick={toggleMenu}
          className="text-gray-500 hover:text-gray-600 focus:outline-none"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-1">
        <Link 
          href="/" 
          className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
            isActivePath('/') ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={toggleMenu}
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Link>
        <Link 
          href="/cart" 
          className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
            isActivePath('/cart') ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={toggleMenu}
        >
          <CartBadge />
        </Link>
        <Link 
          href="/orders" 
          className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
            isActivePath('/orders') ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={toggleMenu}
        >
          <Package className="w-4 h-4 mr-2" />
          Orders
        </Link>
        {session && (
          <>
            <Link  
              href="/prodak" 
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isActivePath('/prodak') ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={toggleMenu}
            >
              <Package className="w-4 h-4 mr-2" />
              Products
            </Link>
            <Link 
              href="/dashboard" 
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isActivePath('/dashboard') ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={toggleMenu}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
            {session.user.role === 'admin' && (
              <Link 
                href="/user" 
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActivePath('/user') ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={toggleMenu}
              >
                <Users className="w-4 h-4 mr-2" />
                Users
              </Link>
            )}
          </>
        )}
      </div>
      {session && (
        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="flex items-center px-3">
            <Image 
              src={session.user.image || '/avatar.svg'} 
              alt="avatar" 
              width={40} 
              height={40} 
              className="rounded-full ring-2 ring-gray-100"
            />
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800 capitalize">
                {session.user.name}
              </div>
              <div className="text-sm font-medium text-gray-500 capitalize">
                {session.user.role}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <form action={handleSignOut}>
              <button 
                type="submit" 
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
      
     
     {/* Overlay for mobile menu */}
{isMenuOpen && (
  <div 
    className="md:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity z-20"
    onClick={toggleMenu}
  />
)}

    </nav>
  );
};

export default NavbarMenu;