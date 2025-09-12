import CategorySection from "../components/Home/categorySection/category";
import FeaturedEventsListSection from "../components/Home/featuredEvents/event";
import HeroSection from "../components/Home/Hero/hero";

export const metadata = {
  title: "Evently | Home",
};

const page = () => {
  return (
    <div>
      <HeroSection/>
      <CategorySection/>
      <FeaturedEventsListSection/>
    </div>
  );
};

export default page;