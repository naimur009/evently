import Link from "next/link";
import Image from "next/image";

// Main App component to display the Hero Section
const HeroSection = () => {
  return (
    // Hero section container with a light background and a clean layout
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* Main content container, adapting from a column on mobile to a row on desktop */}
      <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-24">

        {/* Text content area, centered on mobile, left-aligned on desktop */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-700 animate-slide-in-right">
          {/* Main headline with responsive font sizing */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 drop-shadow-sm">
            Discover Your Next <span className="text-blue-600">Adventure</span>
          </h1>
          
          {/* Sub-headline with responsive font sizing */}
          <p className="text-lg md:text-xl font-light text-gray-600 mb-8 max-w-xl">
            Secure tickets to concerts, sports events, festivals, and more. Your journey to unforgettable moments starts here.
          </p>
          
          {/* Call-to-action button with a vibrant gradient and hover animations */}
          <Link href="/all-events" className="px-8 py-4 rounded-full font-bold text-lg text-white transition-all duration-300 transform bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:scale-105 shadow-xl shadow-blue-500/50 animate-fade-in">
            Explore Events
          </Link>
        </div>
        
        {/* Image collage container, now using a more compact grid for mobile */}
        <div className="md:w-1/2 flex justify-center transition-all duration-700 animate-slide-in-left">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full max-w-lg">
            {/* First image */}
            <div className="col-span-1 row-span-1 group">
              <Image
                src="https://placehold.co/400x400/60a5fa/ffffff?text=CONCERT"
                alt="A lively concert scene"
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl"
                unoptimized
              />
            </div>
            {/* Second image */}
            <div className="col-span-1 row-span-1 group">
              <Image
                src="https://placehold.co/400x400/f87171/ffffff?text=SPORTS"
                alt="An exciting sports game"
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl"
                unoptimized
              />
            </div>
            {/* Third image, spanning two columns */}
            <div className="col-span-2 group">
              <Image
                src="https://placehold.co/800x400/4ade80/ffffff?text=THEATER"
                alt="A dramatic theater performance"
                width={800}
                height={400}
                className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HeroSection;
