import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { dbService } from '../../services/firebase/db';
import { HeroSection } from '../../components/home/HeroSection';
import { FeaturedCategories } from '../../components/home/FeaturedCategories';
import { ProductShowcaseSection } from '../../components/home/ProductShowcaseSection';
import { CustomPcPromo } from '../../components/home/CustomPcPromo';
import { RepairsSection } from '../../components/home/RepairsSection';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { BrandShowcase } from '../../components/home/BrandShowcase';
import { TestimonialsSection } from '../../components/home/TestimonialsSection';
import { StoreLocationSection } from '../../components/home/StoreLocationSection';
import { getLocalBusinessSchema } from '../../services/seo/schemas';
import { DEFAULT_SEO } from '../../services/seo/seoConfig';
import { analyticsService } from '../../services/firebase/analyticsService';

export const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsService.trackPageView('Dream Computer Patna Home');

    const loadHomeData = async () => {
      try {
        const [bns, cats, prods, brnds, tests] = await Promise.all([
          dbService.getAll('banners', { status: 'active' }, 'displayOrder', 'asc'),
          dbService.getAll('categories', { status: 'active' }, 'displayOrder', 'asc'),
          dbService.getAll('products', { status: 'published' }, 'createdAt', 'desc'),
          dbService.getAll('brands', { status: 'active' }, 'displayOrder', 'asc'),
          dbService.getAll('testimonials', { approved: true }),
        ]);

        setBanners(bns || []);
        setCategories(cats || []);
        setProducts(prods || []);
        setBrands(brnds || []);
        setTestimonials(tests || []);
      } catch (err) {
        console.error('Error loading homepage data', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const bestSellers = products.filter((p) => p.bestSeller);
  const gamingPcs = products.filter((p) => p.categoryId === 'cat-custom-pcs');
  const laptops = products.filter(
    (p) => p.categoryId === 'cat-gaming-laptops' || p.categoryId === 'cat-business-laptops'
  );

  return (
    <>
      <Helmet>
        <title>{DEFAULT_SEO.title}</title>
        <meta name="description" content={DEFAULT_SEO.description} />
        <meta name="keywords" content={DEFAULT_SEO.keywords} />
        <link rel="canonical" href={DEFAULT_SEO.canonical} />
        <script type="application/ld+json">
          {JSON.stringify(getLocalBusinessSchema())}
        </script>
      </Helmet>

      <div>
        {/* Hero Section */}
        <HeroSection banner={banners[0]} />

        {/* Featured Categories */}
        <FeaturedCategories categories={categories} />

        {/* Best Selling Products */}
        <ProductShowcaseSection
          title="BEST SELLING HARDWARE IN PATNA"
          subtitle="COMMUNITY FAVORITES"
          products={bestSellers.length > 0 ? bestSellers : products.slice(0, 4)}
          viewAllLink="/products"
        />

        {/* Custom PC Builder Promo */}
        <CustomPcPromo />

        {/* Gaming PC Collection */}
        <ProductShowcaseSection
          title="SIGNATURE GAMING PC RIGS"
          subtitle="PRE-CONFIGURED BEASTS"
          products={gamingPcs.length > 0 ? gamingPcs : products.slice(0, 4)}
          viewAllLink="/products?category=cat-custom-pcs"
        />

        {/* Laptop Collection */}
        <ProductShowcaseSection
          title="HIGH-PERFORMANCE LAPTOPS"
          subtitle="RTX 40-SERIES & PRODUCTIVITY"
          products={laptops.length > 0 ? laptops : products.slice(0, 4)}
          viewAllLink="/products?category=cat-gaming-laptops"
        />

        {/* Chip-Level Repairs & Maintenance */}
        <RepairsSection />

        {/* Why Choose Dream Computer */}
        <WhyChooseUs />

        {/* Authorized Brands */}
        <BrandShowcase brands={brands} />

        {/* Verified Customer Reviews */}
        <TestimonialsSection testimonials={testimonials} />

        {/* Store Location & Google Maps */}
        <StoreLocationSection />
      </div>
    </>
  );
};
