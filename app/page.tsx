import Hero from "@/Components/Home/Hero/Hero";
import HomeReadySignal from "@/Components/Home/HomeReadySignal";
import HomepageEditorial from "@/Components/Home/HomepageEditorial/HomepageEditorial";
import About from "@/Components/Home/About/AboutHero";

const page = () => {
  return (
    <div className="font-saolDisplay" data-home-root>
      <HomeReadySignal />
      <Hero />
      <HomepageEditorial />
      <About />
    </div>
  );
};

export default page;
