/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
      {
        protocol: 'https',
        hostname: 'placeimg.com',
      },
      {
        protocol: 'https',
        hostname: 'placekitten.com',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
      {
        protocol: 'https',
        hostname: 'unavatar.io',
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'api.adorable.io',
      },
      {
        protocol: 'https',
        hostname: 'robohash.org',
      },
      {
        protocol: 'https',
        hostname: 'www.robohash.org',
      },
      {
        protocol: 'https',
        hostname: 'www.fillmurray.com',
      },
      {
        protocol: 'https',
        hostname: 'www.placecage.com',
      },
      {
        protocol: 'https',
        hostname: 'www.stevensegall.com',
      },
      {
        protocol: 'https',
        hostname: 'www.chucknorris.com',
      },
      {
        protocol: 'https',
        hostname: 'www.placebear.com',
      },
      {
        protocol: 'https',
        hostname: 'www.placekitten.com',
      },
      {
        protocol: 'https',
        hostname: 'www.placedog.com',
      },
      {
        protocol: 'https',
        hostname: 'www.placeimg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.loremflickr.com',
      },
      {
        protocol: 'https',
        hostname: 'www.picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'www.dummyimage.com',
      },
      {
        protocol: 'https',
        hostname: 'www.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'www.freepik.com',
      },
      {
        protocol: 'https',
        hostname: 'www.flaticon.com',
      },
      {
        protocol: 'https',
        hostname: 'www.iconfinder.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thenounproject.com',
      },
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.iconmonstr.com',
      },
      {
        protocol: 'https',
        hostname: 'www.simpleicons.org',
      },
      {
        protocol: 'https',
        hostname: 'www.devicon.dev',
      },
      {
        protocol: 'https',
        hostname: 'www.vectorlogo.zone',
      },
      {
        protocol: 'https',
        hostname: 'www.worldvectorlogo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.logodownload.org',
      },
      {
        protocol: 'https',
        hostname: 'www.brandeps.com',
      },
      {
        protocol: 'https',
        hostname: 'www.seeklogo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.vectorlogo.net',
      },
      {
        protocol: 'https',
        hostname: 'www.logo.wine',
      },
      {
        protocol: 'https',
        hostname: 'www.transparentpng.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pngwing.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pngitem.com',
      },
      {
        protocol: 'https',
        hostname: 'www.cleanpng.com',
      },
      {
        protocol: 'https',
        hostname: 'www.kindpng.com',
      },
      {
        protocol: 'https',
        hostname: 'www.stickpng.com',
      },
      {
        protocol: 'https',
        hostname: 'www.dlpng.com',
      },
      {
        protocol: 'https',
        hostname: 'www.freepngimg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pngall.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pngpix.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pngmart.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pngkey.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pngtree.com',
      },
      {
        protocol: 'https',
        hostname: 'www.vecteezy.com',
      },
      {
        protocol: 'https',
        hostname: 'www.rawpixel.com',
      },
      {
        protocol: 'https',
        hostname: 'www.stockvault.net',
      },
      {
        protocol: 'https',
        hostname: 'www.freeimages.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gratisography.com',
      },
      {
        protocol: 'https',
        hostname: 'www.magdeleine.co',
      },
      {
        protocol: 'https',
        hostname: 'www.foodiesfeed.com',
      },
      {
        protocol: 'https',
        hostname: 'www.reshot.com',
      },
      {
        protocol: 'https',
        hostname: 'www.picjumbo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.kaboompics.com',
      },
      {
        protocol: 'https',
        hostname: 'www.libreshot.com',
      },
      {
        protocol: 'https',
        hostname: 'www.isorepublic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.jaymantri.com',
      },
      {
        protocol: 'https',
        hostname: 'www.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'www.stocksy.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gettyimages.com',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
      },
      {
        protocol: 'https://www.musafireendj.com',
        hostname: 'www.musafireendj.com',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
