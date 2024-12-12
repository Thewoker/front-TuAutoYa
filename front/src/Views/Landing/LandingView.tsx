import { Hero } from '@/components/Hero'
import { CarCarousel } from "@/components/CarCarrousel";
import { FaqSection } from "@/components/FAQHome";
import { BenefitsSection } from '@/components/BenefitsHome';
import { BrandShowcase } from '@/components/BrandShowcase';

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
