import { HeroSlider } from "@/src/components/sections/HeroSlider";
import { NoticeTicker } from "@/src/components/sections/NoticeTicker";
import { AboutHistorySection } from "@/src/components/sections/AboutHistorySection";
import { NoticeBoardSection } from "@/src/components/sections/NoticeBoardSection";
import { MuhtamimMessageSection } from "@/src/components/sections/MuhtamimMessageSection";
import { DepartmentsSection } from "@/src/components/sections/DepartmentsSection";
import { TeachersDirectory } from "@/src/components/sections/TeachersDirectory";
import { AdmissionSection } from "@/src/components/sections/AdmissionSection";
import { GallerySection } from "@/src/components/sections/GallerySection";
import { DonationSection } from "@/src/components/sections/DonationSection";
import { LocationContactSection } from "@/src/components/sections/LocationContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <NoticeTicker />
      <AboutHistorySection />
      <NoticeBoardSection mode="preview" />
      <MuhtamimMessageSection />
      <DepartmentsSection mode="preview" />
      <TeachersDirectory mode="preview" />
      <AdmissionSection />
      <GallerySection mode="preview" />
      <DonationSection />
      <LocationContactSection />
    </>
  );
}
