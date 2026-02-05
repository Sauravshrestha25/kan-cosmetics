import Hero from "@/Components/Home/Hero/Hero";
import About from "@/Components/Home/About/AboutHero";
import ProductShowcase from "@/Components/Home/Products/ProductShowcase";
import Benefits from '@/Components/Home/Benefits/Benefits'
import Testimonial from "@/Components/Home/Testimonial/Testimonial";
import Footer from "@/Components/Layout/Footer/Footer";
import ImageSlider from "@/Components/Home/ImageCompare/Imagecompare";

const page = () => {
  return (
    <div className="font-saolDisplay ">
      <Hero />
      <ProductShowcase />
      <About />
      <ImageSlider />
      <Benefits />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default page;
