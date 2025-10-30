import PricingTable from "@/components/PricingTable";

// force dynamic rendering and disable ISR
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PricingPage() {
  return <PricingTable />;
}
