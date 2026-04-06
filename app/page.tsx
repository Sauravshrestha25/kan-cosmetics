import Hero from "@/Components/Home/Hero/Hero";
import Tastetheflavor from "@/Components/Home/Tastetheflavor/Tastetheflavor";
import OurSolutions from "@/Components/Home/OurSolutions/OurSolutions";
import About from "@/Components/Home/About/AboutHero";
import ProductShowcase from "@/Components/Home/Products/ProductShowcase";
import { ImageComparisonSlider } from "@/Components/Home/ImageCompare/image-comparison-slider-horizontal";
import TextReveal from "@/Components/Home/TextReveal/TextReveal";
import Testimonials2 from "@/Components/Home/Benefits/Testimonials2";
// import Divider from "@/Components/Home/Divider/Divider";

const page = () => {
  return (
    <div className="font-saolDisplay ">
      <Hero />
      <Tastetheflavor />
      <OurSolutions />
      <ProductShowcase />
      <TextReveal />
      <ImageComparisonSlider
        leftImage="/images/after_image.jpg"
        rightImage="/images/before_image.jpg"
        altLeft="KAN Cosmetics"
        altRight="KAN Cosmetics"
      />

      {/* <Divider /> */}
      <Testimonials2 />
      <About />
    </div>
  );
};

export default page;
