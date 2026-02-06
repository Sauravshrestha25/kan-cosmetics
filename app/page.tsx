import Hero from "@/Components/Home/Hero/Hero";
import About from "@/Components/Home/About/AboutHero";
import ProductShowcase from "@/Components/Home/Products/ProductShowcase";
import Benefits from '@/Components/Home/Benefits/Benefits'
import Testimonial from "@/Components/Home/Testimonial/Testimonial";
import Footer from "@/Components/Layout/Footer/Footer";
import { ImageComparisonSlider } from "@/Components/Home/ImageCompare/image-comparison-slider-horizontal";
import TextReveal from "@/Components/Home/TextReveal/TextReveal";
import Testimonials2 from "@/Components/Home/Benefits/Testimonials2";
import Divider from "@/Components/Home/Divider/Divider";

const page = () => {
  return (
    <div className="font-saolDisplay ">
      <Hero />
      <TextReveal />
       <ImageComparisonSlider
                leftImage="/images/after_image.jpg"
                rightImage="/images/before_image.jpg"
                altLeft="KAN Cosmetics"
                altRight="KAN Cosmetics"
              />
      <ProductShowcase />
      <Divider />
      {/* <Benefits /> */}
      <Testimonials2/>
      {/* <Testimonial /> */}
      <About />
      <Footer />
    </div>
  );
};

export default page;
