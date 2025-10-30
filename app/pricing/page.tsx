"use client";

import PricingTable from "@/components/PricingTable";

export const dynamic = "force-dynamic";   // disable static generation
export const revalidate = false;          // must be a number or false
export const fetchCache = "force-no-store";

export default function PricingPage() {
  return <PricingTable />;
}
