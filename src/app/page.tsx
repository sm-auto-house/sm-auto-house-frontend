import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about-section";
import { BrandGrid } from "@/components/sections/brand-grid";
import { CategoryGrid } from "@/components/sections/category-grid";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Hero } from "@/components/sections/hero";
import { NewsSection } from "@/components/sections/news-section";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { ServicesSection } from "@/components/sections/services-section";
import { Testimonials } from "@/components/sections/testimonials";
import { VisualBanner } from "@/components/sections/visual-banner";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <CategoryGrid />
        <AboutSection />
        <ProductShowcase />
        <BrandGrid />
        <WhyChooseUs />
        <ServicesSection />
        <VisualBanner />
        <Testimonials />
        <NewsSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
