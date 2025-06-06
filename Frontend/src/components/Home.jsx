import React from 'react';

const Home = () => {
  const banners = [
    {
      id: 1,
      image: 'https://www.bookmystall.in/images2/Rama-23574.png',
      title: 'Fashion Fiesta',
      subtitle: 'Up to 70% off on trending styles',
      link: '#'
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR3sBNwLvEGOQbAvevxm3cV-RJFEIyo34blQ&s',
      title: 'Tech Carnival',
      subtitle: 'Latest gadgets and accessories',
      link: '#'
    },
    {
      id: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRDoWtEavnTzHMCMMZAa2WyjnJak5Clvh9VA&s',
      title: 'Sports Mania',
      subtitle: 'Gear up for the season',
      link: '#'
    }
  ];

  const categories = [
    { id: 1, name: 'Fashion', image: 'https://via.placeholder.com/150?text=Fashion' },
    { id: 2, name: 'Electronics', image: 'https://via.placeholder.com/150?text=Electronics' },
    { id: 3, name: 'Home Decor', image: 'https://via.placeholder.com/150?text=Home+Decor' }
  ];

  const featuredProducts = [
    { id: 1, name: 'Smart Watch', price: '$99', image: 'https://via.placeholder.com/200?text=Watch' },
    { id: 2, name: 'Sneakers', price: '$79', image: 'https://via.placeholder.com/200?text=Sneakers' },
    { id: 3, name: 'LED Lamp', price: '$49', image: 'https://via.placeholder.com/200?text=Lamp' }
  ];

  const topVendors = [
    { id: 1, name: 'TechZone', logo: 'https://via.placeholder.com/100?text=TZ' },
    { id: 2, name: 'StyleHub', logo: 'https://via.placeholder.com/100?text=SH' }
  ];

  return (
    <div className="px-4 md:px-12 py-10 space-y-16 bg-gray-50">
      
      
       {/* Hero Banners */}
      <div className="space-y-4">  {/* changed space-y-8 to space-y-4 for smaller gap */}
        {banners.map(banner => (
          <a key={banner.id} href={banner.link}>
            <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-100 mb-2">
              <img src={banner.image} alt={banner.title} className="w-full h-60 md:h-80 object-cover" />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-6 md:p-12 text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                <p className="text-lg md:text-xl">{banner.subtitle}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map(cat => (
            <div key={cat.id} className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition">
              <img src={cat.image} alt={cat.name} className="mx-auto w-24 h-24 rounded-full object-cover" />
              <h3 className="mt-4 font-medium">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg p-4 text-center transition">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-green-600 text-lg font-bold">{product.price}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Buy Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Top Vendors */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Top Vendors</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {topVendors.map(vendor => (
            <div key={vendor.id} className="bg-white rounded-xl shadow-md p-6 w-40 text-center hover:shadow-lg transition">
              <img src={vendor.logo} alt={vendor.name} className="mx-auto w-20 h-20 object-contain rounded-full mb-2" />
              <p className="font-medium">{vendor.name}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
