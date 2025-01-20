import NavbarMenu from '@/components/ui/NavbarMenu';
import { auth } from '@/auth';
import { CartProvider } from './cartContext';

const Navbar = async () => {
  const session = await auth();
  if (!session) return null;
  return (
    <CartProvider>
       <NavbarMenu session={session ? { ...session, user: { ...session.user, name: session.user.name || '', image: session.user.image || undefined } } : null} />
    </CartProvider>
  )
};

export default Navbar;