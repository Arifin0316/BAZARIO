/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {  // 'images' bukan 'Images' (case sensitive)
    remotePatterns: [  // 'remotePatterns' bukan 'remotePaterns' (typo)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'  // Hapus tanda kutip ganda ekstra
      }
    ]
  }
};

export default nextConfig;