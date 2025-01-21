import Link from 'next/link';
import { auth } from '@/auth';
import { Facebook, Instagram, Github, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61550034904693', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/arifin0316/', label: 'Instagram' },
  { icon: Github, href: 'https://github.com/Arifin0316', label: 'github' },
];

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/prodak', label: 'Products' },
  { href: '/cart', label: 'Cart' },
  { href: '/orders', label: 'Orders' },
];

const supportLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/shipping', label: 'Shipping Information' },
  { href: '/returns', label: 'Returns Policy' },
  { href: '/privacy', label: 'Privacy Policy' },
];

const contactInfo = [
  { icon: MapPin, text: 'Jakarta, Indonesia' },
  { icon: Phone, text: '+62 123 456 789' },
  { icon: Mail, text: 'support@bazario.com' },
];

export default async function Footer() {
  const sessen = await auth()
  if(!sessen) return null
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main Footer Content */}
      <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link href="/" className="block">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">BAZARIO</h2>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Your one-stop marketplace for all your shopping needs. Quality products, trusted sellers,
            and excellent service.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transform hover:scale-110 transition-all"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Quick Links</h3>
          <ul className="space-y-4">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Support</h3>
          <ul className="space-y-4">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Contact Us</h3>
          <ul className="space-y-4">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <li key={info.text} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Icon size={18} className="flex-shrink-0 text-gray-500 dark:text-gray-600" />
                  <span>{info.text}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Business Hours:
              <br />
              Monday - Friday: 9AM - 5PM
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} created by Arifin. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              href="/terms" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              Terms & Conditions
              <ExternalLink size={14} />
            </Link>
            <Link 
              href="/privacy" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              Privacy Policy
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
}