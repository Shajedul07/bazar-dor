import AllProducts from "@/components/AllProducts";
import HeroSection from "@/components/Hero";
import Decrease from "@/components/increase_and_decrease/priceDecrease";
import Increase from "@/components/increase_and_decrease/priceIncrease";

function Home() {
  return (
    <div>
      <HeroSection />
      <Increase />
      <Decrease />
      <AllProducts/>
    </div>
  );
}

export default Home;