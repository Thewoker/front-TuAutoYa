import { Hero } from '@/components/HomeMain/Hero'
import { CarCarousel } from "@/components/HomeMain/CarCarrousel";
import { FaqSection } from "@/components/HomeMain/FAQHome";
import { BenefitsSection } from '@/components/HomeMain/BenefitsHome';
import { BrandShowcase } from '@/components/HomeMain/BrandShowcase';

export default function Home() {
    return (
        <main className="min-h-screen pb-8">
            <section>
                <Hero />
            </section>
            <div className="container mx-auto space-y-16 mt-10">
                <section>
                    <CarCarousel />
                </section>
                <section>
                    <BenefitsSection />
                </ section>
                <section>
                    <FaqSection />
                </section>
                <section>
                    <BrandShowcase />
                </section>
            </div>
        </main>
    );
}
