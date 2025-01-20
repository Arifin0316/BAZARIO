import Carousel from '@/components/Carousel';
import ProductsList from '@/components/product/prodakList';
import ProductsCatagori from '@/components/product/ProdakBCatagori';
import c1 from "@/public/c1.jpg"
import c3 from "@/public/c3.jpg"

const carouselImages = [
  {
    src: c1,
    alt: 'Slide 1',
    title: 'New Arrivals',
    description: 'Check out our latest collection'
  },
  {
    src: c3,
    alt: 'Slide 2',
    title: 'Special Offers',
    description: 'Get up to 50% off on selected items'
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Carousel */}
      <section className="relative bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto py-6 sm:py-8">
          <Carousel images={carouselImages} autoPlayInterval={5000} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Browse our wide selection of products across different categories
            </p>
          </div>
          <ProductsCatagori />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <ProductsList />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8">
              Subscribe to our newsletter for the latest updates and exclusive offers
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg flex-1 text-gray-900 dark:text-white dark:bg-gray-700 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-blue-600 dark:text-blue-400 text-4xl">🚚</div>
              <h3 className="font-semibold dark:text-white">Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">On orders over $100</p>
            </div>
            <div className="space-y-2">
              <div className="text-blue-600 dark:text-blue-400 text-4xl">⚡️</div>
              <h3 className="font-semibold dark:text-white">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">2-3 business days</p>
            </div>
            <div className="space-y-2">
              <div className="text-blue-600 dark:text-blue-400 text-4xl">🔒</div>
              <h3 className="font-semibold dark:text-white">Secure Payment</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">100% secure checkout</p>
            </div>
            <div className="space-y-2">
              <div className="text-blue-600 dark:text-blue-400 text-4xl">💫</div>
              <h3 className="font-semibold dark:text-white">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Here to help</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}