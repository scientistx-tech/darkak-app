import type { Banner, Category, Product } from '@/types';

export const mockBanners: Banner[] = [
  {
    id: '1',
    title: 'GET 5% OFF',
    subtitle: 'On your first order',
    discount: 'Limited',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    actionText: 'SHOP NOW',
    //backgroundColor: '#4C7EFF',
    backgroundColor: ['#00153B', '#032B70DB']
  },
  {
    id: '2',
    title: 'New Arrivals',
    subtitle: 'Latest smartphones',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f',
    actionText: 'Explore',
    //backgroundColor: '#FF6B6B',
    backgroundColor: ['#323232', '#7C7C7C']
  },
    {
    id: '3',
    title: 'GET 5% OFF',
    subtitle: 'On your first order',
    discount: 'Limited Time Offer',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    actionText: 'SHOP NOW',
    //backgroundColor: '#4C7EFF',
    backgroundColor: ['#5694FF', '#5694FFE5']
  },
  
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'SAMSUNG',
    image: require('../assets/category/c1.png'),
    productCount: 125,
    slug: 'samsung',
   
    //backgroundColor: '#E8F3FF',
  },
  {
    id: '2',
    name: 'APPLE',
    image: require('../assets/category/c2.png'),
    productCount: 89,
    slug: 'apple',
    backgroundColor: '#FFF6F6',
  },
  {
    id: '3',
    name: 'ASUS',
    image: require('../assets/category/c3.png'),
    productCount: 67,
    slug: 'asus',
    backgroundColor: '#F7FBFF',
  },
  {
    id: '4',
    name: 'XIAOMI',
    image: require('../assets/category/c4.png'),
    productCount: 92,
    slug: 'xiaomi',
    backgroundColor: '#F3FFF6',
  },
  {
    id: '5',
    name: 'ONEPLUS',
    image: require('../assets/category/c5.png'),
    productCount: 48,
    slug: 'oneplus',
    backgroundColor: '#F9F9FF',
  },
 
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'NURA PRO MAGIC 8 PRO',
    brand: 'NURA',
    price: 94000,
    originalPrice: 120000,
    discount: 22,
    rating: 4.5,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    description: 'Latest flagship smartphone with advanced features',
    category: 'smartphones',
    inStock: true,
    isNew: false,
    isFeatured: true,
    backgroundColor: '#EAF2FF',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23 Ultra',
    brand: 'SAMSUNG',
    price: 85000,
    originalPrice: 95000,
    rating: 4.7,
    reviewCount: 256,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c',
    description: 'Premium Samsung flagship with S Pen',
    category: 'smartphones',
    inStock: true,
    isNew: true,
    isFeatured: true,
    backgroundColor: '#EEF6FF',
  },
  {
    id: '3',
    name: 'iPhone 15 Pro Max',
    brand: 'APPLE',
    price: 135000,
    rating: 4.8,
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a',
    description: 'Latest iPhone with titanium design',
    category: 'smartphones',
    inStock: true,
    isNew: true,
    isFeatured: true,
    backgroundColor: '#FFF6F6',
  },
  {
    id: '4',
    name: 'Xiaomi 13 Pro',
    brand: 'XIAOMI',
    price: 68000,
    originalPrice: 75000,
    rating: 4.4,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
    description: 'High-performance Xiaomi flagship',
    category: 'smartphones',
    inStock: true,
    isFeatured: true,
    backgroundColor: '#F3FFF6',
  },
  {
    id: '5',
    name: 'OnePlus 11 5G',
    brand: 'ONEPLUS',
    price: 56000,
    originalPrice: 62000,
    discount: 10,
    rating: 4.6,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f',
    description: 'Fast and smooth OnePlus experience',
    category: 'smartphones',
    inStock: true,
    backgroundColor: '#FFF6F6',
  },
  {
    id: '6',
    name: 'Google Pixel 8 Pro',
    brand: 'GOOGLE',
    price: 95000,
    rating: 4.5,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c',
    description: 'Best camera phone with pure Android',
    category: 'smartphones',
    inStock: true,
    isNew: true,
    backgroundColor: '#EAF2FF',
  },
  {
    id: '7',
    name: 'ASUS ROG Phone 7',
    brand: 'ASUS',
    price: 72000,
    originalPrice: 80000,
    rating: 4.7,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed',
    description: 'Ultimate gaming smartphone',
    category: 'smartphones',
    inStock: true,
    backgroundColor: '#F7FBFF',
  },
  {
    id: '8',
    name: 'Sony Xperia 1 V',
    brand: 'SONY',
    price: 110000,
    rating: 4.3,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb',
    description: 'Professional photography smartphone',
    category: 'smartphones',
    inStock: true,
    backgroundColor: '#F7FBFF',
  },
];

export const bannerData1 = {
  title: "Special Offer",
  subtitle: "Up to 40% off",
  discount: "40%",
  actionText: "Shop Now",
  image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png",
  backgroundColor: ["#4c669f", "#3b5998"], 
   id: "1",
};
export const bannerData2 = {
  title: "Special Offer",
  subtitle: "Up to 40% off",
  discount: "40%",
  actionText: "Shop Now",
  image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png",
  backgroundColor: ["#4c669f", "#3b5998"], 
   id: "1",
};


export const footerData = {
  initialWelcomeText:
    "Looking for the best online shopping experience in Bangladesh? Darkak is your smart shopping companion—the most trusted multivendor e-commerce platform that is dedicated to serving you with all your essentials in life with faster, great value & good quality. Be it electronics, clothes or essentials—shop safely from the top 10 online shopping sites in Bangladesh.",

  fullExpandedText:
    "Explore our best selling options\n" +
    "✅ School bags for kid's girls and boys—fun and durable\n\n" +
    "✅ Travel backpacks, laptop bags, crossbody bags – perfect for smart commuting\n\n" +
    "✅ Affordable prices, trendy looks—making daily shopping in BD easier and more stylish\n\n" +
    "Elegant Watches & Jewelry for Him & Her\n" +
    "Redefine your style with watches that speak of class and confidence.\n\n" +
    "✅ Browse the latest men’s watch price in BD to get great value within your budget\n\n" +
    "✅ Pick timeless pieces from our women watch BD collection\n\n" +
    "✅ Explore women’s jewelry sets designed by women with either a modern or a classic approach, which are beautiful as gifts or to be worn by yourself\n\n" +
    "Shop Smarter with Home & Consumer Electronics\n" +
    "Stay ahead with quality home appliances products and kitchen appliances that make life efficient:\n\n" +
    "✅ Such electricals as rice cookers, kitchen blenders and irons\n\n" +
    "✅ Confident, inexpensive devices of clever living\n\n" +
    "✅ Handpicked electronics to make a first-home or smart upgrade\n\n" +
    "Enjoy a seamless experience with BD shopping made smarter by Darkak Mart.\n\n" +
    "World-Class Health & Beauty Products at Your Fingertips\n" +
    "Start your self-care journey today. We’ve handpicked the world best health and beauty products trusted by thousands:\n\n" +
    "✅ Herbals skincare packs, body lotions, face products\n\n" +
    "✅ Hygiene and grooming key items\n\n" +
    "✅ Everything you need for inner wellness and outer glow\n\n" +
    "With smart shopping BD, glow up effortlessly—right from home.\n\n" +
    "Fun, Educational Toys & Games for Kids\n" +
    "Shop educational toys that boost learning while keeping it fun:\n\n" +
    "✅ STEM toys, puzzles, and learning boards\n\n" +
    "✅ Motor skill–enhancing building blocks\n\n" +
    "✅ Intelligently marketed to the intelligent Bangladeshi parents\n\n" +
    "Perfect for birthdays, gifting, or daily learning through play.\n\n" +
    "Boost Work & Study with Smart Computer Accessories\n" +
    "Elevate your workflow with practical tech accessories:\n\n" +
    "✅ Laptop stands, portable keyboards\n\n" +
    "✅ Ergonomics: Mouse and gadget basics\n\n" +
    "✅ Ideal for students, freelancers, and professionals\n\n" +
    "At Darkak Mart, we blend functionality with affordability for your digital life.\n\n" +
    "Why Darkak Mart is Among the Best Ecommerce Websites in Bangladesh\n" +
    "Darkak isn’t just another BD online shop list entry—we’re a top contender for a reason:\n\n" +
    "✅ Super rapid delivery in Bangladesh.\n\n" +
    "✅ 7-day return and refund system.\n\n" +
    "✅ 100% authentic products\n\n" +
    "✅ Discounted prices & offers & flash deals\n\n" +
    "✅ Friendly customer support, always ready to help.\n\n" +
    "Start Your Daily Smart Shopping with Darkak\n" +
    "Thousands of people are already having a better way to shop. From fashion to electronics, Darkak Mart is the best online shop in BD for trust, convenience, and real value."
};


export const faqData = [
    {
      question: 'What is Darkak Mart?',
      answer: 'Darkak Mart is Bangladesh’s trusted online store for smart shopping, offering a wide range of products including electronics, clothes, and daily essentials from trusted multivendors.',
    },
    {
      question: 'Why should I shop at Darkak Mart?',
      answer: 'Darkak Mart provides a seamless and smart shopping experience with rapid delivery, a 7-day return and refund system, 100% authentic products, discounted prices, flash deals, and friendly customer support.',
    },
    {
      question: 'Is Darkak Mart reliable for online shopping in Bangladesh?',
      answer: 'Yes, Darkak Mart is a highly trusted e-commerce platform in Bangladesh, dedicated to providing authentic products and a secure shopping environment with reliable services.',
    },
    {
      question: 'What is Darkak’s refund and return policy?',
      answer: 'Darkak Mart offers a hassle-free 7-day return and refund policy for most products, ensuring customer satisfaction. Please check the specific product details for any exceptions.',
    },
    {
      question: 'How do I contact Darkak for support or inquiries?',
      answer: 'You can easily contact Darkak Mart’s customer support through their website, app, or dedicated helpline. Our friendly team is always ready to assist you with any questions or issues.',
    },
  ];


  ///productcarosel data

  export const PRODUCTS_DATA = [
  {
    id: "1",
    productName: "Stainless Steel Watch",
    originalPrice: 16500,
    discountedPrice: 11550,
    discountPercentage: 30,
    stock:4,
    images: [
      "https://tse4.mm.bing.net/th/id/OIP.5scyD0bTOKXAplB4yjbs6wHaEA?pid=Api&P=0&h=220", 
      "https://tse3.mm.bing.net/th/id/OIP.j37UzeTcUGVhpTT2E-JmUwHaJ1?pid=Api&P=0&h=220",
      "https://tse4.mm.bing.net/th/id/OIP.ZgDJxBUqLB-4W73S6cHh0AHaJ4?pid=Api&P=0&h=220",
      "https://tse4.mm.bing.net/th/id/OIP.5scyD0bTOKXAplB4yjbs6wHaEA?pid=Api&P=0&h=220", 
      "https://tse3.mm.bing.net/th/id/OIP.j37UzeTcUGVhpTT2E-JmUwHaJ1?pid=Api&P=0&h=220",
      "https://tse4.mm.bing.net/th/id/OIP.ZgDJxBUqLB-4W73S6cHh0AHaJ4?pid=Api&P=0&h=220",
      "https://tse4.mm.bing.net/th/id/OIP.5scyD0bTOKXAplB4yjbs6wHaEA?pid=Api&P=0&h=220", 
      "https://tse3.mm.bing.net/th/id/OIP.j37UzeTcUGVhpTT2E-JmUwHaJ1?pid=Api&P=0&h=220",
      "https://tse4.mm.bing.net/th/id/OIP.ZgDJxBUqLB-4W73S6cHh0AHaJ4?pid=Api&P=0&h=220",
      "https://tse4.mm.bing.net/th/id/OIP.5scyD0bTOKXAplB4yjbs6wHaEA?pid=Api&P=0&h=220", 
      "https://tse3.mm.bing.net/th/id/OIP.j37UzeTcUGVhpTT2E-JmUwHaJ1?pid=Api&P=0&h=220",
      "https://tse4.mm.bing.net/th/id/OIP.ZgDJxBUqLB-4W73S6cHh0AHaJ4?pid=Api&P=0&h=220",
    ],
  },
  {
    id: "2",
    productName: "womens Bag",
    originalPrice: 25000,
    discountedPrice: 20000,
    discountPercentage: 20,
    stock:6,
    images: [
      "https://static.vecteezy.com/system/resources/previews/019/027/714/non_2x/handbag-illustration-for-graphic-design-and-decorative-element-vector.jpg",
      "https://preview.redd.it/gucci-tote-bag-link-in-cmment-v0-4f586d24srsc1.png?width=651&format=png&auto=webp&s=183dfd04519789c49063fa73478fefcb7d32c5c2",
    ],
  },
  {
    id: "3",
    productName: "Elegant Omega Seamaster Diver 300M Black Dial Watch",
    originalPrice: 18000,
    discountedPrice: 15300,
    discountPercentage: 15,
    stock:0,
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6c16f0171396113.646f4f9b52e9d.png",
      "https://i.etsystatic.com/49106964/r/il/794684/5795737082/il_fullxfull.5795737082_22sy.jpg",
    ],
  },
  {
    id: "4",
    productName: "Sporty Casio G-Shock GA-2100 Carbon Core Guard Watch",
    originalPrice: 5000,
    discountedPrice: 4000,
    discountPercentage: 20,
    stock:2,
    images: [
      "https://static-01.daraz.com.bd/p/b7e34c0c88471af29832862d68b74341.jpg",
      "https://img.freepik.com/vecteurs-premium/hudi_804951-25.jpg",
    ],
  },
  {
    id: "5",
    productName: "Luxurious Patek Philippe Calatrava White Gold Dress Watch",
    originalPrice: 50000,
    discountedPrice: 45000,
    discountPercentage: 10,
    stock:2,
    images: [
      "https://tse2.mm.bing.net/th/id/OIP.1L3phwDLuMs5dt8kSiBt4gHaNK?pid=Api&P=0&h=220",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png",
    ],
  },
  {
    id: "6",
    productName: "Fashionable Apple Watch Series 7 Midnight Aluminum Case",
    originalPrice: 12000,
    discountedPrice: 10800,
    discountPercentage: 10,
    stock:0,
    images: [
      "https://tse2.mm.bing.net/th/id/OIP.qnsjSN9pFcbMMkHIZvKeVQHaDt?pid=Api&P=0&h=220",
      "https://cdn.powerofpositivity.com/wp-content/uploads/2022/09/10-Reasons-Why-Some-Women-Stay-Single-1536x864.jpg",
    ],
  },
];


// Filter featured products for home page
export const featuredProducts = mockProducts.filter(p => p.isFeatured);

// Filter new products
export const newProducts = mockProducts.filter(p => p.isNew);

// Filter products with discounts
export const discountedProducts = mockProducts.filter(p => p.discount && p.discount > 0);
