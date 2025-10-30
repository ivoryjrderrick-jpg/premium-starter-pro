import PageReveal from "@/components/PageReveal";
import PricingTable from "@/components/PricingTable";

export default function PricingPage() {
  return (
    <PageReveal>
      <section className="mx-auto max-w-6xl px-4 py-24">
        <h1 className="text-4xl font-bold tracking-tight">Pricing</h1>
        <p className="text-gray-600 mt-3">
          Choose a package and pay securely via Stripe.
        </p>
        <PricingTable />
      </section>
    </PageReveal>
  );
}
