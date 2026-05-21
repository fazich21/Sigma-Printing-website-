import { Hero }               from "../components/home/Hero";
import { HomeProducts }       from "../components/home/HomeProducts";
import { WhyChoose }          from "../components/home/WhyChoose";
import { Process }            from "../components/home/Process";
import { TestimonialsSlider } from "../components/home/TestimonialsSlider";
import { FAQ }                from "../components/home/FAQ";
import { CTA }                from "../components/home/CTA";

export function HomePage({ toast, setPage, onDetail }) {
  return (
    <>
      <Hero setPage={setPage} />
      <HomeProducts toast={toast} onDetail={onDetail} />
      <WhyChoose />
      <Process />
      <TestimonialsSlider />
      <FAQ />
      <CTA setPage={setPage} />
    </>
  );
}