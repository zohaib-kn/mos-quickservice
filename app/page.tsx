import HeroSection from "@/components/home/HeroSection";
import InstallationServices from "@/components/home/InstallationServices";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutUs from "@/components/home/AboutUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <InstallationServices />
      <ServicesSection />
      <WhyChooseUs />
      <AboutUs />
    </>
  );
}

