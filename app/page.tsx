import { HeroSlider } from "@/src/components/sections/HeroSlider";
import { NoticeTicker } from "@/src/components/sections/NoticeTicker";
import { AboutHistorySection } from "@/src/components/sections/AboutHistorySection";
import { AkabirSection } from "@/src/components/sections/AkabirSection";
import { NoticeBoardSection } from "@/src/components/sections/NoticeBoardSection";
import { MuhtamimMessageSection } from "@/src/components/sections/MuhtamimMessageSection";
import { DepartmentsSection } from "@/src/components/sections/DepartmentsSection";
import { TeachersDirectory } from "@/src/components/sections/TeachersDirectory";
import { AdmissionSection } from "@/src/components/sections/AdmissionSection";
import { PostsSection } from "@/src/components/sections/PostsSection";
import { GallerySection } from "@/src/components/sections/GallerySection";
import { DonationSection } from "@/src/components/sections/DonationSection";
import { LocationContactSection } from "@/src/components/sections/LocationContactSection";
import { getNotices, getPosts } from "@/src/lib/queries";

export default async function HomePage() {
  const [notices, posts] = await Promise.all([getNotices(), getPosts()]);

  return (
    <>
      <HeroSlider />
      <NoticeTicker notices={notices} />
      <AboutHistorySection />
      <AkabirSection />
      <NoticeBoardSection notices={notices} mode="preview" />
      <MuhtamimMessageSection />
      <DepartmentsSection mode="preview" />
      <TeachersDirectory mode="preview" />
      <AdmissionSection />
      <PostsSection posts={posts} mode="preview" />
      <GallerySection mode="preview" />
      <DonationSection />
      <LocationContactSection />
    </>
  );
}
