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
  // Tambahkan gambar lainnya...
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="px-4 py-8">
      <Carousel images={carouselImages} autoPlayInterval={5000} />
      </div>
      {/* Rest of your homepage content */}
      <ProductsList />
      <ProductsCatagori />
    </main>
  );
}