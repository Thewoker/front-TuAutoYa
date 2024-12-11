import Main from '@/components/Home'
import { CarCarousel } from "@/components/CarCarrousel";
import { FaqSection } from "@/components/FAQHome";
import { BenefitsSection } from '@/components/BenefitsHome';

export default function Home() {
  return (
    <main className="min-h-screen py-8">
      <section>
        <Main />
      </section>
      <div className="container mx-auto space-y-16 mt-10">
        <section>
          <CarCarousel />
        </section>
        <section>
          <BenefitsSection/>
        </ section>
        <section>
          <FaqSection />
        </section>
      </div>
    </main>
  );
}
