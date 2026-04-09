// import Hero from "@/Components/Home/Hero/Hero";
import HomeReadySignal from "@/Components/Home/HomeReadySignal";
import HomepageEditorial from "@/Components/Home/HomepageEditorial/HomepageEditorial";
import ScienceMeetsNature from "@/Components/Home/ScienceMeetsNature/ScienceMeetsNature";
import ProductShowcase from "@/Components/Home/Products/ProductShowcase";

const page = () => {
  return (
    <div className="font-saolDisplay" data-home-root>
      <HomeReadySignal />
      <ScienceMeetsNature />
      <ProductShowcase />

      {/* <Hero /> */}
      <HomepageEditorial />
    </div>
  );
};

export default page;
