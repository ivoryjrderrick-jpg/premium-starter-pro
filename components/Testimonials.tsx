
import Reveal from '@/components/motion/Reveal';
export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <Reveal>
        <div className="rounded-2xl bg-gray-50 p-10">
          <p className="text-xl md:text-2xl text-gray-700 italic">
            “It feels like a $50k site. The animations are buttery, and checkout took 10 minutes to set up.”
          </p>
          <div className="mt-6 text-sm text-gray-600">— Jordan M., Founder</div>
        </div>
      </Reveal>
    </section>
  );
}
