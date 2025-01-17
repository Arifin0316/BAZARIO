import Image from 'next/image';
import Link from 'next/link';
import { auth, signOut } from '@/auth';

const Navbar = async () => {
  const sessent = await auth();
  return (
    <nav className="bg-white border-green-200 border-b">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link href="/" className="font-bold text-3xl">
          logo
        </Link>
        <div className="flex items-center gap-3">
          <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-gray-600 hover:text-gray-800">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/cart">cart</Link>
            </li>
            <li>
              <Link href="/orders">order</Link>
            </li>
            {sessent && (
              <>
                <li>
                  <Link href="/prodak">Prodak</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dasboard</Link>
                </li>
                {sessent.user.role === 'admin' ? (
                  <li>
                    <Link href="/user">User</Link>
                  </li>
                ) : null}
              </>
            )}
          </ul>
          {sessent && (
            <div className="flex gap-3 items-center ">
              <div className="flex flex-col justify-center -space-y-1">
                <span className="font-semibold text-gray-600 text-right capitalize">{sessent.user.name}</span>
                <span className="font-xs text-gray-400 text-right capitalize">{sessent.user.role}</span>
              </div>
              <button type="button">
                <Image src={sessent.user.image || '/avatar.svg'} alt="avatar" width={64} height={64} className="w-8 h-8 rounded-full" />
              </button>
            </div>
          )}

          {sessent ? (
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/login' });
              }}
            >
              <button type="submit" className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500">
                Sign Out
              </button>
            </form>
          ) : (
            <Link href="/login" className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500">
              sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
