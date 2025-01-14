/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {  // 'images' bukan 'Images' (case sensitive)
    remotePatterns: [  // 'remotePatterns' bukan 'remotePaterns' (typo)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'  // Hapus tanda kutip ganda ekstra
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '"www.static-src.com"'
      },
      {
        protocol: 'https',
        hostname: '"res.cloudinary.com"'
      }
    ]
  }
};

export default nextConfig;